

const bookingForm = document.getElementById("bookingForm");
const bookingList = document.getElementById("bookingList");


let bookings = JSON.parse(localStorage.getItem("bookings")) || [];


function showBookings() {
    bookingList.innerHTML = "";

    if (bookings.length === 0) {
        bookingList.innerHTML =
            '<p class="no-bookings">No bookings yet.</p>';
        return;
    }

    bookings.forEach(function(booking, index) {
        const card = document.createElement("div");
        card.className = "booking-card";

        const heading = document.createElement("h3");
        heading.textContent = "Reservation #" + (index + 1);
        card.appendChild(heading);

        const details = [
            ["Name", booking.name],
            ["Email", booking.email],
            ["Guests", booking.guests],
            ["Date", booking.date]
        ];

        details.forEach(function(detail) {
            const p = document.createElement("p");
            const strong = document.createElement("strong");

            strong.textContent = detail[0] + ": ";
            p.appendChild(strong);
            p.appendChild(document.createTextNode(detail[1]));

            card.appendChild(p);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Cancel Booking";

        deleteButton.addEventListener("click", function() {
            deleteBooking(index);
        });

        card.appendChild(deleteButton);
        bookingList.appendChild(card);
    });
}


bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const booking = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        guests: document.getElementById("guests").value,
        date: document.getElementById("date").value
    };

    // Prevent booking a date in the past
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayString = year + "-" + month + "-" + day;

    if (booking.date < todayString) {
        alert("Please select today or a future date.");
        return;
    }

    bookings.push(booking);


    localStorage.setItem("bookings", JSON.stringify(bookings));

 
    showBookings();

    bookingForm.reset();

    alert("Your reservation has been saved!");
});


function deleteBooking(index) {
    const confirmed = confirm(
        "Are you sure you want to cancel this booking?"
    );

    if (confirmed) {
        bookings.splice(index, 1);
        localStorage.setItem("bookings", JSON.stringify(bookings));
        showBookings();
    }
}

const dateInput = document.getElementById("date");

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

dateInput.min = year + "-" + month + "-" + day;

showBookings();

