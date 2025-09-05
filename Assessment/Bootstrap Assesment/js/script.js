// -------- Reservation Form Logic -------- //
var form = document.getElementById("reservationForm");
var message = document.getElementById("message");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var bookTitle = document.getElementById("bookTitle").value.trim();
    var author = document.getElementById("author").value.trim();
    var pickupDate = document.getElementById("pickupDate").value.trim();

    // Clear errors
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("titleError").textContent = "";
    document.getElementById("authorError").textContent = "";
    document.getElementById("dateError").textContent = "";

    var valid = true;

    if (name === "") {
      document.getElementById("nameError").textContent = "Name required";
      valid = false;
    }
    if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      document.getElementById("emailError").textContent = "Valid email required";
      valid = false;
    }
    if (phone === "" || phone.length !== 10) {
      document.getElementById("phoneError").textContent = "Enter 10 digit phone";
      valid = false;
    }
    if (bookTitle === "") {
      document.getElementById("titleError").textContent = "Book title required";
      valid = false;
    }
    if (author === "") {
      document.getElementById("authorError").textContent = "Author required";
      valid = false;
    }
    if (pickupDate === "") {
      document.getElementById("dateError").textContent = "Pickup date required";
      valid = false;
    }

    if (!valid) return;

    var reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.push({
      name: name,
      email: email,
      phone: phone,
      bookTitle: bookTitle,
      author: author,
      pickupDate: pickupDate
    });
    localStorage.setItem("reservations", JSON.stringify(reservations));

    message.innerHTML = "<div class='alert alert-success'>🎉 Reservation saved successfully!</div>";
    form.reset();
  });
}

// -------- View Reservations Logic -------- //
var reservationList = document.getElementById("reservationList");

if (reservationList) {
  function loadReservations() {
    reservationList.innerHTML = "";
    var reservations = JSON.parse(localStorage.getItem("reservations")) || [];

    for (var i = 0; i < reservations.length; i++) {
      var res = reservations[i];
      var row = document.createElement("tr");
      row.className = "animate-fadeIn";

      row.innerHTML =
        "<td>" + (i + 1) + "</td>" +
        "<td>" + res.name + "</td>" +
        "<td>" + res.email + "</td>" +
        "<td>" + res.phone + "</td>" +
        "<td>" + res.bookTitle + "</td>" +
        "<td>" + res.author + "</td>" +
        "<td>" + res.pickupDate + "</td>" +
        "<td><button class='btn btn-sm btn-danger delete-btn'>❌ Delete</button></td>";

      // Delete button
      row.querySelector(".delete-btn").onclick = (function (index) {
        return function () {
          row.classList.add("fade-out");
          setTimeout(function () {
            reservations.splice(index, 1);
            localStorage.setItem("reservations", JSON.stringify(reservations));
            loadReservations();
          }, 500);
        };
      })(i);

      reservationList.appendChild(row);
    }
  }

  loadReservations();

  // Search filter (basic)
  var searchBox = document.getElementById("searchBox");
  searchBox.addEventListener("keyup", function () {
    var filter = searchBox.value.toLowerCase();
    var rows = reservationList.getElementsByTagName("tr");

    for (var j = 0; j < rows.length; j++) {
      var text = rows[j].innerText.toLowerCase();
      if (text.indexOf(filter) > -1) {
        rows[j].style.display = "";
      } else {
        rows[j].style.display = "none";
      }
    }
  });
}
