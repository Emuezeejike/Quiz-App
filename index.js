const quizData = [
    {
        question: "Which country won the 2002 world cup?",
        options: [
            "Germany",
            "France",
            "Brazil",
            "Spain",
        ],
        correct: 2
    },
    {
        question: "Which football club has the most champions league?",
        options: [
            "Arsenal Fc",
            "Aston Villa",
            "PSG",
            "Totthenham",
        ],
        correct: 1
    },
    {
        question: "Which of these players played in Arsenal Fc?",
        options: [
            "Gerrard",
            "Bentner",
            "Rodri",
            "Shelvey",
        ],
        correct: 1
    },
    {
        question: "Who has the most Ballon d'or award?",
        options: [
            "Platini",
            "C. Ronaldo",
            "Ronaldinho",
            "Messi",
        ],
        correct: 3
    },
    {
        question: "Which of these players played for both Arsenal and Chelsea?",
        options: [
            "Ashly cole",
            "Andy Carrol",
            "Fenando Torres",
            "Van Pirsie",
        ],
        correct: 0
    },
    {
        question: "who won the youngest player award in 2022?",
        options: [
            "Yamin Yamal",
            "Foden",
            "Enzo Fernandez",
            "Saka",
        ],
        correct: 2
    },
    {
        question: "Which of these clubs did Morinho failed to win a trophy at?",
        options: [
            "Roma",
            "Chelsea",
            "Manchester United",
            "Totthenham",
        ],
        correct: 3
    },
    {
        question: "Pep Guadiola has won how many league titles for Manchester City?",
        options: [
            "6",
            "7",
            "5",
            "8",
        ],
        correct: 1
    },
    {
        question: "Mo Salah scored how many league goals in his first season for liverpool fc?",
        options: [
            "34",
            "36",
            "32",
            "35",
        ],
        correct: 2
    },
    {
        question: "What is the name of Liverpool's Stadium called?",
        options: [
            "Anfield",
            "Old Road",
            "Stamford Bridge",
            "Old Trafford",
        ],
        correct: 0
    }
]

let questions = [...quizData].sort(() => Math.random() - 0.5);
let currentQuestion = 0;
let score = 0;




const questionElement = document.getElementById("question");
const optionElement = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timer = document.getElementById("timer");
const resultElement = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = `Q${currentQuestion + 1}. ${q.question}`;
    optionElement.innerHTML = "";

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.textContent = option;
        btn.addEventListener("click", () => selectAnswer(index));
        optionElement.appendChild(btn);
    });

    nextBtn.style.display = "none";
}

function selectAnswer(index) {
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll(".option-btn");


    buttons.forEach(btn => btn.disabled = true);


    if (index === q.correct) {
        score++;
        buttons[index].classList.add("correct");
    } else {
        buttons[index].classList.add("incorrect");
        buttons[q.correct].classList.add("correct");
    }
    nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
    
})



function showResult() {
    nextBtn.style.display = "none";
    questionElement.style.display = "none";
    optionElement.style.display = "none";
    timer.style.display = "none";
    restartBtn.style.display = "inline-block"; // Show the restart button

    const highScore = Number(localStorage.getItem("triviaHighScore")) || 0;

    const isNew = score > highScore;

    if (isNew) {
        localStorage.setItem("triviaHighScore", score);
    }

    resultElement.innerHTML = `
        <h2>Quiz Completed!!!</h2>
        <p>You have scored ${score} out of ${questions.length} questions</p>
        <p>Highest Score: ${Math.max(score, highScore)}</p>
        ${isNew ? "<p>Hurray, New High Score!!!</p>" : ""}
    `;

    restartBtn.addEventListener("click", restartQuiz);
}

function restartQuiz() {
    currentQuestion = 0; // Reset question index
    score = 0; // Reset score
    questions = [...quizData].sort(() => Math.random() - 0.5); // Shuffle questions again

    resultElement.innerHTML = ""; // Clear result display
    restartBtn.style.display = "none"; // Hide restart button
    questionElement.style.display = "flex"; // Show question element
    optionElement.style.display = "flex"; // Show options
    optionElement.style.flexDirection = "column";
    nextBtn.style.display = "none"; // Hide next button
    timer.style.display = "block"; // Show timer if applicable

    loadQuestion(); // Load the first question
}

// Attach event listener to the restart button


loadQuestion();