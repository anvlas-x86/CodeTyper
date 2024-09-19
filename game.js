
// Game constants
const TEXT_COLOR = "#84FF84"; // Light green
const BACKGROUND_COLOR = "#000000"; // Black
const FONT_SIZE = 20;
const LINE_SPACING = 10;
const FALLING_SPEED = 8 / 10; // Adjust for desired difficulty

// Set canvas to full screen
const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth - 15;
canvas.height = window.innerHeight - 80;

const MIN_X = 50; // Adjust according to your canvas size
const MAX_X = canvas.width - 250; // Consider text width
let randomX = MIN_X;

// Initialize drawing context
const ctx = canvas.getContext("2d");
ctx.font = FONT_SIZE + "px Arial";
ctx.fillStyle = BACKGROUND_COLOR;
ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear canvas

const correctSound = new Audio('./coin.wav');
const wrongSound = new Audio('./no.wav');
correctSound.volume = 0.1;
wrongSound.volume = 0.1;

let pressTimeout = 10;
isGameRunning = true;
isGameStarted = false;

//programm to type
let lines = [
	"int ft_strlen(char *str)",
	"{",
	"  int i;",
	"  i = 0;",
	"  while ( str[i] )",
	"  {",
	"    i++;",
	"  }",
	"  return (i);",
	"}"
];

// Game variables
let currentFallingLine = 0;
let lineNum = 0;
//let currentLineY = -FONT_SIZE;
let score = 0;
let lineYs = [];
for (let i = 0; i < lines.length; i++) {
	lineYs.push(-FONT_SIZE / 2); // Initialize all lines to be above the canvas
}
let randomXs = [];
for (let i = 0; i < lines.length; i++) {
	randomXs.push(Math.floor(Math.random() * (MAX_X - MIN_X + 1) + MIN_X));
}

function typedCorrect() {
	lineYs[lineNum] += 500;
	score++;
	document.getElementById("score").textContent = `Score: ${score}`;
	lineNum++;
	correctSound.play();

	document.getElementById("userInput").value = ""; // Clear input
	// Handle end of lines
	if (lineNum === lines.length) {
		// You can add a win message here or restart the game
		console.log("Congratulations! You typed all the lines correctly.");
		displayWinAnimation();
	}
	for (let i = 0; i < currentFallingLine; i++) {
		lineYs[i] += 15;
	}
}

// Game loop
function animate() {
	if (!isGameStarted) {
		displayStartingScreen();
		return;
	}

	if (!isGameRunning) return;
	requestAnimationFrame(animate);
	pressTimeout++;

	// Make lines fall one by one
	for (let i = 0; i < lineYs.length; i++) {
		if (i == currentFallingLine) {
			if (lineYs[i] < canvas.height - 15 * (i + 1 - lineNum)) {
				lineYs[i] += FALLING_SPEED;
			} else {
				currentFallingLine++;
				console.log(" currentFallingLine++");
			}
		}
	}

	// Clear canvas
	ctx.fillStyle = BACKGROUND_COLOR;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Draw falling line
	ctx.fillStyle = TEXT_COLOR;
	for (let i = 0; i < lines.length; i++) {
		// Draw the line at its calculated X and Y position
		ctx.fillText(lines[i], randomXs[i], lineYs[i]);
	}
}

function handleUserInput() {
	// Handle user input checking here 
	let userInput = document.getElementById("userInput").value.replace(/\s+/g, '');
	if (userInput == lines[lineNum].replace(/\s+/g, '')) {
		typedCorrect();

		pressTimeout = 0;
	} else {
		pressTimeout = 0;
		wrongSound.play();
		console.log(" input:", userInput);
		console.log(" line to type:", lines[lineNum]);
	}
}

function displayStartingScreen() {
	ctx.fillStyle = BACKGROUND_COLOR;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = TEXT_COLOR;
	ctx.font = "30px Arial";
	ctx.fillText("Press Enter to Start", canvas.width / 2 - 100, canvas.height / 2);
}

function displayWinAnimation() {
	let winText = "YOU WIN!";
	let fontSize = 10; // Starting font size
	const maxFontSize = 100; // Maximum font size
	const increment = 2; // Font size increment
	const x = canvas.width / 2;
	const y = canvas.height / 2;

	function animateWinText() {
		if (fontSize < maxFontSize) {
			requestAnimationFrame(animateWinText);
		} else {
			isGameRunning = false;
		}

		// Clear canvas
		ctx.fillStyle = BACKGROUND_COLOR;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Draw the win text
		ctx.fillStyle = TEXT_COLOR;
		ctx.font = `${fontSize}px Arial`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(winText, x, y);

		fontSize += increment;
	}
	animateWinText();
}


document.addEventListener("keypress", function (event) {
	if (isGameStarted) {
		if (event.key === "Enter" && (pressTimeout > 10))
			handleUserInput()
	} else {
		isGameStarted = true;
		animate();
	}
});

document.getElementById('submitButton').addEventListener("click", function (event) {
	if ((pressTimeout > 10) && (isGameStarted))
		handleUserInput()
	else { isGameStarted = true; animate(); }
});


animate();