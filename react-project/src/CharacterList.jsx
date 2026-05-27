import { getLevelThreshold } from './data';

// READ: display all characters with map(); select, edit, delete
function CharacterList({ characters, selectedId, onSelect, onEdit, onDelete }) {
  if (characters.length === 0) {
    return (
      <div className="character-list">
        <h2>Characters</h2>
        <p className="empty-message">No characters yet. Create one to begin!</p>
      </div>
    );
  }

  return (
    <div className="character-list">
      <h2>Characters</h2>

      <ul className="character-cards">
        {characters.map((character) => (
          <li
            key={character.id}
            className={
              character.id === selectedId
                ? 'character-card selected'
                : 'character-card'
            }
          >
            <button
              type="button"
              className="card-select"
              onClick={() => onSelect(character.id)}
            >
              <span className="card-name">{character.name}</span>
              <span className="card-meta">
                {character.race} · Level {character.level}
              </span>
              <span className="card-xp">
                XP {character.xp} / {getLevelThreshold(character.level)}
              </span>
            </button>

            <div className="card-actions">
              <button
                type="button"
                className="btn btn-small btn-secondary"
                onClick={() => onEdit(character)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-small btn-danger"
                onClick={() => onDelete(character.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterList;
