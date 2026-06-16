import ProfileCard from "./ProfileCard";

function App() {
  return (
    <div>
      <h1>Student Profiles</h1>
      <ProfileCard name="Juan Romero" course="BSCpE" age="20" hobby="Gaming" />
      <ProfileCard name="Maria Santos" course="BSIT" age="21" hobby="Reading" />
      <ProfileCard name="Pedro Cruz" course="BSCS" age="19" hobby="Music" />
      <ProfileCard name="Ana Reyes" course="BSECE" age="22" hobby="Drawing" />
      <ProfileCard name="Mark Cruz" course="BSCpE" age="20" hobby="Sports" />
    </div>
  );
}

export default App;