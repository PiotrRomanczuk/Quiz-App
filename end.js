const username = document.getElementById('username');
const saveScoreButton = document.getElementById('saveScoreButton');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScore')) || [];
console.log(highScores);
finalScore.innerHTML = mostRecentScore;

username.addEventListener('keyup', () => {
	saveScoreButton.disabled = !username.value;
});

// console.log(mostRecentScore);

saveHighScore = (e) => {
	console.log('clicked');
	// e.preventDefault();

	const score = {
		score: mostRecentScore,
		name: username.value,
	};

	highScores.push(score);
	console.log(highScores);
};
