import { useState, useEffect, useRef } from 'react';
import { SKILLS, getLevelThreshold, SKILL_CAP } from './data';

const STAT_BAR_MAX = 300;

function statBarWidth(value) {
  return `${Math.min(100, (value / STAT_BAR_MAX) * 100)}%`;
}

// Shows selected character's stats, skills (sliders), and stat point spending
function SkillPanel({ character, onSkillSliderRelease, onStatChoice }) {
  const [skillPreviews, setSkillPreviews] = useState({});
  const releaseLock = useRef(false);

  useEffect(() => {
    setSkillPreviews({});
  }, [character?.id]);

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

  function getDisplayLevel(skillKey) {
    return skillPreviews[skillKey] ?? character.skills[skillKey];
  }

  function handleSliderChange(skillKey, value) {
    const num = Number(value);
    setSkillPreviews((prev) => ({ ...prev, [skillKey]: num }));
  }

  function handleSliderRelease(skillKey) {
    if (releaseLock.current) return;
    releaseLock.current = true;
    requestAnimationFrame(() => {
      releaseLock.current = false;
    });

    const oldLevel = character.skills[skillKey];
    const newLevel = skillPreviews[skillKey] ?? oldLevel;

    setSkillPreviews((prev) => {
      const next = { ...prev };
      delete next[skillKey];
      return next;
    });

    if (newLevel > oldLevel) {
      onSkillSliderRelease(character.id, skillKey, oldLevel, newLevel);
    }
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
          const display = getDisplayLevel(key);
          const isPreview = skillPreviews[key] !== undefined;
          const fillPercent =
            ((display - committed) / (SKILL_CAP - committed)) * 100 || 0;

          return (
            <li key={key} className="skill-row">
              <span className="skill-name">{label}</span>
              <span className={`skill-level ${isPreview ? 'skill-preview' : ''}`}>
                {display}
              </span>
              <div className="skill-slider-wrap">
                <input
                  type="range"
                  className="skill-slider"
                  min={committed}
                  max={SKILL_CAP}
                  value={display}
                  style={{ '--slider-fill': `${fillPercent}%` }}
                  onChange={(e) => handleSliderChange(key, e.target.value)}
                  onPointerUp={() => handleSliderRelease(key)}
                  onMouseUp={() => handleSliderRelease(key)}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SkillPanel;
