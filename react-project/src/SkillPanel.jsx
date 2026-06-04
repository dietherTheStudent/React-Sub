import { useState, useEffect, useRef } from 'react';
import {
  SKILLS,
  getLevelThreshold,
  SKILL_MIN,
  SKILL_CAP,
  skillLevelToSliderPercent,
} from './data';

const STAT_BAR_MAX = 300;

function statBarWidth(value) {
  return `${Math.min(100, (value / STAT_BAR_MAX) * 100)}%`;
}

/** Passive bonus line for a skill at level s (15–100), without perks. */
function getSkillPassiveStat(skillKey, s) {
  const level = Number(s);
  switch (skillKey) {
    case 'oneHanded':
    case 'twoHanded':
      return { label: 'Weapon Dmg', value: `+${(level * 0.5).toFixed(0)}%` };
    case 'archery':
      return { label: 'Bow Dmg', value: `+${(level * 0.5).toFixed(0)}%` };
    case 'block':
      return {
        label: 'Dmg Blocked',
        value: `${Math.min(Math.floor(level * 0.3), 30).toFixed(0)}%`,
      };
    case 'heavyArmor':
    case 'lightArmor':
      return { label: 'Armor Rating', value: `+${Math.floor(level * 0.4)}%` };
    case 'smithing':
      return { label: 'Item Improve', value: `+${Math.floor(level * 0.5)}%` };
    case 'alteration':
    case 'conjuration':
    case 'destruction':
    case 'illusion':
    case 'restoration':
      return { label: 'Spell Cost', value: `-${(level * 0.41).toFixed(0)}%` };
    case 'enchanting':
      return {
        label: 'Enchant Power',
        value: `+${((level / 100) ** 2 * 25).toFixed(1)}%`,
      };
    case 'alchemy':
      return { label: 'Potion Strength', value: `+${(level * 0.5).toFixed(0)}%` };
    case 'sneak':
      return { label: 'Detection', value: `${level}% resist` };
    case 'pickpocket':
      return {
        label: 'Steal Chance',
        value: `${Math.min(15 + level, 90)}%`,
      };
    case 'lockpicking':
      return { label: 'Lock Skill', value: `Lv ${level}` };
    case 'speech':
      return { label: 'Buy/Sell', value: `+${Math.floor(level * 0.3)}% prices` };
    default:
      return null;
  }
}

// Shows selected character's stats, skills (sliders), and stat point spending
function SkillPanel({ character, onSkillSliderRelease, onStatChoice }) {
  const [previewSkills, setPreviewSkills] = useState({});
  const commitLock = useRef(false);

  // Sync when character changes or saved skills reset (e.g. edit save — same id)
  const savedSkillsKey = character
    ? JSON.stringify(character.skills)
    : null;

  useEffect(() => {
    if (!character) return;
    setPreviewSkills({ ...character.skills });
  }, [character?.id, savedSkillsKey]);

  if (!character) {
    return (
      <div className="skill-panel">
        <h2>Skills &amp; Stats</h2>
        <p className="empty-message">Select a character to view skills.</p>
      </div>
    );
  }

  const xpNeeded = getLevelThreshold(character.level);
  const pendingStatPoints = character.pendingStatPoints ?? 0;
  const canSpendStat = pendingStatPoints > 0;
  const xpPercent = Math.min(100, (character.xp / xpNeeded) * 100);

  function handleSliderChange(skill, value) {
    const committed = character.skills[skill];
    const num = Math.max(
      committed,
      Math.min(SKILL_CAP, Number(value))
    );
    setPreviewSkills((prev) => ({ ...prev, [skill]: num }));
  }

  function handleSliderCommit(skill) {
    if (commitLock.current) return;
    commitLock.current = true;
    requestAnimationFrame(() => {
      commitLock.current = false;
    });

    const oldVal = character.skills[skill];
    const newVal = previewSkills[skill] ?? oldVal;
    if (newVal <= oldVal) return;

    onSkillSliderRelease(character.id, skill, oldVal, newVal);
  }

  return (
    <div className="skill-panel">
      <h2 className="character-title">{character.name}</h2>
      <p className="character-race">{character.race}</p>

      <div className="character-xp-strip">
        <span className="xp-label">
          Level {character.level} · XP {character.xp} / {xpNeeded}
        </span>
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${xpPercent}%` }} />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box stat-health">
          <span className="stat-label">Health</span>
          <span className="stat-value">{character.health}</span>
          <div className="attribute-bar">
            <div
              className="attribute-bar-fill attribute-bar-fill--health"
              style={{ width: statBarWidth(character.health) }}
            />
          </div>
        </div>
        <div className="stat-box stat-magicka">
          <span className="stat-label">Magicka</span>
          <span className="stat-value">{character.magicka}</span>
          <div className="attribute-bar">
            <div
              className="attribute-bar-fill attribute-bar-fill--magicka"
              style={{ width: statBarWidth(character.magicka) }}
            />
          </div>
        </div>
        <div className="stat-box stat-stamina">
          <span className="stat-label">Stamina</span>
          <span className="stat-value">{character.stamina}</span>
          <div className="attribute-bar">
            <div
              className="attribute-bar-fill attribute-bar-fill--stamina"
              style={{ width: statBarWidth(character.stamina) }}
            />
          </div>
        </div>
      </div>

      <div className="stat-points-bar">
        <span className="stat-points-badge">
          Stat Points Available: {pendingStatPoints}
        </span>
        <div className="stat-choice-buttons">
          <button
            type="button"
            className="btn btn-primary btn-stat"
            disabled={!canSpendStat}
            onClick={() => onStatChoice(character.id, 'health')}
          >
            +10 Health
          </button>
          <button
            type="button"
            className="btn btn-primary btn-stat"
            disabled={!canSpendStat}
            onClick={() => onStatChoice(character.id, 'magicka')}
          >
            +10 Magicka
          </button>
          <button
            type="button"
            className="btn btn-primary btn-stat"
            disabled={!canSpendStat}
            onClick={() => onStatChoice(character.id, 'stamina')}
          >
            +10 Stamina
          </button>
        </div>
      </div>

      <div className="level-info">
        <span>Perk Points: {character.perkPoints}</span>
      </div>

      <h3 className="skills-heading">Skills</h3>
      <p className="skills-hint">Drag a slider, then release to apply XP.</p>

      <ul className="skills-list">
        {SKILLS.map(({ key, label }) => {
          const committed = character.skills[key];
          const preview = Math.max(
            committed,
            previewSkills[key] ?? committed
          );
          const isPreview = preview !== committed;
          const fillPercent = skillLevelToSliderPercent(preview);
          const passive = getSkillPassiveStat(key, preview);

          return (
            <li key={key} className="skill-row">
              <span className="skill-name">{label}</span>
              <span className={`skill-level ${isPreview ? 'skill-preview' : ''}`}>
                {preview}
              </span>
              <div className="skill-slider-col">
                <div className="skill-slider-wrap">
                  <input
                    type="range"
                    className="skill-slider"
                    min={SKILL_MIN}
                    max={SKILL_CAP}
                    step={1}
                    value={preview}
                    style={{ '--slider-fill': `${fillPercent}%` }}
                    onChange={(e) => handleSliderChange(key, e.target.value)}
                    onMouseUp={() => handleSliderCommit(key)}
                    onPointerUp={() => handleSliderCommit(key)}
                  />
                </div>
                {passive && (
                  <span className="skill-passive-stat">
                    {passive.label}  {passive.value}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SkillPanel;
