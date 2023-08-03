// Récupération des éléments du DOM
const video = document.getElementById('video');
const captureBtn = document.getElementById('captureBtn');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Demande l'autorisation d'utiliser la caméra
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
    video.srcObject = stream;
  })
  .catch(function(error) {
    console.error('Une erreur s\'est produite lors de l\'accès à la caméra : ', error);
  });

// Fonction pour prendre une photo
function takePhoto() {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageURI = canvas.toDataURL(); // Convertit le contenu du canvas en base64

  // Envoie de la photo par email via Formspree
  const formData = new FormData();
  formData.append('image', imageURI);

  fetch('https://formspree.io/ton-email-ici', {
    method: 'POST',
    body: formData,
  })
  .then(function(response) {
    if (response.ok) {
      alert('Photo envoyée avec succès !');
    } else {
      alert('Une erreur s\'est produite lors de l\'envoi de la photo.');
    }
  })
  .catch(function(error) {
    console
