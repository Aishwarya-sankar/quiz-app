// Function to load 5 random questions and render the quiz
function loadRandomQuiz() {
    const questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];
    const quizContainer = document.getElementById('quiz-container');

    // Flatten all questions
    const allQuestions = questionBank.flatMap(quiz => quiz.questions);

    // Pick 5 random questions
    const selectedQuestions = [];
    while (selectedQuestions.length < 5 && allQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * allQuestions.length);
        selectedQuestions.push(allQuestions.splice(randomIndex, 1)[0]);
    }

    // Render the selected questions
    quizContainer.innerHTML = ''; // Clear the container
    selectedQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        // Display question text
        const questionText = document.createElement('p');
        questionText.textContent = `Q${index + 1}: ${question.questionText}`;
        questionDiv.appendChild(questionText);

        // Input fields based on question type
        if (question.questionType === 'multiple-choice') {
            Object.entries(question.answers).forEach(([key, value]) => {
                const label = document.createElement('label');
                label.innerHTML = `
                    <input type="radio" name="q${index}" value="${key}"> ${value}
                `;
                questionDiv.appendChild(label);
                questionDiv.appendChild(document.createElement('br'));
            });
        } else if (question.questionType === 'true-false') {
            ['True', 'False'].forEach(option => {
                const label = document.createElement('label');
                label.innerHTML = `
                    <input type="radio" name="q${index}" value="${option}"> ${option}
                `;
                questionDiv.appendChild(label);
                questionDiv.appendChild(document.createElement('br'));
            });
        } else if (question.questionType === 'short-answer') {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `q${index}`; // Ensure unique names
            input.maxLength = 100;
            input.placeholder = 'Type your answer here';
            questionDiv.appendChild(input);
        }

        // Store correct answer as a data attribute
        questionDiv.dataset.correctAnswer = question.correctAnswer;
        quizContainer.appendChild(questionDiv);
    });

    // Add the questions to a global variable for evaluation
    window.currentQuizQuestions = selectedQuestions;
}

// Function to evaluate the quiz and redirect to results page
function evaluateQuiz(event) {
    event.preventDefault();
    const form = document.getElementById('quiz-form');

    let score = 0;

    // Loop through the current questions
    window.currentQuizQuestions.forEach((question, index) => {
        const userAnswer = form[`q${index}`]?.value?.trim();
        const correctAnswer = question.correctAnswer;

        if (userAnswer) {
            if (question.questionType === 'short-answer') {
                if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                    score++;
                }
            } else {
                if (userAnswer === correctAnswer) {
                    score++;
                }
            }
        }
    });

    // Save score and feedback to sessionStorage
    const totalQuestions = window.currentQuizQuestions.length;
    let feedbackMessage = '';
    if (score === totalQuestions) {
        feedbackMessage = "Excellent! You got all answers correct!";
    } else if (score >= totalQuestions / 2) {
        feedbackMessage = "Good job! You passed the quiz!";
    } else {
        feedbackMessage = "Keep trying! Review the material and take the quiz again.";
    }

    sessionStorage.setItem('quizScore', score);
    sessionStorage.setItem('totalQuestions', totalQuestions);
    sessionStorage.setItem('feedbackMessage', feedbackMessage);

    // Redirect to the results page
    window.location.href = 'quiz-result.html';
}

// Event Listeners
window.onload = loadRandomQuiz;
document.getElementById('quiz-form').addEventListener('submit', evaluateQuiz);
