import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [IdNumber, setIdNumber] = useState("");
  const [students, setStudents] = useState([]);

  // Track which student is being edited
  const [editIndex, setEditIndex] = useState(null);

  // part 1: CREATE
  function addStudent() {
    const newStudent = {
      name: name,
      course: course,
      year: year,
      IdNumber: IdNumber
    };

    setStudents([...students, newStudent]);

    setName("");
    setCourse("");
    setYear("");
    setIdNumber("");
  }

  // part 4: DELETE
  function deleteStudent(index) {
    const updatedStudents = students.filter(
      (_, i) => i !== index
    );

    setStudents(updatedStudents);
  }

  // part 3: LOAD DATA INTO INPUTS
  function editStudent(index) {
    setName(students[index].name);
    setCourse(students[index].course);
    setYear(students[index].year);
    setIdNumber(students[index].IdNumber);

    setEditIndex(index);
  }

  // part 2: UPDATE
  function updateStudent() {
    const updatedStudents = [...students];

    updatedStudents[editIndex] = {
      name: name,
      course: course,
      year: year,
      IdNumber: IdNumber
    };

    setStudents(updatedStudents);

    setName("");
    setCourse("");
    setYear("");
    setIdNumber("");

    setEditIndex(null);
  }

  return (
    <div>
      <h1>Student Record System</h1>
      // part 1: CREATE(input fields)

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter ID Number"
        value={IdNumber}
        onChange={(e) => setIdNumber(e.target.value)}
      />

      <br /><br />  

      {/* Show different button depending on mode */}
      {editIndex === null ? (
        <button onClick={addStudent}>
          Add Student
        </button>
      ) : (
        // part 2: UPDATE (button)
        <button onClick={updateStudent}>
          Update Student
        </button>
      )}

      <hr />

      <h2>Student List</h2>
      // part 2: READ (displaying students)

      {students.map((student, index) => (
        <div key={index}>
          <p>
            {student.name} - {student.course} - {student.year} - {student.IdNumber}
          </p>

          // part 3: LOAD DATA INTO INPUTS (button)

          <button onClick={() => editStudent(index)}>
            Edit
          </button>

          // part 4: DELETE (button)

          <button onClick={() => deleteStudent(index)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;