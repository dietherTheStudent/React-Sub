import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = () => {
    setSubmittedName(input);
  };

  return (
    <div className="app">
      <h1>Sample App</h1>

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {submittedName && (
        <>
          <p className="welcome"><strong>Welcome {submittedName}</strong></p>
          <p className="char-count">Number of characters: {submittedName.length}</p>
        </>
      )}
    </div>
  );
}

export default App;