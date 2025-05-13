const quizzes = [
  [
    {
      question: "What does HTML stand for?",
      options: ["Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Markup Language", "Hyper Tool Multi Language"],
      answer: 2
    },
    {
      question: "Which language is used for styling web pages?",
      options: ["HTML", "CSS", "Python", "Java"],
      answer: 1
    },
    {
      question: "Which is not a JavaScript Framework?",
      options: ["Python Script", "JQuery", "Django", "NodeJS"],
      answer: 2
    },
    {
      question: "Which is used for Connect To Database?",
      options: ["PHP", "HTML", "JS", "All"],
      answer: 0
    },
    {
      question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
      options: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"],
      answer: 2
    }
  ],
  [
    {
      question: "What is CSS used for?",
      options: ["Structuring HTML", "Styling HTML pages", "Creating scripts", "None of these"],
      answer: 1
    },
    {
      question: "Which tag is used to create a hyperlink?",
      options: ["<a>", "<link>", "<href>", "<url>"],
      answer: 0
    },
    {
      question: "Inside which HTML element do we put the JavaScript?",
      options: ["<js>", "<javascript>", "<script>", "<code>"],
      answer: 2
    },
    {
      question: "How do you write 'Hello World' in an alert box?",
      options: ["alertBox('Hello World');", "msg('Hello World');", "msgBox('Hello World');", "alert('Hello World');"],
      answer: 3
    },
    {
      question: "How do you create a function in JavaScript?",
      options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "None"],
      answer: 0
    }
  ],
  [
    {
      question: "What is the extension of JavaScript files?",
      options: [".js", ".html", ".css", ".java"],
      answer: 0
    },
    {
      question: "Which of the following is not a keyword in JavaScript?",
      options: ["this", "catch", "function", "input"],
      answer: 3
    },
    {
      question: "How do you declare a JavaScript variable?",
      options: ["variable carName;", "v carName;", "var carName;", "None of these"],
      answer: 2
    },
    {
      question: "What is the correct way to write a JavaScript array?",
      options: [
        "var colors = (1: 'red', 2: 'green', 3: 'blue')",
        "var colors = ['red', 'green', 'blue']",
        "var colors = 'red', 'green', 'blue'",
        "var colors = {'red', 'green', 'blue'}"
      ],
      answer: 1
    },
    {
      question: "How do you round the number 7.25 to the nearest integer?",
      options: ["Math.round(7.25)", "round(7.25)", "Math.rnd(7.25)", "rnd(7.25)"],
      answer: 0
    }
  ],
  [
    {
      question: "What is the output of typeof null?",
      options: ["object", "null", "undefined", "function"],
      answer: 0
    },
    {
      question: "How do you comment a single line in JS?",
      options: ["<!-- comment -->", "// comment", "/* comment */", "** comment"],
      answer: 1
    },
    {
      question: "Which built-in method sorts the elements of an array?",
      options: ["changeOrder(order)", "order()", "sort()", "None of the above"],
      answer: 2
    },
    {
      question: "Which event occurs when the user clicks on an HTML element?",
      options: ["onmouseover", "onchange", "onclick", "onmouseclick"],
      answer: 2
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "--", "#", "%%"],
      answer: 0
    }
  ],
  [
    {
      question: "Which of the following is a server-side language?",
      options: ["HTML", "CSS", "JavaScript", "PHP"],
      answer: 3
    },
    {
      question: "What is the correct syntax for an if statement in JS?",
      options: ["if i == 5 then", "if i = 5", "if (i == 5)", "if i = 5 then"],
      answer: 2
    },
    {
      question: "Which method is used to write on the browser console?",
      options: ["console.write()", "log.console()", "console.log()", "log.write()"],
      answer: 2
    },
    {
      question: "How do you define an object in JS?",
      options: ["var obj = {}", "var obj = []", "var obj = ()", "var obj = <>"],
      answer: 0
    },
    {
      question: "What is the output of: '5' + 3 in JavaScript?",
      options: ["8", "53", "NaN", "Error"],
      answer: 1
    }
  ]
];

let selectedQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];

// === QUIZ LOGIC SCRIPT ===
let questions = [...quizzes[Math.floor(Math.random() * quizzes.length)]];
shuffleArray(questions);

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;
let selectedAnswers = new Array(questions.length).fill(null);
let randomizedOptions = [];

const startBtn = document.getElementById("start-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const startBox = document.getElementById("start-box");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionList = document.getElementById("option-list");
const timerDisplay = document.getElementById("timer-value");
const timerCircle = document.getElementById("timer-circle");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const submitBtn = document.getElementById("submit-btn");
const scoreDisplay = document.getElementById("score");
const summary = document.getElementById("summary");
const restartBtn = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");

startBtn.onclick = () => {
  startBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
};

nextBtn.onclick = () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
};

prevBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
};

submitBtn.onclick = showResults;
restartBtn.onclick = () => location.reload();

// display new question
function loadQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  startTimer();

  quizBox.classList.remove("fade");
  void quizBox.offsetWidth;
  quizBox.classList.add("fade");

  const q = questions[currentQuestion];
  randomizedOptions = q.options.map((opt, idx) => ({ opt, idx }));
  shuffleArray(randomizedOptions);

  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = q.question;
  optionList.innerHTML = "";

  randomizedOptions.forEach(({ opt, idx }) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.onclick = () => selectAnswer(li, idx);
    optionList.appendChild(li);
  });

  highlightSelection();

  nextBtn.disabled = currentQuestion >= questions.length - 1;
  prevBtn.disabled = currentQuestion <= 0;
  nextBtn.classList.toggle("hidden", currentQuestion === questions.length - 1);
  submitBtn.classList.toggle("hidden", currentQuestion !== questions.length - 1);
  updateProgressBar();
}

function selectAnswer(li, selectedIndex) {
  clearInterval(timer);
  selectedAnswers[currentQuestion] = selectedIndex;
  highlightSelection();
}

// highlight selection as red or green
function highlightSelection() {
  const options = optionList.querySelectorAll("li");
  const correctIndex = questions[currentQuestion].answer;
  options.forEach((el, idx) => {
    el.classList.remove("correct", "wrong");
    const mapped = randomizedOptions[idx].idx;
    if (selectedAnswers[currentQuestion] !== null) {
      if (mapped === correctIndex) el.classList.add("correct");
      else if (mapped === selectedAnswers[currentQuestion]) el.classList.add("wrong");
    }
  });
}

function startTimer() {
  updateTimerDisplay();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoAnswer();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerDisplay.textContent = timeLeft;
  timerCircle.style.strokeDashoffset = (113 * (1 - timeLeft / 10)).toFixed(2);
}
//  function to automatically answer the question that remain unanswered in 10 seconds
function autoAnswer() {
  if (selectedAnswers[currentQuestion] === null) selectedAnswers[currentQuestion] = -1;
  highlightSelection();
  if (currentQuestion < questions.length - 1) {
    setTimeout(() => {
      currentQuestion++;
      loadQuestion();
    }, 500);
  } else {
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
  }
}

function showResults() {
  clearInterval(timer);
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  score = selectedAnswers.reduce((acc, ans, i) => {
    return acc + (ans === questions[i].answer ? 1 : 0);
  }, 0);

  scoreDisplay.innerHTML = `You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>`;
  summary.innerHTML = "";

  questions.forEach((q, i) => {
    const li = document.createElement("li");
    const isCorrect = selectedAnswers[i] === q.answer;
    li.classList.add(isCorrect ? "correct" : "wrong");
    li.innerHTML = `<strong>Q${i + 1}:</strong> ${q.question}<br>
      <span>Correct: ${q.options[q.answer]}</span><br>
      <span>Your Answer: ${selectedAnswers[i] !== -1 && selectedAnswers[i] !== null ? q.options[selectedAnswers[i]] : 'Not Answered'}</span>`;
    summary.appendChild(li);
  });
}

// progress bar for questions at top 
function updateProgressBar() {
  const progress = ((currentQuestion) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// shuffles question in particular quiz
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}