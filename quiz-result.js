// Retrieve score and feedback from sessionStorage
const score = parseInt(sessionStorage.getItem('quizScore'), 10) || 0;
const totalQuestions = parseInt(sessionStorage.getItem('totalQuestions'), 10) || 0;
const feedbackMessage = sessionStorage.getItem('feedbackMessage') || '';

// Display the results
document.getElementById('score').textContent = `Your Score: ${score} out of ${totalQuestions}`;
document.getElementById('feedback').textContent = feedbackMessage;

// Function to show emoji based on score
function showEmoji(score, totalQuestions) {
    const emojiContainer = document.getElementById('emoji');
    let emoji = '';

    if (score === totalQuestions) {
        emoji = '🎉'; // Excellent performance
    } else if (score >= totalQuestions / 2) {
        emoji = '👍'; // Good performance
    } else {
        emoji = '😟'; // Poor performance
    }

    emojiContainer.textContent = emoji;
    emojiContainer.classList.add('emoji-animation');
}

// Call the showEmoji function
showEmoji(score, totalQuestions);

// Clear sessionStorage to reset quiz data
sessionStorage.clear();

// Redirect to dashboard when Exit button is clicked
document.getElementById('exitButton').addEventListener('click', function() {
    window.location.href = 'dashboard.html'; // Redirect to dashboard
});
