// Global question count
let questionCount = 0;




// Function to handle adding a new question dynamically
document.getElementById('add-question').addEventListener('click', () => {
    questionCount++;
    const questionsContainer = document.getElementById('questions-container');




    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
        <label for="question-text-${questionCount}">Question ${questionCount}:</label>
        <input type="text" id="question-text-${questionCount}" required>
        <select id="question-type-${questionCount}" onchange="updateQuestionInputs(${questionCount})">
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="short-answer">Short Answer</option>
        </select>
        <div class="answers" id="answers-${questionCount}"></div>
    `;
    questionsContainer.appendChild(questionDiv);
});




// Function to update question inputs based on type
function updateQuestionInputs(questionNumber) {
    const questionType = document.getElementById(`question-type-${questionNumber}`).value;
    const answersDiv = document.getElementById(`answers-${questionNumber}`);




    if (questionType === "multiple-choice") {
        answersDiv.innerHTML = `
            <label>Answer A:</label>
            <input type="text" id="answer-a-${questionNumber}" required>
            <label>Answer B:</label>
            <input type="text" id="answer-b-${questionNumber}" required>
            <label>Answer C:</label>
            <input type="text" id="answer-c-${questionNumber}" required>
            <label>Answer D:</label>
            <input type="text" id="answer-d-${questionNumber}" required>
            <label for="correct-mcq-${questionNumber}">Correct Answer:</label>
            <select id="correct-mcq-${questionNumber}" required>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
            </select>
        `;
    } else if (questionType === "true-false") {
        answersDiv.innerHTML = `
            <label>
                <input type="radio" name="true-false-${questionNumber}" value="True" required> True
            </label>
            <label>
                <input type="radio" name="true-false-${questionNumber}" value="False" required> False
            </label>
        `;
    } else if (questionType === "short-answer") {
        answersDiv.innerHTML = `
            <label for="short-answer-${questionNumber}">Answer:</label>
            <input type="text" id="short-answer-${questionNumber}" maxlength="100" required>
        `;
    }
}




// Function to handle adding questions to the Question Bank
document.getElementById('quiz-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission




    const quizTitle = document.getElementById('quiz-title').value;
    const questions = [];




    for (let i = 1; i <= questionCount; i++) {
        const questionText = document.getElementById(`question-text-${i}`).value;
        const questionType = document.getElementById(`question-type-${i}`).value;
        let answers = {};
        let correctAnswer = "";




        if (questionType === "multiple-choice") {
            answers = {
                a: document.getElementById(`answer-a-${i}`).value,
                b: document.getElementById(`answer-b-${i}`).value,
                c: document.getElementById(`answer-c-${i}`).value,
                d: document.getElementById(`answer-d-${i}`).value
            };
            correctAnswer = document.getElementById(`correct-mcq-${i}`).value;
        } else if (questionType === "true-false") {
            answers = { True: "True", False: "False" };
            correctAnswer = document.querySelector(`input[name="true-false-${i}"]:checked`).value;
        } else if (questionType === "short-answer") {
            correctAnswer = document.getElementById(`short-answer-${i}`).value;
        }




        questions.push({ questionText, questionType, answers, correctAnswer });
    }




    // Save to localStorage
    const questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];
    questionBank.push({ quizTitle, questions });
    localStorage.setItem('questionBank', JSON.stringify(questionBank));




    alert('Quiz added to Question Bank!');
    window.location.href = 'question-bank.html'; // Redirect to Question Bank page
});






