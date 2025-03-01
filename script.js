function toggleAttendance(name, button) {
    let selectedSubject = document.getElementById("subjek").value;
    
    if (!dataStore[selectedSubject]) return;

    let student = dataStore[selectedSubject].find(s => s.name === name);
    
    if (student) {
        student.status = (student.status === "Hadir") ? "Tidak Hadir" : "Hadir";
        button.textContent = student.status;
        
        // Tukar warna butang
        if (student.status === "Hadir") {
            button.classList.remove("tidak-hadir");
            button.classList.add("hadir");
        } else {
            button.classList.remove("hadir");
            button.classList.add("tidak-hadir");
        }

        saveData();
    }
}

function addStudentToTable(name, status, points, notes) {
    let table = document.getElementById("attendanceTable");
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell1.textContent = name;

    let button = document.createElement("button");
    button.textContent = status;
    button.classList.add("btn", status === "Hadir" ? "hadir" : "tidak-hadir");
    
    // Tambahkan event listener untuk toggle kehadiran
    button.onclick = function () {
        toggleAttendance(name, button);
    };

    cell2.appendChild(button);

    let pointInput = document.createElement("input");
    pointInput.type = "number";
    pointInput.min = "0";
    pointInput.max = "100";
    pointInput.value = points;
    pointInput.onchange = function () {
        updatePoints(name, pointInput.value);
        saveData();
    };
    cell3.appendChild(pointInput);

    let noteInput = document.createElement("input");
    noteInput.type = "text";
    noteInput.value = notes;
    noteInput.onchange = function () {
        updateNotes(name, noteInput.value);
        saveData();
    };
    cell4.appendChild(noteInput);
}
