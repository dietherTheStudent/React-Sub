import { useState, useEffect } from 'react';
import './App.css';
import CharacterForm from './CharacterForm';
import CharacterList from './CharacterList';
import SkillPanel from './SkillPanel';
import {
  getLevelThreshold,
  calculateSkillXpGain,
  buildFreshCharacterProgression,
} from './data';

const EDIT_RESET_WARNING =
  'Committing to edit will reset all character stats, stat points, and skills. Name and race can still be changed. Continue?';

const DELETE_WARNING =
  'Deleting this character cannot be undone. Continue?';

const STORAGE_KEY = 'skyrim-characters';

// Migrate older saves (pendingStatChoice boolean → pendingStatPoints number)
function normalizeCharacter(c) {
  const pendingStatPoints =
    c.pendingStatPoints ??
    (c.pendingStatChoice ? 1 : 0);
  const { pendingStatChoice: _removed, ...rest } = c;
  return { ...rest, pendingStatPoints };
}

// Load saved characters from localStorage (optional persistence)
function loadCharacters() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed.map(normalizeCharacter) : [];
  } catch {
    return [];
  }
}

function App() {
  // Main state — all characters live here
  const [characters, setCharacters] = useState(loadCharacters);

  // Which character is selected to view in SkillPanel
  const [selectedId, setSelectedId] = useState(null);

  // When editing, holds the character object being edited (null = create mode)
  const [editingCharacter, setEditingCharacter] = useState(null);

  // Brief banner after a level up
  const [levelUpBanner, setLevelUpBanner] = useState(null);

  // Save to localStorage whenever characters change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
  }, [characters]);

  // Find the currently selected character object
  const selectedCharacter =
    characters.find((c) => c.id === selectedId) ?? null;

  // --- CREATE: add a new character with race bonuses applied ---
  function handleCreate({ name, race }) {
    const newCharacter = {
      id: Date.now(),
      name: name.trim(),
      race,
      ...buildFreshCharacterProgression(race),
    };
    setCharacters((prev) => [...prev, newCharacter]);
    setSelectedId(newCharacter.id);
  }

  // --- UPDATE (form): optional name/race; always reset progression ---
  function handleUpdate({ id, name, race }) {
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        return {
          id: c.id,
          name: name.trim(),
          race,
          ...buildFreshCharacterProgression(race),
        };
      })
    );
    setEditingCharacter(null);
  }

  // --- DELETE: remove character by id ---
  function handleDelete(id) {
    if (!window.confirm(DELETE_WARNING)) return;
    setCharacters((prev) => prev.filter((c) => c.id !== id));
    if (selectedId === id) setSelectedId(null);
    if (editingCharacter?.id === id) setEditingCharacter(null);
  }

  // --- UPDATE (skill): commit slider on release — XP from oldLevel → newLevel ---
  function handleSkillSliderRelease(characterId, skillKey, oldLevel, newLevel) {
    if (newLevel <= oldLevel) return;

    const xpGain = calculateSkillXpGain(oldLevel, newLevel);
    let leveledUpName = null;

    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== characterId) return c;

        let updated = {
          ...c,
          skills: { ...c.skills, [skillKey]: newLevel },
          xp: c.xp + xpGain,
        };

        while (updated.xp >= getLevelThreshold(updated.level)) {
          updated = {
            ...updated,
            xp: updated.xp - getLevelThreshold(updated.level),
            level: updated.level + 1,
            perkPoints: updated.perkPoints + 1,
            pendingStatPoints: (updated.pendingStatPoints ?? 0) + 1,
          };
          leveledUpName = updated.name;
        }

        return updated;
      })
    );

    if (leveledUpName) {
      setLevelUpBanner(leveledUpName);
      setTimeout(() => setLevelUpBanner(null), 3000);
    }
  }

  // --- UPDATE: spend 1 pending stat point on Health, Magicka, or Stamina ---
  function handleStatChoice(characterId, stat) {
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== characterId || !(c.pendingStatPoints > 0)) return c;
        return {
          ...c,
          [stat]: c[stat] + 10,
          pendingStatPoints: c.pendingStatPoints - 1,
        };
      })
    );
  }

  function handleSelect(id) {
    setSelectedId(id);
    setEditingCharacter(null);
  }

  function handleStartEdit(character) {
    if (!window.confirm(EDIT_RESET_WARNING)) return;
    setEditingCharacter(character);
    setSelectedId(character.id);
  }

  function handleCancelEdit() {
    setEditingCharacter(null);
  }

  return (
    <div className="app">
      <div className="app-overlay">
        <header className="app-header">
          <h1>Skyrim Character Builder</h1>
          <p className="subtitle">Create, manage, and level your Dovahkiin</p>
        </header>

        {levelUpBanner && (
          <div className="level-up-banner">Level Up! — {levelUpBanner}</div>
        )}

        <div className="layout">
        <section className="panel panel-form">
          <CharacterForm
            editingCharacter={editingCharacter}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onCancelEdit={handleCancelEdit}
          />
        </section>

        <section className="panel panel-list">
          <CharacterList
            characters={characters}
            selectedId={selectedId}
            onSelect={handleSelect}
            onEdit={handleStartEdit}
            onDelete={handleDelete}
          />
        </section>

        <section className="panel panel-skills">
          <SkillPanel
            character={selectedCharacter}
            onSkillSliderRelease={handleSkillSliderRelease}
            onStatChoice={handleStatChoice}
          />
        </section>
        </div>
      </div>
    </div>
  );
}

export default App;
