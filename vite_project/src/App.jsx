import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "8px 12px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "20px" }}>Student Form</h1>

      <input style={inputStyle} type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
      <input style={inputStyle} type="text" placeholder="Enter course" onChange={(e) => setCourse(e.target.value)} />
      <input style={inputStyle} type="text" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
      <input style={inputStyle} type="text" placeholder="Enter year level" onChange={(e) => setYearLevel(e.target.value)} />
      <input style={inputStyle} type="text" placeholder="Enter address" onChange={(e) => setAddress(e.target.value)} />
      <input style={inputStyle} type="text" placeholder="Enter contact number" onChange={(e) => setContactNumber(e.target.value)} />
      <input style={inputStyle} type="text" placeholder="Enter ID number" onChange={(e) => setIdNumber(e.target.value)} />

      <div style={{ marginTop: "20px", lineHeight: "2" }}>
        <h2>Name: {name}</h2>
        <h2>Course: {course}</h2>
        <h2>Age: {age}</h2>
        <h2>Year Level: {yearLevel}</h2>
        <h2>Address: {address}</h2>
        <h2>Contact Number: {contactNumber}</h2>
        <h2>ID Number: {idNumber}</h2>
      </div>
    </div>
  );
}

export default App;