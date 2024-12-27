const readingText = document.getElementById("reading-text")?.textContent || "";
const transcriptElement = document.getElementById("transcript") as HTMLElement;
const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
const stopBtn = document.getElementById("stop-btn") as HTMLButtonElement;
const resetBtn = document.getElementById("reset-btn") as HTMLButtonElement;

let recognition: SpeechRecognition | null = null;

if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = "fr-FR";
  recognition.continuous = true;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    transcriptElement.textContent = transcript;
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error("Speech recognition error:", event.error);
  };
} else {
  alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
}

startBtn.addEventListener("click", () => {
  recognition?.start();
});

stopBtn.addEventListener("click", () => {
  recognition?.stop();
});

resetBtn.addEventListener("click", () => {
  transcriptElement.textContent = "";
});
