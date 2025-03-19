let isExamModeActive = true;

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "disableKeyboardBlocking") {
        isExamModeActive = false; // Disable keyboard blocking
    }
});

// Block all keyboard events except for the exit shortcut (Ctrl+Shift+E)
document.addEventListener("keydown", (event) => {
    if (isExamModeActive) {
        if (event.ctrlKey && event.shiftKey && event.key === "E") {
            // Allow the exit shortcut
        } else {
            event.preventDefault(); // Block all other keys
            event.stopPropagation(); // Stop the event from propagating
        }
    }
});

// Block right-click and developer tools
document.addEventListener("contextmenu", (event) => {
    if (isExamModeActive) {
        event.preventDefault();
    }
});

// Block F12, Ctrl+Shift+I, Ctrl+Shift+J, etc.
document.addEventListener("keydown", (event) => {
    if (isExamModeActive) {
        if (
            event.key === "F12" ||
            (event.ctrlKey && event.shiftKey && event.key === "I") ||
            (event.ctrlKey && event.shiftKey && event.key === "J") ||
            (event.ctrlKey && event.key === "U")
        ) {
            event.preventDefault();
        }
    }
});