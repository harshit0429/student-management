import { useEffect, useState } from "react";

const API = "https://student-management-backend-ysad.onrender.com";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [course, setCourse] = useState("");

  // LOAD STUDENTS
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    fetch(API + "/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  };

  // ADD STUDENT
  const addStudent = () => {
    if (!name || !roll || !course) {
      alert("Fill all fields");
      return;
    }

    fetch(API + "/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, roll, course }),
    }).then(() => {
      setName("");
      setRoll("");
      setCourse("");
      loadStudents();
    });
  };

  // DELETE STUDENT
  const deleteStudent = (index) => {
    fetch(API + "/delete/" + index, {
      method: "DELETE",
    }).then(loadStudents);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Management System (React)</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Roll"
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
      />

      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <button onClick={addStudent}>Add Student</button>

      <ul>
        {students.map((s, i) => (
          <li key={i}>
            {s.name} ({s.roll}) - {s.course}
            <button onClick={() => deleteStudent(i)}> ❌ </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
