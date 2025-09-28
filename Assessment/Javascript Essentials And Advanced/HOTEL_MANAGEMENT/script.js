// script.js - simple version

// Save guest
function saveGuest(data) {
  let guests = JSON.parse(localStorage.getItem("hotelSubmissions") || "[]");
  guests.push(data);
  localStorage.setItem("hotelSubmissions", JSON.stringify(guests));
}

// Load guests
function loadGuests() {
  const container = document.getElementById("submissionsContainer");
  if (!container) return;

  let guests = JSON.parse(localStorage.getItem("hotelSubmissions") || "[]");
  if (guests.length === 0) {
    container.innerHTML = "<p class='text-center p-4 text-muted'>No guest submissions found.</p>";
    return;
  }

  let html = "<table class='table table-bordered table-striped align-middle fade-in'><thead><tr>";
  html += "<th>Name</th><th>Phone</th><th>Email</th><th>Check-in</th><th>Check-out</th><th>Adults</th><th>Purpose</th><th>Action</th></tr></thead><tbody>";

  guests.forEach((g, i) => {
    html += `<tr>
      <td>${g.fullName}</td>
      <td>${g.phone}</td>
      <td>${g.email}</td>
      <td>${g.checkin}</td>
      <td>${g.checkout}</td>
      <td>${g.adults}</td>
      <td>${g.purpose}</td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteGuest(${i})">Delete</button></td>
    </tr>`;
  });

  html += "</tbody></table>";
  container.innerHTML = html;
}

// Delete one guest
function deleteGuest(index) {
  let guests = JSON.parse(localStorage.getItem("hotelSubmissions") || "[]");
  guests.splice(index, 1);
  localStorage.setItem("hotelSubmissions", JSON.stringify(guests));
  loadGuests();
}

// Clear all guests
function clearAll() {
  localStorage.removeItem("hotelSubmissions");
  loadGuests();
}

// Handle Registration Form
const form = document.getElementById("guestRegistrationForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
      fullName: document.getElementById("fullName").value.trim(),
      phone: document.getElementById("phoneNumber").value.trim(),
      email: document.getElementById("email").value.trim(),
      address: document.getElementById("address").value.trim(),
      aadhar: document.getElementById("aadharNumber").value.trim(),
      adults: document.getElementById("numberOfAdults").value,
      checkin: document.getElementById("checkInDate").value,
      checkout: document.getElementById("checkOutDate").value,
      purpose: document.getElementById("purposeOfVisit").value.trim()
    };

    // Basic validation
    if (!data.fullName || !/^\d{10}$/.test(data.phone) || !/^\d{12}$/.test(data.aadhar)) {
      alert("Please fill all required fields correctly.");
      return;
    }

    saveGuest(data);
    form.reset();

    // Show success modal if exists
    const modalEl = document.getElementById("successModal");
    if (modalEl) {
      new bootstrap.Modal(modalEl).show();
    } else {
      alert("Guest saved successfully!");
    }
  });

  document.getElementById("clearForm").addEventListener("click", () => form.reset());
}

// Handle View Submissions Page
if (document.getElementById("submissionsContainer")) {
  loadGuests();
  document.getElementById("clearAllSubmissions").addEventListener("click", clearAll);
}
