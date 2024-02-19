
// Game constants
const TEXT_COLOR = "#84FF84"; // Light green
const BACKGROUND_COLOR = "#000000"; // Black
const FONT_SIZE = 20;
const LINE_SPACING = 10;
const FALLING_SPEED = 10 / 10; // Adjust for desired difficulty



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

// Game variables
let lines = [
    "#include <stdio.h>",
    "",
    "int main()",
    "{",
    "  int i = 1;",
    "",
    "  while (i <= 100)",
    "{",
    "  if (i % 3 == 0 && i % 5 == 0)",
    "{",
    "  printf(\"FizzBuzz\\n\");",
    " } else if (i % 3 == 0)",
    "    { ",
    "     printf(\"Fizz\\n\");",
    "    } else if (i % 5 == 0)",
    "    { ",
    "       printf(\"Buzz\\n\");",
    "    } else",
    "    {",
    "      printf(\"%d\\n\", i);",
    "    }",
    "    i++;",
    "  }",
    "",
    "  return 0;",
    "}"
];
let currentFallingLine = 0;
let currentLineToType = 0;
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
    lineYs[currentLineToType] += 300;
    score++;
    document.getElementById("score").textContent = `Score: ${score}`;
    currentLineToType++;

    document.getElementById("userInput").value = ""; // Clear input
    // Handle end of lines
    if (currentLineToType === lines.length) {
        // You can add a win message here or restart the game
        console.log("Congratulations! You typed all the lines correctly.");
    }
    for (let i = 0; i < currentFallingLine; i++) {
        lineYs[i] += 15;
    }
}

// Game loop
function animate() {
    requestAnimationFrame(animate);
    // Make lines fall one by one
    for (let i = 0; i < lineYs.length; i++) {
        if (i == currentFallingLine) {
            if (lineYs[i] < canvas.height - 15 * (i + 1 - currentLineToType)) {
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

    document.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            // Handle user input checking here 
            const userInput = document.getElementById("userInput").value;
            if (userInput.trim() === lines[currentLineToType].trim()) {
                typedCorrect();
            }
        }
    });
}

animate();