// Adding 20 basic Python questions
let questions = [
    { question: "What is the output of print(2 * 3)?", options: ["5", "6", "8", "None of the above"], correctAnswer: "6", name: "question1" },
    { question: "Which data type is mutable in Python?", options: ["List", "Tuple", "String", "Integer"], correctAnswer: "List", name: "question2" },
    { question: "What does the len() function do in Python?", options: ["Returns the length of an object", "Returns the data type of an object", "Deletes an object", "None of the above"], correctAnswer: "Returns the length of an object", name: "question3" },
    { question: "What keyword is used to create a function in Python?", options: ["function", "define", "def", "lambda"], correctAnswer: "def", name: "question4" },
    { question: "Which of the following is a valid Python dictionary?", options: ["{1: 'apple', 2: 'banana'}", "['apple', 'banana']", "(1, 'apple')", "{1, 2, 3}"], correctAnswer: "{1: 'apple', 2: 'banana'}", name: "question5" },
    { question: "Which of the following is a valid way to import a module?", options: ["import math", "import(Math)", "include math", "using math"], correctAnswer: "import math", name: "question6" },
    { question: "How do you create a comment in Python?", options: ["// this is a comment", "# this is a comment", "<!-- this is a comment -->", "None of the above"], correctAnswer: "# this is a comment", name: "question7" },
    { question: "What is the correct way to create a class in Python?", options: ["class MyClass()", "MyClass = class()", "class MyClass:", "MyClass -> class:"], correctAnswer: "class MyClass:", name: "question8" },
    { question: "What method is used to add an element to a list?", options: [".add()", ".append()", ".push()", ".insert()"], correctAnswer: ".append()", name: "question9" },
    { question: "What keyword is used to handle exceptions in Python?", options: ["catch", "throw", "except", "try"], correctAnswer: "except", name: "question10" },
    { question: "What does the 'pass' keyword do in Python?", options: ["Does nothing", "Throws an error", "Skips the iteration", "Exits the function"], correctAnswer: "Does nothing", name: "question11" },
    { question: "Which of the following is used to declare a block of code in Python?", options: ["Braces", "Indentation", "Quotes", "Parentheses"], correctAnswer: "Indentation", name: "question12" },
    { question: "Which of the following is a built-in function to get the absolute value of a number?", options: ["abs()", "fabs()", "math.abs()", "math.fabs()"], correctAnswer: "abs()", name: "question13" },
    { question: "Which keyword is used to define a function in Python?", options: ["func", "def", "lambda", "function"], correctAnswer: "def", name: "question14" },
    { question: "How do you start a loop in Python?", options: ["while", "for", "loop", "iterate"], correctAnswer: "for", name: "question15" },
    { question: "Which of the following is not a valid Python operator?", options: ["**", "//", "?", "in"], correctAnswer: "?", name: "question16" },
    { question: "How do you convert a string to an integer in Python?", options: ["toInt()", "int()", "str()", "convert()"], correctAnswer: "int()", name: "question17" },
    { question: "Which keyword is used to check for the presence of a substring in a string?", options: ["if", "for", "in", "exists"], correctAnswer: "in", name: "question18" },
    { question: "What is the correct file extension for Python files?", options: [".pt", ".py", ".pyt", ".pyth"], correctAnswer: ".py", name: "question19" },
    { question: "Which method is used to remove whitespaces in a string?", options: ["trim()", "strip()", "remove()", "cut()"], correctAnswer: "strip()", name: "question20" }
];

let currentPage = 0;
const questionsPerPage = 2;
let timeLeft = 300; // 5 minutes in seconds
let userAnswers = {};

// Shuffle the questions array (randomizing the questions order)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

questions = shuffle(questions);

function showQuestions() {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    const quizForm = document.getElementById('quiz-form');
    quizForm.innerHTML = '';

    questions.slice(start, end).forEach(q => {
        const questionHTML = `
            <div class="form-group">
                <label>${q.question}</label>
                <div>
                    ${q.options.map(option => `
                        <input type="radio" id="${q.name}_${option}" name="${q.name}" value="${option}" ${userAnswers[q.name] === option ? 'checked' : ''} required>
                        <label for="${q.name}_${option}">${option}</label><br>
                    `).join('')}
                </div>
            </div>
        `;
        quizForm.innerHTML += questionHTML;
    });

    document.getElementById('prev-btn').style.display = currentPage === 0 ? 'none' : 'block';
    document.getElementById('next-btn').style.display = currentPage === Math.ceil(questions.length / questionsPerPage) - 1 ? 'none' : 'block';
    document.getElementById('submit-btn').style.display = currentPage === Math.ceil(questions.length / questionsPerPage) - 1 ? 'block' : 'none';
}

// Collect the user's answers
function collectAnswers() {
    const formData = new FormData(document.getElementById('quiz-form'));
    formData.forEach((value, key) => {
        userAnswers[key] = value;
    });
}

// Timer function
function startTimer() {
    const timerDisplay = document.getElementById('timer');
    const timerInterval = setInterval(() => {
        timeLeft--;

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.textContent = `Time Remaining: ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();  // Auto-submit when time runs out
        }
    }, 1000);
}

// Function to calculate and show the result in an alert box
function submitQuiz() {
    collectAnswers();  // Collect final answers
    let score = 0;
    let totalQuestions = questions.length;
    let wrongAnswers = [];

    // Calculate score and identify wrong answers
    questions.forEach(q => {
        const userAnswer = userAnswers[q.name];
        if (userAnswer === q.correctAnswer) {
            score += 1;
        } else {
            wrongAnswers.push(`Question: ${q.question}, Your Answer: ${userAnswer}, Correct Answer: ${q.correctAnswer}`);
        }
    });

    let resultMessage = `You scored ${score} out of ${totalQuestions}.\n\n`;
    if (wrongAnswers.length > 0) {
        resultMessage += `You got the following questions wrong:\n\n${wrongAnswers.join('\n')}`;
    } else {
        resultMessage += `Perfect score! You got all the questions right!`;
    }

    alert(resultMessage);  // Show result in an alert box
}

// Event listener for submit button
document.getElementById('submit-btn').addEventListener('click', function(e) {
    e.preventDefault();  // Prevent default form submission
    submitQuiz();  // Manually call the quiz submission
});

// Event listeners for next and previous buttons
document.getElementById('next-btn').addEventListener('click', () => {
    collectAnswers();
    currentPage++;
    showQuestions();
});

document.getElementById('prev-btn').addEventListener('click', () => {
    collectAnswers();
    currentPage--;
    showQuestions();
});

showQuestions();
startTimer();
