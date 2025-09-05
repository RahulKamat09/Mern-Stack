// -------- Reservation Form Logic -------- //
const form = document.getElementById("reservationForm");
const message = document.getElementById("message");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const bookTitle = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("author").value.trim();
    const pickupDate = document.getElementById("pickupDate").value.trim();

    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    if (!name) { document.getElementById("nameError").textContent = "Name required"; valid = false; }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) { document.getElementById("emailError").textContent = "Valid email required"; valid = false; }
    if (!/^\d{10}$/.test(phone)) { document.getElementById("phoneError").textContent = "Enter 10 digit phone"; valid = false; }
    if (!bookTitle) { document.getElementById("titleError").textContent = "Book title required"; valid = false; }
    if (!author) { document.getElementById("authorError").textContent = "Author required"; valid = false; }
    if (!pickupDate) { document.getElementById("dateError").textContent = "Pickup date required"; valid = false; }

    if (!valid) return;

    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.push({ name, email, phone, bookTitle, author, pickupDate });
    localStorage.setItem("reservations", JSON.stringify(reservations));

    message.innerHTML = `<div class="alert alert-success">🎉 Reservation saved successfully!</div>`;
    form.reset();
  });
}

// -------- View Reservations Logic -------- //
const reservationList = document.getElementById("reservationList");

if (reservationList) {
  function loadReservations() {
    reservationList.innerHTML = "";
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.forEach((res, index) => {
      const row = document.createElement("tr");
      row.classList.add("animate-fadeIn");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${res.name}</td>
        <td>${res.email}</td>
        <td>${res.phone}</td>
        <td>${res.bookTitle}</td>
        <td>${res.author}</td>
        <td>${res.pickupDate}</td>
        <td>
          <button class="btn btn-sm btn-danger delete-btn">❌ Delete</button>
        </td>
      `;

      row.querySelector(".delete-btn").addEventListener("click", () => {
        row.classList.add("fade-out");
        setTimeout(() => {
          reservations.splice(index, 1);
          localStorage.setItem("reservations", JSON.stringify(reservations));
          loadReservations();
        }, 500);
      });

      reservationList.appendChild(row);
    });
  }
  loadReservations();

  // Search filter
  document.getElementById("searchBox").addEventListener("keyup", function () {
    let filter = this.value.toLowerCase();
    document.querySelectorAll("#reservationList tr").forEach(row => {
      let text = row.innerText.toLowerCase();
      row.style.display = text.includes(filter) ? "" : "none";
    });
  });
}
