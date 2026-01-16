const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const currentQuestionEl = document.getElementById("current-question");
const totalQuestionsEl = document.getElementById("total-questions");

const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress");

const finalScoreEl = document.getElementById("final-score");
const maxScoreEl = document.getElementById("max-score");

const quizQuestions = [
    {
        question: "Who is the founder of Microsoft?",
        answers: [
            { text: "Steve Jobs", correct: false },
            { text: "Jeff Bezos", correct: false },
            { text: "Bill Gates", correct: true },
            { text: "Larry Page", correct: false }
        ]
    },
    {
        question: "What is the color of an apple?",
        answers: [
            { text: "Blue", correct: false },
            { text: "Red", correct: true },
            { text: "Yellow", correct: false },
            { text: "Green", correct: false }
        ]
    },
    {
        question: "Who was the first President of the United States?",
        answers: [
            { text: "Joe Biden", correct: false },
            { text: "George Washington", correct: true },
            { text: "Thomas Jefferson", correct: false },
            { text: "Abraham Lincoln", correct: false }
        ]
    },
    {
        question: "What is the derivative of ln(x²)?",
        answers: [
            { text: "1/x", correct: false },
            { text: "2x", correct: false },
            { text: "2/x", correct: true },
            { text: "x", correct: false }
        ]
    },
    {
        question: "Which particle mediates the strong nuclear force?",
        answers: [
            { text: "Photon", correct: false },
            { text: "W Boson", correct: false },
            { text: "Higgs Boson", correct: false },
            { text: "Gluon", correct: true }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsEl.textContent = quizQuestions.length;
maxScoreEl.textContent = quizQuestions.length;

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    currentQuestionIndex = 0;
    score = 0;

    showQuestion();
}

function showQuestion() {
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    questionText.textContent = currentQuestion.question;
    currentQuestionEl.textContent = currentQuestionIndex + 1;

    progressBar.style.width =
        ((currentQuestionIndex + 1) / quizQuestions.length) * 100 + "%";

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.classList.add("answers-btn");
        btn.dataset.correct = answer.correct;
        btn.addEventListener("click", selectAnswer);
        answersContainer.appendChild(btn);
    });
}

function selectAnswer(e) {
    if (answersDisabled) return;
    answersDisabled = true;

    const isCorrect = e.target.dataset.correct === "true";

    [...answersContainer.children].forEach(btn => {
        btn.classList.add(btn.dataset.correct === "true" ? "correct" : "incorrect");
        btn.disabled = true;
    });

    if (isCorrect) score++;

    setTimeout(() => {
        currentQuestionIndex++;
        currentQuestionIndex < quizQuestions.length
            ? showQuestion()
            : showResults();
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreEl.textContent = score;
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}
