// Game constants
const TEXT_COLOR = "#84FF84"; // Light green
const BACKGROUND_COLOR = "#000000"; // Black
const FONT_SIZE = 20;
const LINE_SPACING = 10;
const FALLING_SPEED = 3; // Adjust for desired difficulty

// Initialize canvas and drawing context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.font = FONT_SIZE + "px Arial";
ctx.fillStyle = BACKGROUND_COLOR;
ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear canvas

// Game variables
let lines = [
    "This is the first line to fall.",
    "Can you type it fast enough?",
    "Get ready for more challenges!",
    // Add more lines here...
];
let currentLineIndex = 0;
let currentLineY = -FONT_SIZE;
let score = 0;

// Game loop
function animate() {
    requestAnimationFrame(animate);

    // Update positions
    currentLineY += FALLING_SPEED;

    // Clear canvas
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw falling line
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(lines[currentLineIndex], 0, currentLineY);

    // Check for user input
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() === lines[currentLineIndex]) {
        score++;
        document.getElementById("score").textContent = `Score: ${score}`;
        currentLineIndex++;
        currentLineY = -FONT_SIZE;
        document.getElementById("userInput").value = ""; // Clear input

        // Handle end of lines
        if (currentLineIndex === lines.length) {
            // You can add a win message here or restart the game
            console.log("Congratulations! You typed all the lines correctly.");
        }
    }
}

animate();