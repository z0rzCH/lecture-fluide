// Vérifie si l'API SpeechRecognition est disponible dans le navigateur
let recognition: SpeechRecognition | null = null;

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
  // Crée une instance de la reconnaissance vocale
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  // Quand un résultat est obtenu
  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript; // Le texte reconnu
    console.log("Texte reconnu:", transcript);
  };

  // Quand il y a une erreur
  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error("Erreur de reconnaissance vocale:", event.error);
  };

  // Démarre la reconnaissance vocale
  recognition.start();
} else {
  console.error("La reconnaissance vocale n'est pas prise en charge dans ce navigateur.");
}
