// Save location from inputs to localStorage
function setLocation() {
  const lat = document.getElementById("latitude").value;
  const lng = document.getElementById("longitude").value;

  if (lat && lng) {
    localStorage.setItem("teacherLat", lat);
    localStorage.setItem("teacherLng", lng);
    document.getElementById("locationStatus").textContent = "✅ Location updated successfully!";
  } else {
    alert("⚠️ Please enter both latitude and longitude.");
  }
}

// Handle lecture form submission - send attendance data
document.getElementById("lectureForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const lat = localStorage.getItem("teacherLat");
  const lng = localStorage.getItem("teacherLng");

  if (!lat || !lng) {
    alert("⚠️ Please set your location first.");
    return;
  }

  alert("🎥 Face Recognition Attendance started within 50m range.");

  // Example attendance payload
  fetch("http://localhost:5050/teacher-api/attendance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subject: "Maths", // you can replace this dynamically as needed
      date: new Date().toISOString().split('T')[0], // current date YYYY-MM-DD
      time: new Date().toLocaleTimeString(), // current time in local format
      location: { lat, lng },
      studentsPresent: ["T001", "T002"] // replace with actual present student IDs
    }),
  })
  .then(res => res.json())
  .then(data => console.log("Attendance saved:", data))
  .catch(err => console.error("Attendance save error:", err));
});

// Handle marks form submission - send marks data
document.getElementById("marksForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const rollNo = document.getElementById("roll").value;
  const subject = document.getElementById("subject").value;
  const marks = document.getElementById("marks").value;

  if (!rollNo || !subject || !marks) {
    alert("⚠️ Please fill all the marks form fields.");
    return;
  }

  fetch("http://localhost:5050/teacher-api/marks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rollNo, subject, marks }),
  })
  .then(res => res.json())
  .then(data => {
    alert("✅ Marks saved to MongoDB!");
    console.log(data);
  })
  .catch(err => {
    alert("❌ Error saving marks.");
    console.error(err);
  });
});

let map, marker, circle;

// Initialize Leaflet map
function initMap() {
  const defaultLat = 16.6956;
  const defaultLng = 74.2317;

  map = L.map('map').setView([defaultLat, defaultLng], 16);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  marker = L.marker([defaultLat, defaultLng], { draggable: true }).addTo(map);
  circle = L.circle([defaultLat, defaultLng], { radius: 50 }).addTo(map);

  marker.on('dragend', function () {
    const pos = marker.getLatLng();
    updateInputs(pos.lat, pos.lng);
    updateCircle(pos.lat, pos.lng);
  });

  map.on('click', function (e) {
    updateInputs(e.latlng.lat, e.latlng.lng);
    updateMarker(e.latlng.lat, e.latlng.lng);
    updateCircle(e.latlng.lat, e.latlng.lng);
  });
}

// Update latitude and longitude input fields
function updateInputs(lat, lng) {
  document.getElementById("latitude").value = lat.toFixed(6);
  document.getElementById("longitude").value = lng.toFixed(6);
}

// Move the marker on map to new location and center map
function updateMarker(lat, lng) {
  marker.setLatLng([lat, lng]);
  map.setView([lat, lng], 16);
}

// Move the circle to new location
function updateCircle(lat, lng) {
  circle.setLatLng([lat, lng]);
}

// Update map and inputs based on manual input changes
function updateMap() {
  const lat = parseFloat(document.getElementById("latitude").value);
  const lng = parseFloat(document.getElementById("longitude").value);

  if (!isNaN(lat) && !isNaN(lng)) {
    updateMarker(lat, lng);
    updateCircle(lat, lng);
    document.getElementById("locationStatus").textContent = "✅ Location updated on map.";
  } else {
    alert("⚠️ Please enter valid coordinates.");
  }
}

// Initialize map on page load
document.addEventListener("DOMContentLoaded", initMap);
const resultsRoutes = require('./routes/resultsRoute');
app.use('/teacher-api/results', resultsRoutes);
