
function addReview(score, text) {
    const reviewSection = document.querySelector('.customer-review-section');
    const review = document.createElement('div');
    review.classList.add('customer-review');

    review.innerHTML = `
        <div class="score">${score}/10</div>
        <p>${text}</p>
    `;
    reviewSection.appendChild(review);
}

function submitReview() {
    const scoreInput = document.getElementById('score');
    const textInput = document.getElementById('text');

    const score = scoreInput.value;
    const text = textInput.value;

    addReview(score, text);

    // Reset the form fields after submitting
    scoreInput.value = '';
    textInput.value = '';
}