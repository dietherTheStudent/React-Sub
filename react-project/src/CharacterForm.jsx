import { useState, useEffect } from 'react';
import { RACES } from './data';

// Controlled form for creating or editing a character (name + race)
function CharacterForm({ editingCharacter, onCreate, onUpdate, onCancelEdit }) {
  const isEditMode = editingCharacter !== null;

  const [name, setName] = useState('');
  const [race, setRace] = useState(RACES[0]);

  // When entering edit mode, fill the form with the character's current values
  useEffect(() => {
    if (editingCharacter) {
      setName(editingCharacter.name);
      setRace(editingCharacter.race);
    } else {
      setName('');
      setRace(RACES[0]);
    }
  }, [editingCharacter]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    if (isEditMode) {
      onUpdate({ id: editingCharacter.id, name, race });
    } else {
      onCreate({ name, race });
      setName('');
      setRace(RACES[0]);
    }
  }

  return (
    <div className="character-form">
      <h2>{isEditMode ? 'Edit Character' : 'Create Character'}</h2>

      <form onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Dovahkiin"
            required
          />
        </label>

        <label className="form-field">
          <span>Race</span>
          <select value={race} onChange={(e) => setRace(e.target.value)}>
            {RACES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditMode ? 'Save Changes' : 'Create Character'}
          </button>

          {isEditMode && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CharacterForm;
