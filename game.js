// Select canvas & context
const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

// Define canvas size & cell size
const CELL_SIZE = 40;
canvas.width = 600;
canvas.height = 600;

// Define colors
const WALL_COLOR = "#000000";
const PATH_COLOR = "#FFFFFF";
const PLAYER_COLOR = "#ff4f7b";
const END_COLOR = "#ffcad4";

// Maze Layout (1 = Wall, 0 = Path, S = Start, E = End)
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 'S', 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 'E', 1],
    [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Set player start position
let playerX = 1, playerY = 1;

// Draw the maze
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            const x = col * CELL_SIZE;
            const y = row * CELL_SIZE;

            if (maze[row][col] === 1) {
                ctx.fillStyle = WALL_COLOR;
            } else if (maze[row][col] === 'E') {
                ctx.fillStyle = END_COLOR;
            } else {
                ctx.fillStyle = PATH_COLOR;
            }

            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }
    }

    // Draw the player
    ctx.fillStyle = PLAYER_COLOR;
    ctx.fillRect(playerX * CELL_SIZE, playerY * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

// Handle player movement
document.addEventListener("keydown", (event) => {
    // Prevent scrolling with arrow keys
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
    }

    let newX = playerX;
    let newY = playerY;

    if (event.key === "ArrowLeft") newX--;
    if (event.key === "ArrowRight") newX++;
    if (event.key === "ArrowUp") newY--;
    if (event.key === "ArrowDown") newY++;

    if (maze[newY][newX] === 0 || maze[newY][newX] === 'E') {
        playerX = newX;
        playerY = newY;
        drawMaze();
    }

    // When player reaches the end
    if (maze[playerY][playerX] === 'E') {
        document.getElementById("mazeCanvas").style.display = "none";  // Hide maze
        document.getElementById("endScreen").style.display = "flex";   // Show end screen
    }
});

// Select elements
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const responseMessage = document.getElementById("responseMessage");
const noImage = document.getElementById("noImage");
const yesImage = document.getElementById("yesImage"); // Image for "Yes" press

// Set initial button sizes
let yesSize = 20;
let noSize = 20;

// List of messages when pressing "No"
const noMessages = [
    "Are you sure? 😢",
    "Think again... 😭",
    "Come on, say yes! 🥺",
    "I will be sad forever... 💔",
    "Last chance! 😭",
    "Don't break my heart! 💘"
];

// List of images that change when pressing "No"
const noImages = [
    "images/sad1.jpg",
    "images/sad2.jpg",
    "images/sad3.jpg",
    "images/sad4.jpg",
    "images/sad5.jpg",
    "images/final.jpg"
];

let noPressCount = 0; // Track "No" presses

// ✅ When the "Yes" button is clicked
yesButton.addEventListener("click", () => {
    responseMessage.innerText = "She said Yes! ❤️"; // Happy message
    noImage.style.display = "none"; // Hide the "No" images
    yesImage.src = "images/yes.JPEG"; // Show a happy image
    yesImage.style.display = "block"; // Make it visible
    noButton.style.display = "none"; // Hide "No" button
});

// ✅ When the "No" button is clicked
noButton.addEventListener("click", () => {
    if (noPressCount < noMessages.length) {
        responseMessage.innerText = noMessages[noPressCount]; // Update message
        noImage.src = noImages[noPressCount]; // Change image
        noImage.style.display = "block"; // Show image
    } else {
        responseMessage.innerText = "Fine... I'll stop asking. 😔";
        noImage.style.display = "none"; // Hide images
    }

    // Shrink "No" button and enlarge "Yes" button
    noSize -= 2;
    yesSize += 5;

    noButton.style.fontSize = `${noSize}px`;
    yesButton.style.fontSize = `${yesSize}px`;

    // If "No" button gets too small
    if (noSize <= 5) {
        noButton.innerText = "😢"; // Change text to emoji
        noButton.disabled = true;  // Disable it
    }

    noPressCount++;
});




// Start game
drawMaze();
