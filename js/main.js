// ----------------- QUIZ -----------------
document.addEventListener("DOMContentLoaded", () => {
  const quizData = [
    {
      text: "Riya wants to create a strong password for her email. Which of the following passwords is the strongest?",
      options: [
        { text: "A) riya123", correct: false },
        { text: "B) Riya123!", correct: true },
        { text: "C) mypassword", correct: false },
        { text: "D) 12345678", correct: false }
      ],
      explanation: "It has uppercase, lowercase, numbers, and a special character — making it strong."
    },
    {
      text: "You receive an email from “Your Bank” asking you to click a link and confirm your password. What should you do?",
      options: [
        { text: "A) Click the link immediately.", correct: false },
        { text: "B) Reply with your password.", correct: false },
        { text: "C) Verify the sender and access the bank site directly instead of clicking the link.", correct: true },
        { text: "D) Forward it to a friend for advice.", correct: false }
      ],
      explanation: "Always verify the sender and type the bank’s URL yourself to prevent phishing attacks."
    },
    {
      text: "Alex notices a friend posting personal addresses and phone numbers online. What is the most responsible action?",
      options: [
        { text: "A) Ignore it; it’s their choice.", correct: false },
        { text: "B) Report the post to the platform and advise the friend privately.", correct: true },
        { text: "C) Share the post with other friends.", correct: false },
        { text: "D) Comment publicly to warn everyone.", correct: false }
      ],
      explanation: "Reporting keeps the friend safe while advising privately maintains respect and responsibility."
    },
    {
      text: "Sam spends 6 hours daily on video games and feels tired and distracted at school. What should he do?",
      options: [
        { text: "A) Keep gaming; school performance is not important.", correct: false },
        { text: "B) Reduce screen time gradually and set daily limits.", correct: true },
        { text: "C) Stop gaming completely and never play again.", correct: false },
        { text: "D) Ignore it and sleep less to catch up.", correct: false }
      ],
      explanation: "Gradual reduction is healthy and helps maintain balance between leisure and responsibilities."
    },
    {
      text: "Maya sees a classmate being mocked in a group chat. What is the best course of action?",
      options: [
        { text: "A) Join in and make fun of them.", correct: false },
        { text: "B) Report the incident to a trusted adult or teacher.", correct: true },
        { text: "C) Leave the group quietly.", correct: false },
        { text: "D) Share the chat with more people to expose them.", correct: false }
      ],
      explanation: "Reporting helps stop cyberbullying and protects everyone involved."
    }
  ];

  let currentQ = 0;
  let score = 0;

  const questionEl = document.getElementById("question-placeholder");
  const optionsEl = document.getElementById("options-placeholder");
  const explanationEl = document.getElementById("explanation");
  const nextBtn = document.getElementById("next-btn");
  const progressBar = document.getElementById("quiz-progress-bar");
  const progressText = document.getElementById("progress-percentage");

  function loadQuestion(index) {
    const q = quizData[index];
    questionEl.innerHTML = `<p><strong>Q${index + 1}:</strong> ${q.text}</p>`;
    optionsEl.innerHTML = "";
    explanationEl.style.display = "none";

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.classList.add("option");
      btn.innerText = opt.text;
      btn.dataset.correct = opt.correct;
      btn.addEventListener("click", () => selectAnswer(btn, q.explanation));
      optionsEl.appendChild(btn);
    });
  }

  function selectAnswer(selectedBtn, explanation) {
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.correct === "true") btn.classList.add("correct");
      if (btn === selectedBtn && btn.dataset.correct === "false") btn.classList.add("wrong");
    });

    // Score update
    if (selectedBtn.dataset.correct === "true") score++;

    explanationEl.innerHTML = `<p>${explanation}</p>`;
    explanationEl.style.display = "block";

    // Update quiz progress
    const progressPercent = Math.round(((currentQ + 1) / quizData.length) * 100);
    if (progressBar) progressBar.value = progressPercent;
    if (progressText) progressText.textContent = `${progressPercent}% (${currentQ + 1}/${quizData.length})`;
  }

  nextBtn.addEventListener("click", () => {
    if (currentQ < quizData.length - 1) {
      currentQ++;
      loadQuestion(currentQ);
    } else {
      questionEl.innerHTML = `<h3>🎉 Quiz Complete! Your score: ${score}/${quizData.length}</h3>`;
      optionsEl.innerHTML = "";
      explanationEl.style.display = "none";
      nextBtn.style.display = "none";
      if (progressBar) progressBar.value = 100;
      if (progressText) progressText.textContent = `100% (${quizData.length}/${quizData.length})`;
    }
  });

  // Initial load
  loadQuestion(currentQ);
});

// ----------------- MODULE PROGRESS -----------------
const allModules = [
  "cs_passwords","cs_phishing","cs_suslinks","cs_privacy","cs_cyberbullying","cs_antivirus","cs_multfactauth","cs_devlock","cs_catfishing",
  "dr_compare","dr_kindness","dr_privacy","dr_socialMedia","dr_footprint","dr_screenTime","dr_plagiarism","dr_gaming"
];

const STORAGE_KEY = "completedModules";

function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveProgress(completed) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
}

function completeModule(moduleId, buttonEl) {
  let completed = loadProgress();
  if (!completed.includes(moduleId)) {
    completed.push(moduleId);
    saveProgress(completed);
  }
  if (buttonEl) {
    buttonEl.disabled = true;
    buttonEl.innerText = "Completed ✔";
  }
  updateProgressBar();
}

function updateProgressBar() {
  const completed = loadProgress();
  const total = allModules.length;
  const done = completed.length;
  const percent = Math.round((done / total) * 100);

  const progressEl = document.getElementById("learningProgress");
  const valueEl = document.getElementById("progressValue");

  if (progressEl) progressEl.value = percent;
  if (valueEl) valueEl.textContent = `${percent}% (${done}/${total})`;
}

function setupModuleButton(moduleId) {
  const btn = document.querySelector(".mark-complete-btn");
  if (!btn) return;

  const completed = loadProgress();
  if (completed.includes(moduleId)) {
    btn.disabled = true;
    btn.innerText = "Completed ✔";
  }

  btn.addEventListener("click", () => completeModule(moduleId, btn));
}

// Run progress bar update safely on home pages
document.addEventListener("DOMContentLoaded", updateProgressBar);

// QUIZ ACCESS CONTROL
document.addEventListener("DOMContentLoaded", () => {
    const completed = loadProgress(); // from your existing module progress
    const totalModules = allModules.length;
    const completedPercent = (completed.length / totalModules) * 100;
    const minPercent = 80; // Minimum modules completion required

    const quizContainer = document.getElementById("quiz-container");
    const quizMessage = document.getElementById("quiz-message");

    if (completedPercent < minPercent) {
        // Block the quiz
        if (quizContainer) quizContainer.style.display = "none";
        if (quizMessage) {
            quizMessage.innerHTML = `
                <p style="color:red; font-weight:bold;">
                    You need to complete at least 80% of all modules before accessing this minigame.<br>
                    Current completion: ${Math.round(completedPercent)}% (${completed.length}/${totalModules})
                </p>`;
            quizMessage.style.display = "block";
        }
    } else {
        // Allow the quiz
        if (quizContainer) quizContainer.style.display = "block";
        if (quizMessage) quizMessage.style.display = "none";
    }
});