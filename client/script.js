const API = "http://localhost:5000";


const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const courseInput = document.getElementById("course");
const list = document.getElementById("list");

function addStudent() {
    fetch(API + "/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nameInput.value,
            roll: rollInput.value,
            course: courseInput.value
        })
    }).then(() => {
        nameInput.value = "";
        rollInput.value = "";
        courseInput.value = "";
        loadStudents();
    });
}

function loadStudents() {
    fetch(API + "/students")
        .then(res => res.json())
        .then(data => {
            list.innerHTML = "";
            data.forEach((s, i) => {
                list.innerHTML += `
                    <li>
                        ${s.name} (${s.roll}) - ${s.course}
                        <button onclick="deleteStudent(${i})">❌</button>
                    </li>
                `;
            });
        });
}

function deleteStudent(index) {
    fetch(API + "/delete/" + index, {
        method: "DELETE"
    }).then(loadStudents);
}

loadStudents();
