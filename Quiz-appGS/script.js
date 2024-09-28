const questions = [
    {
        question: "Who developed the Python language?",
        answers: [
            { text: "Zim Den", correct: false },
            { text: "Guido van Rossum", correct: true },
            { text: "Niene Stom", correct: false },
            { text: "Wick van Rossum", correct: false },
        ]
    },
    {
        question: "In which language is Python written?",
        answers: [
            { text: "Java", correct: false },
            { text: "PHP", correct: false },
            { text: "C", correct: true },
            { text: "All of the Above", correct: false },
        ]
    },
    {
        question: "What do we use to define a block of code in Python?",
        answers: [
            { text: "key", correct: false },
            { text: "Brackets", correct: false },
            { text: "Indentation", correct: true },
            { text: "None of these", correct: false },
        ]
    },
    {
        question: "Which character is used in Python to make a single-line comment?",
        answers: [
            { text: "/", correct: false },
            { text: "//", correct: false },
            { text: "#", correct: true },
            { text: "!", correct: false },
        ]
    },
    {
        question: "Which of the following declarations is incorrect?",
        answers: [
            { text: "_x = 2", correct: false },
            { text: "__x = 3", correct: false },
            { text: "__xyz__ = 5", correct: false },
            { text: "None of these", correct: true },
        ]
    },
    {
        question: "Study the following function: round(4.576). What will be the output of this function?",
        answers: [
            { text: "4.5", correct: false },
            { text: "5", correct: true },
            { text: "4", correct: false },
            { text: "None of these", correct: false },
        ]
    },
    {
        question: "What is the output of the following expression: 3 * 'abc'?",
        answers: [
            { text: "abcabcabc", correct: true },
            { text: "SyntaxError", correct: false },
            { text: "TypeError", correct: false },
            { text: "abcabc", correct: false },
        ]
    },
    {
        question: "Which of the following is not a valid keyword in Python?",
        answers: [
            { text: "try", correct: false },
            { text: "except", correct: false },
            { text: "finally", correct: false },
            { text: "execute", correct: true },
        ]
    },
    {
        question: "What will be the output of the following code: print(2**3**2)?",
        answers: [
            { text: "64", correct: false },
            { text: "512", correct: true },
            { text: "729", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "Which of the following is not a mutable data type in Python?",
        answers: [
            { text: "List", correct: false },
            { text: "Dictionary", correct: false },
            { text: "Tuple", correct: true },
            { text: "Set", correct: false },
        ]
    },
    {
        question: "What is the output of the following code: len([1, 2, [3, 4], 5])?",
        answers: [
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "3", correct: false },
            { text: "Error", correct: false },
        ]
    },
    {
        question: "What is the correct syntax to open a file named 'test.txt' for reading?",
        answers: [
            { text: "open('test.txt', 'r')", correct: true },
            { text: "open('test.txt')", correct: false },
            { text: "open('test.txt', 'read')", correct: false },
            { text: "open.read('test.txt')", correct: false },
        ]
    },
    {
        question: "Which function is used to find the largest item in an iterable in Python?",
        answers: [
            { text: "max()", correct: true },
            { text: "min()", correct: false },
            { text: "largest()", correct: false },
            { text: "greater()", correct: false },
        ]
    },
    {
        question: "What is the result of this code: list('hello')?",
        answers: [
            { text: "['h', 'e', 'l', 'l', 'o']", correct: true },
            { text: "['hello']", correct: false },
            { text: "['h', 'ello']", correct: false },
            { text: "Error", correct: false },
        ]
    },
    {
        question: "Which of the following methods is used to convert a string to lowercase?",
        answers: [
            { text: "lower()", correct: true },
            { text: "lowercase()", correct: false },
            { text: "downcase()", correct: false },
            { text: "tolower()", correct: false },
        ]
    },
    {
        question: "How do you insert an item into a list at a specific index in Python?",
        answers: [
            { text: "list.insert(index, item)", correct: true },
            { text: "list.add(item)", correct: false },
            { text: "list.push(item)", correct: false },
            { text: "list.append(index, item)", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    updateProgressBar();
    showQuestion();
}

function showQuestion() {
    resetState();
    startTimer();
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
}

function resetState() {
    clearInterval(timerInterval);
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function startTimer() {
    timeLeft = 15;
    timerElement.innerHTML = `Time left: ${timeLeft}s`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            Array.from(answerButtons.children).forEach(button => {
                button.disabled = true;
            });
            nextButton.style.display = "block";
        }
    }, 1000);
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    clearInterval(timerInterval);
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        updateProgressBar();
        showQuestion();
    } else {
        showScore();
    }
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
