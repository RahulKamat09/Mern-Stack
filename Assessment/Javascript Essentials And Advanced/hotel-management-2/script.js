// Show message box
function showMsg(msg, type = "success") {
    const box = document.getElementById("msgBox");
    if (box) {
        box.innerHTML = `<div class="alert alert-${type === 'success' ? 'success' : 'danger'} fade-in">${msg}</div>`;
        setTimeout(() => box.innerHTML = "", 3000);
    }
}

// Save to localStorage
function saveGuest(data) {
    let guests = JSON.parse(localStorage.getItem("guests") || "[]");
    guests.push(data);
    localStorage.setItem("guests", JSON.stringify(guests));
}

// Load guests in table
function loadGuests() {
    const tableBody = document.querySelector("#guestTable tbody");
    if (!tableBody) return;
    tableBody.innerHTML = "";
    let guests = JSON.parse(localStorage.getItem("guests") || "[]");
    if (guests.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" class="text-center text-muted">No guests found</td></tr>`;
        return;
    }
    guests.forEach((g, i) => {
        let row = document.createElement("tr");
        row.classList.add("fade-in");
        row.innerHTML = `
      <td>${g.fullName}</td>
      <td>${g.phone}</td>
      <td>${g.email}</td>
      <td>${g.checkin}</td>
      <td>${g.checkout}</td>
      <td>${g.adults}</td>
      <td>${g.purpose}</td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteGuest(${i})">Delete</button></td>
    `;
        tableBody.appendChild(row);
    });
}

// Delete guest
function deleteGuest(index) {
    let guests = JSON.parse(localStorage.getItem("guests") || "[]");
    guests.splice(index, 1);
    localStorage.setItem("guests", JSON.stringify(guests));
    loadGuests();
}

// Clear all guests
function clearAll() {
    localStorage.removeItem("guests");
    loadGuests();
}

// Handle Registration Page
const form = document.getElementById("guestForm");
if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault();
        const data = {
            fullName: document.getElementById("fullName").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            email: document.getElementById("email").value.trim(),
            address: document.getElementById("address").value.trim(),
            aadhar: document.getElementById("aadhar").value.trim(),
            adults: document.getElementById("adults").value,
            checkin: document.getElementById("checkin").value,
            checkout: document.getElementById("checkout").value,
            purpose: document.getElementById("purpose").value.trim()
        };

        // ✅ Simple Validations
        if (data.fullName.length < 3) { showMsg("Name must be at least 3 characters", "error"); return; }
        if (!/^\d{10}$/.test(data.phone)) { showMsg("Phone must be 10 digits", "error"); return; }
        if (!/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) { showMsg("Enter a valid email", "error"); return; }
        if (!/^\d{12}$/.test(data.aadhar)) { showMsg("Aadhar must be 12 digits", "error"); return; }
        if (!data.address) { showMsg("Address is required", "error"); return; }
        if (!data.checkin || !data.checkout) { showMsg("Check-in and Check-out required", "error"); return; }
        if (!data.adults || data.adults < 1) { showMsg("Number of adults required", "error"); return; }
        if (!data.purpose) { showMsg("Purpose is required", "error"); return; }

        saveGuest(data);
        form.reset();
        showMsg("Guest saved successfully!");
    });

    document.getElementById("clearBtn").addEventListener("click", () => form.reset());
}

// Handle View Page
if (document.getElementById("guestTable")) {
    loadGuests();
    document.getElementById("clearAll").addEventListener("click", clearAll);
}
