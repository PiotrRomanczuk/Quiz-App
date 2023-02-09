const questionHTML = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;
const progressText = document.getElementById('progress-text');
const progressBarFull = document.getElementById('progress-bar-full');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let list_of_questions = [
	{
		question: 'Inside which HTML element do we put the JavaScript??',
		choice1: '<script>',
		choice2: '<javascript>',
		choice3: '<js>',
		choice4: '<scripting>',
		answer: 1,
	},
	{
		question:
			"What is the correct syntax for referring to an external script called 'xxx.js'?",
		choice1: "<script href='xxx.js'>",
		choice2: "<script name='xxx.js'>",
		choice3: "<script src='xxx.js'>",
		choice4: "<script file='xxx.js'>",
		answer: 3,
	},
	{
		question: " How do you write 'Hello World' in an alert box?",
		choice1: "msgBox('Hello World');",
		choice2: "alertBox('Hello World');",
		choice3: "msg('Hello World');",
		choice4: "alert('Hello World');",
		answer: 4,
	},
];

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...list_of_questions];
	console.log(availableQuestions);
	getNewQuestion();
};

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
		// go to the end page if ther isn;t suppose to be any more Q's
		return window.location.assign('/end.html');
	}

	questionCounter++;
	progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

	let questionIndex = Math.floor(Math.random() * availableQuestions.length);
	selectedQuestion = availableQuestions[questionIndex];
	questionHTML.innerText = selectedQuestion.question;
	// Update thge progress bar
	let progressFullState = (questionCounter / MAX_QUESTIONS) * 100;
	console.log(progressFullState);
	progressBarFull.style.width = `${progressFullState}%`;

	choices.forEach((choice) => {
		const number = choice.dataset['number'];
		choice.innerText = selectedQuestion['choice' + number];
	});

	availableQuestions.splice(questionIndex, 1);

	acceptingAnswers = true;
	// console.log(selectedQuestion.answer);
};

choices.forEach((choice) => {
	choice.addEventListener('click', (e) => {
		if (!acceptingAnswers) return;

		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];

		let classToApply = 'incorrect';
		if (selectedAnswer == selectedQuestion.answer) {
			classToApply = 'correct';
		}
		if (classToApply == 'correct') {
			incrementScore(CORRECT_BONUS);
		}

		// ----- Different version of implementation "classToApply" then the one above -------------
		//																							|
		//  const classToApply =																	|
		// 	selectedAnswer == selectedQuestion.answer ? 'correct' : 'incorrect';					|
		//------------------------------------------------------------------------------------------

		console.log(classToApply);

		selectedChoice.parentElement.classList.add(classToApply);

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1000);
	});
});

incrementScore = (num) => {
	score += num;
	console.log(num);
	scoreText.innerText = score;
};

startGame();

// Checking the selected answer with answers from the questions array
