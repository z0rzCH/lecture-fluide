const readingText = document.getElementById("reading-text")?.textContent || "";
const startButton = document.getElementById("start-button");

let recognition: SpeechRecognition | null = null;

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "fr-FR";  // Pour la reconnaissance en français
  recognition.continuous = true;  // Permet de reconnaître des phrases continues
  recognition.interimResults = true;  // Permet d'afficher des résultats partiels

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }

    // Afficher la transcription dans la console (à des fins de test)
    console.log("Transcription: ", transcript);

    // Comparer avec le texte à lire
    if (transcript.trim().toLowerCase() === readingText.trim().toLowerCase()) {
      console.log("Le texte a été lu correctement !");
      // Affiche un message ou fait une action si le texte est correct
      alert("Bravo ! Vous avez lu le texte correctement.");
    } else {
      console.log("Le texte ne correspond pas.");
      // Affiche un message d'erreur ou autre
      alert("Essayez encore, le texte ne correspond pas.");
    }
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error("Erreur de reconnaissance vocale : ", event.error);
  };
}

if (startButton) {
  startButton.addEventListener("click", () => {
    if (recognition) {
      recognition.start();  // Démarre l'écoute du micro
      console.log("Le micro est en écoute...");
    }
  });
}
