let map;
let currentLatLng;

function initMap() {
  map = L.map('map').setView([5.4204, 103.0400], 13); // UMT location
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      currentLatLng = [latitude, longitude];
      map.setView(currentLatLng, 15);
      L.marker(currentLatLng).addTo(map).bindPopup("You're here").openPopup();
    });
  } else {
    alert("Geolocation not supported.");
  }
}

document.getElementById('cameraInput').addEventListener('change', function () {
  const file = this.files[0];
  if (file && currentLatLng) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imgData = e.target.result;

      // Add marker with image popup
      const marker = L.marker(currentLatLng).addTo(map);
      marker.bindPopup(`<img src="${imgData}" width="100">`).openPopup();

      // Add to gallery
      const img = document.createElement('img');
      img.src = imgData;
      document.getElementById('imageList').appendChild(img);
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please get your location first.");
  }
});

window.onload = () => {
  initMap();

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log("Service Worker Registered"));
  }
};
