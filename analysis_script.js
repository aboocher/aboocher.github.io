const questions = [
    {
        question: "You are given that $S$ is a set of real numbers and that $M$ is an upper bound for $S$.  Is it necessarily true that for all $s\\in S$, $$s \\leq 2M?$$",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true },
        ]
    },
    {
        question: "Suppose that $c> 1$ is a real number and $M$ is a lower bound for a set $S$ of real numbers.  Is $cM$ a lower bound for $S$?",
        answers: [
            { text: "Sometimes", correct: true },
            { text: "Always", correct: false },
            { text: "Never", correct: false },
        ]
    },
    {
        question: "Suppose that $S$ is an infinite set of positive real numbers.  Then $S$ has infinitely many lower bounds.",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false },
        ]
    },
    {
        question: "Suppose that $S$ is a finite set of negative real numbers.  Then when is $0$ the least upper bound for $S$?",
        answers: [
            { text: "Sometimes", correct: false },
            { text: "Always", correct: false },
            { text: "Never", correct: true },
        ]
    }
];


const testElement = document.getElementById("here");
// testElement.innerHTML = questions.length;
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score_number");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
    MathJax.typeset();
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    scoreElement.innerHTML = score + "/" + (currentQuestionIndex + 1);
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        };
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    };
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextQuestion();
    } else {
        startQuiz();
    }
});

function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = "Would you like to play again?";
    nextButton.innerHTML = "Yes, why thank you!";
    nextButton.style.display = "block";
}

startQuiz()
