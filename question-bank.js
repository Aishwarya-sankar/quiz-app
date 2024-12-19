// Function to display questions from the question bank
function displayQuestions() {
    const questionBankContainer = document.getElementById('question-bank-container');
    const questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];

    questionBankContainer.innerHTML = ''; // Clear previous content

    questionBank.forEach((quiz, quizIndex) => {
        // Only display the quiz title if there are questions remaining
        if (quiz.questions.length > 0) {
            const quizTitle = document.createElement('h2');
            quizTitle.textContent = `Quiz ${quizIndex + 1}: ${quiz.quizTitle}`;
            questionBankContainer.appendChild(quizTitle);

            quiz.questions.forEach((question, questionIndex) => {
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('question');

                // Display question text
                const questionText = document.createElement('p');
                questionText.textContent = `Q${questionIndex + 1}: ${question.questionText}`;
                questionDiv.appendChild(questionText);

                // Display question type
                const questionType = document.createElement('p');
                questionType.textContent = `Type: ${question.questionType}`;
                questionDiv.appendChild(questionType);

                // Display options based on question type
                if (question.questionType === 'multiple-choice') {
                    const options = question.answers;
                    for (const [key, value] of Object.entries(options)) {
                        const optionText = document.createElement('p');
                        optionText.textContent = `${key.toUpperCase()}: ${value}`;
                        questionDiv.appendChild(optionText);
                    }
                }

                // Display correct answer
                const correctAnswer = document.createElement('p');
                correctAnswer.textContent = `Correct Answer: ${question.correctAnswer}`;
                questionDiv.appendChild(correctAnswer);

                // Edit and Delete buttons
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.onclick = () => editQuestion(quizIndex, questionIndex);
                questionDiv.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => deleteQuestion(quizIndex, questionIndex);
                questionDiv.appendChild(deleteButton);

                questionBankContainer.appendChild(questionDiv);
            });
        }
    });
}

// Function to edit a question
function editQuestion(quizIndex, questionIndex) {
    const questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];
    const question = questionBank[quizIndex].questions[questionIndex];

    const newQuestionText = prompt("Edit Question:", question.questionText);
    const newCorrectAnswer = prompt("Edit Correct Answer:", question.correctAnswer);

    if (newQuestionText !== null) question.questionText = newQuestionText;
    if (newCorrectAnswer !== null) question.correctAnswer = newCorrectAnswer;

    // Update options if it's a multiple-choice question
    if (question.questionType === 'multiple-choice') {
        const newAnswers = {};
        for (const key of Object.keys(question.answers)) {
            const newOption = prompt(`Edit Option ${key.toUpperCase()}:`, question.answers[key]);
            if (newOption !== null) {
                newAnswers[key] = newOption;
            }
        }
        question.answers = newAnswers;
    }

    localStorage.setItem('questionBank', JSON.stringify(questionBank)); // Save updated question bank
    displayQuestions(); // Refresh the display
}

// Function to delete a question
function deleteQuestion(quizIndex, questionIndex) {
    const questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];
   
    // Remove the question from the quiz
    questionBank[quizIndex].questions.splice(questionIndex, 1);

    // Check if there are any questions left in the quiz
    if (questionBank[quizIndex].questions.length === 0) {
        // If no questions left, remove the quiz from the question bank
        questionBank.splice(quizIndex, 1);
    }

    // Save the updated question bank back to local storage
    localStorage.setItem('questionBank', JSON.stringify(questionBank));
    displayQuestions(); // Refresh the display
}

// Function to exit to the dashboard
function exitToDashboard() {
    window.location.href = 'dashboard.html'; // Redirect to the dashboard
}

// Call the function to display questions when the page loads
window.onload = displayQuestions;
