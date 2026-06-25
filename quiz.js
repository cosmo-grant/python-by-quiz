class Quiz {
  constructor() {
    this.getElements();
    this.populateQuizChoices();
    this.setupEventListeners();

    const savedState = this.loadState();
    if (savedState) {
      // Offer user choice to resume or start afresh.
      this.showContinueDialog();
      this.savedTitleDialog.textContent = savedState.title;
      this.savedQuestionDialog.textContent = savedState.currentQuestion + 1;
      this.totalQuestionsDialog.textContent =
        QUESTIONS_PER_QUIZ[savedState.title].length;

      this.continueFromSavedButton.addEventListener("click", () => {
        this.currentQuiz = savedState.title;
        this.currentQuestion = savedState.currentQuestion;
        this.answers = savedState.answers;
        this.questions = QUESTIONS_PER_QUIZ[this.currentQuiz];
        this.startQuiz();
      });

      this.restartFromSavedButton.addEventListener("click", () => {
        this.restart();
      });
    } else {
      // no saved state; fresh start
      this.restart();
    }
  }

  getElements() {
    this.mainContent = document.getElementById("main-content");
    this.splashScreen = document.getElementById("splash-screen");
    this.quizChoices = document.getElementById("quiz-choices");
    this.finalScoreSection = document.getElementById("final-score-section");
    this.finalScoreValue = document.getElementById("final-score-value");
    this.finalScoreMax = document.getElementById("final-score-max");
    this.finalScoreMessage = document.getElementById("final-score-message");
    this.restartButton = document.getElementById("restart-button");

    this.codeDisplay = document.getElementById("code-display");
    this.prefaceText = document.getElementById("preface-text");
    this.nextButton = document.getElementById("next-button");
    this.answerButtons = [
      document.getElementById("answer-0"),
      document.getElementById("answer-1"),
      document.getElementById("answer-2"),
    ];
    this.answerButtonTexts = [
      document.getElementById("answer-0-text"),
      document.getElementById("answer-1-text"),
      document.getElementById("answer-2-text"),
    ];
    this.explanationSection = document.getElementById("explanation-section");
    this.explanationText = document.getElementById("explanation-text");
    this.finishButton = document.getElementById("finish-button");
    this.navBar = document.getElementById("nav-bar");

    this.continueDialog = document.getElementById("continue-dialog");
    this.savedTitleDialog = document.getElementById("saved-title-dialog");
    this.savedQuestionDialog = document.getElementById("saved-question-dialog");
    this.totalQuestionsDialog = document.getElementById(
      "total-questions-dialog",
    );
    this.continueFromSavedButton = document.getElementById(
      "continue-from-saved-button",
    );
    this.restartFromSavedButton = document.getElementById(
      "restart-from-saved-button",
    );
  }

  populateNavBar() {
    // clear any existing buttons
    this.navBar.innerHTML = "";

    // add a button per question
    for (let i = 0; i < this.questions.length; i++) {
      const button = document.createElement("button");
      button.textContent = i + 1;
      this.navBar.appendChild(button);
    }
    this.navButtons = [...this.navBar.children];
  }

  populateQuizChoices() {
    Object.keys(QUESTIONS_PER_QUIZ).forEach((title) => {
      const button = document.createElement("button");
      button.textContent = title;
      this.quizChoices.appendChild(button);
    });
    this.quizButtons = [...this.quizChoices.children];
  }

  showContinueDialog() {
    this.splashScreen.hidden = true;
    this.continueDialog.hidden = false;
    this.mainContent.hidden = true;
    this.finalScoreSection.hidden = true;
    this.navBar.hidden = true;
  }

  showSplashScreen() {
    this.splashScreen.hidden = false;
    this.continueDialog.hidden = true;
    this.mainContent.hidden = true;
    this.finalScoreSection.hidden = true;
    this.navBar.hidden = true;
  }

  showMainContent() {
    this.splashScreen.hidden = true;
    this.continueDialog.hidden = true;
    this.mainContent.hidden = false;
    this.finalScoreSection.hidden = true;
    this.navBar.hidden = false;
  }

  showFinalScoreSection() {
    this.splashScreen.hidden = true;
    this.continueDialog.hidden = true;
    this.mainContent.hidden = true;
    this.finalScoreSection.hidden = false;
    this.navBar.hidden = true;
  }

  setupEventListeners() {
    // Handle some keyboard interaction.
    // The approach is to translate keyboard events into click events.
    // So the direct cause of behaviour is always clicks.
    // We need guards though, e.g. to prevent clicking disabled or hidden buttons.
    document.addEventListener("keydown", (event) => {
      // Enter or Space to finish, restart, or move to next question
      // Use `else if` even when the conditions are statically incompatible to prevent races.
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (this.nextButton.style.display === "block") {
          this.nextButton.dispatchEvent(new Event("click"));
        } else if (
          this.finishButton.style.display === "block" &&
          this.finalScoreSection.hidden
        ) {
          this.finishButton.dispatchEvent(new Event("click"));
        } else if (!this.finalScoreSection.hidden) {
          this.restartButton.dispatchEvent(new Event("click"));
        }
      }

      // Arrow keys to move between viewable questions.
      if (
        event.key === "ArrowLeft" &&
        !this.mainContent.hidden &&
        this.viewedQuestion - 1 >= 0
      ) {
        event.preventDefault();
        const navButton = this.navButtons[this.viewedQuestion - 1];
        navButton.dispatchEvent(new Event("click"));
      }

      if (
        event.key === "ArrowRight" &&
        !this.mainContent.hidden &&
        this.viewedQuestion + 1 <= this.currentQuestion
      ) {
        event.preventDefault();
        const navButton = this.navButtons[this.viewedQuestion + 1];
        navButton.dispatchEvent(new Event("click"));
      }
      // Number keys to select answers.
      if (
        event.key >= "1" &&
        event.key <= this.answerButtons.length.toString() &&
        !this.answerButtons[0].disabled
      ) {
        event.preventDefault();
        const answerIndex = parseInt(event.key) - 1;
        this.answerButtons[answerIndex].dispatchEvent(new Event("click"));
      }
    });

    this.quizButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Set quiz-specific state.
        this.currentQuiz = button.textContent;
        this.questions = QUESTIONS_PER_QUIZ[this.currentQuiz];
        this.answers = Array(this.questions.length).fill(null);

        this.startQuiz();
      });
    });

    this.answerButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        this.selectAnswer(index);
      });
    });

    this.nextButton.addEventListener("click", () => this.nextQuestion());
    this.finishButton.addEventListener("click", () => this.finishQuiz());
    this.restartButton.addEventListener("click", () => this.restart());
    this.restartFromSavedButton.addEventListener("click", () => this.restart());
  }

  startQuiz() {
    this.populateNavBar();
    this.navButtons.forEach((button, index) =>
      button.addEventListener("click", () => this.loadQuestion(index)),
    );
    this.showMainContent();
    this.finishButton.style.display = "none";
    for (let i = 0; i <= this.currentQuestion; i++) {
      this.navButtons[i].disabled = false;
    }
    for (let i = this.currentQuestion + 1; i < this.questions.length; i++) {
      this.navButtons[i].disabled = true;
    }
    // Restore nav button classes for previously answered questions
    for (let i = 0; i < this.answers.length; i++) {
      const navBtn = this.navButtons[i];
      navBtn.classList.remove("viewing", "correct");
      if (
        this.answers[i] !== null &&
        this.answers[i] === this.questions[i].correct
      ) {
        navBtn.classList.add("correct");
      }
    }
    this.loadQuestion(this.currentQuestion);
  }

  computeScore() {
    return this.answers.filter(
      (selectedAnswer, questionIndex) =>
        selectedAnswer === this.questions[questionIndex].correct,
    ).length;
  }

  restart() {
    // Make it as though coming to the site for the very first time.
    this.clearState();
    this.currentQuestion = 0;
    this.showSplashScreen();
  }

  hasAnsweredCurrentQuestion() {
    return this.answers[this.currentQuestion] !== null;
  }

  loadQuestion(index) {
    const question = this.questions[index];
    this.viewedQuestion = index;
    this.codeDisplay.textContent = question.code;
    this.codeDisplay.removeAttribute("data-highlighted"); // else highlightjs skips re-highlighting
    hljs.highlightElement(this.codeDisplay);
    this.prefaceText.innerHTML = question.preface;
    this.answerButtonTexts.forEach((samp, index) => {
      samp.textContent = question.answers[index];
    });

    // Clear answer button classes
    this.answerButtons.forEach((button) => {
      button.classList.remove("selected", "correct");
    });

    // Update nav bar: mark which question is being viewed
    this.navButtons.forEach((btn) => btn.classList.remove("viewing"));
    this.navButtons[index].classList.add("viewing");

    if (index < this.currentQuestion) {
      // reviewing a previous question
      this.answerButtons.forEach((button) => {
        button.disabled = true;
      });
      const selectedIndex = this.answers[index];
      this.answerButtons[selectedIndex].classList.add("selected");
      this.answerButtons[question.correct].classList.add("correct");
      this.explanationText.innerHTML = question.explanation;
      this.explanationSection.style.display = "block";
      this.nextButton.style.display = "none";
    } else if (
      index === this.currentQuestion &&
      !this.hasAnsweredCurrentQuestion()
    ) {
      // answering the current question
      this.answerButtons.forEach((button) => {
        button.disabled = false;
      });
      this.explanationSection.style.display = "none";
      this.nextButton.style.display = "none";
    } else if (
      index === this.currentQuestion &&
      this.hasAnsweredCurrentQuestion()
    ) {
      // reviewing the current question
      this.answerButtons.forEach((button) => {
        button.disabled = true;
      });
      const selectedIndex = this.answers[index];
      this.answerButtons[selectedIndex].classList.add("selected");
      this.answerButtons[question.correct].classList.add("correct");
      this.explanationText.innerHTML = question.explanation;
      this.explanationSection.style.display = "block";
      if (this.currentQuestion === this.questions.length - 1) {
        this.nextButton.style.display = "none";
        this.finishButton.style.display = "block";
      } else {
        this.nextButton.style.display = "block";
        this.finishButton.style.display = "none";
      }
    }
  }

  selectAnswer(selectedIndex) {
    this.answerButtons.forEach((button) => {
      button.disabled = true;
    });

    const question = this.questions[this.currentQuestion];
    const correctIndex = question.correct;
    const isCorrect = correctIndex === selectedIndex;
    this.answers[this.currentQuestion] = selectedIndex;
    this.saveState();

    // Update answer buttons: show selected and correct
    this.answerButtons[selectedIndex].classList.add("selected");
    this.answerButtons[correctIndex].classList.add("correct");

    // Update nav bar: mark this question as correct
    if (isCorrect) {
      const navBtn = this.navButtons[this.currentQuestion];
      navBtn.classList.add("correct");
    }

    if (this.currentQuestion === this.questions.length - 1) {
      this.nextButton.style.display = "none";
      this.finishButton.style.display = "block";
    } else {
      this.nextButton.style.display = "block";
      this.finishButton.style.display = "none";
    }
    this.explanationText.innerHTML = question.explanation;
    this.explanationSection.style.display = "block";
  }

  nextQuestion() {
    this.currentQuestion++;
    this.saveState();
    this.navButtons[this.currentQuestion].disabled = false;
    this.loadQuestion(this.currentQuestion);
  }

  finishQuiz() {
    this.clearState();
    this.showFinalScoreSection();
    this.finalScoreValue.textContent = this.computeScore();
    this.finalScoreMax.textContent = this.questions.length;

    let message = "";
    const percentage = (this.computeScore() / this.questions.length) * 100; // use % in case question count changes

    if (percentage === 100) {
      message = "&#x1f92f;";
    } else if (percentage >= 80) {
      message = "&#x1f60e;";
    } else if (percentage >= 60) {
      message = "&#x1f642;";
    } else if (percentage >= 40) {
      message = "&#x1f62c;";
    } else {
      message = "&#x1f648;";
    }

    this.finalScoreMessage.innerHTML = message;
  }

  // There is at most one quiz in progress.
  // The user can either resume that quiz or start completely afresh (which clears saved state).
  // saveState() should be called after any state-changing action.
  saveState() {
    const state = {
      title: this.currentQuiz,
      currentQuestion: this.currentQuestion,
      answers: this.answers,
    };
    localStorage.setItem("python-fundamentals-quizzes", JSON.stringify(state));
  }

  loadState() {
    try {
      const savedState = localStorage.getItem("python-fundamentals-quizzes");
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (e) {
      console.warn("Failed to load saved quiz state:", e);
    }
    return null;
  }

  clearState() {
    localStorage.removeItem("python-fundamentals-quizzes");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Quiz();
});
