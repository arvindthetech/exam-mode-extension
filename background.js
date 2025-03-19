let examEndTime = 0;
let examUrl = "";

// Enter full-screen mode
function enterFullScreen() {
    chrome.windows.getCurrent((window) => {
        chrome.windows.update(window.id, { state: "fullscreen" });
    });
}

// Exit full-screen mode
function exitFullScreen() {
    chrome.windows.getCurrent((window) => {
        chrome.windows.update(window.id, { state: "normal" });
    });
}

// Activate Exam Mode: Block all websites except the exam website
function activateExamMode(url) {
    const examDomain = new URL(url).hostname;

    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
            {
                id: 1,
                priority: 1,
                action: { type: "block" },
                condition: {
                    urlFilter: "*",
                    resourceTypes: ["main_frame"]
                }
            },
            {
                id: 2,
                priority: 2,
                action: { type: "allow" },
                condition: {
                    urlFilter: `*://${examDomain}/*`,
                    resourceTypes: ["main_frame"]
                }
            }
        ],
        removeRuleIds: [1, 2]
    });

    console.log(`🚀 Exam Mode Activated: Only ${examDomain} is allowed.`);
}

// Deactivate Exam Mode: Unblock all websites
function deactivateExamMode() {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2]
    });

    console.log("⛔ Exam Mode Deactivated: All websites are unblocked.");
}

// Start Countdown Timer
function startCountdown(duration) {
    chrome.alarms.create("examCountdown", { delayInMinutes: duration / 60000 });
}

// Clear Countdown Timer
function clearCountdown() {
    chrome.alarms.clear("examCountdown");
}

// Handle Countdown End
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "examCountdown") {
        deactivateExamMode();
        chrome.storage.local.set({ examActive: false, examEndTime: 0 });
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon48.png",
            title: "Exam Mode",
            message: "Time's up! Exam Mode Ended."
        });
        exitFullScreen();
        disableKeyboardBlocking();
    }
});

// Disable Keyboard Blocking
function disableKeyboardBlocking() {
    chrome.tabs.query({ url: examUrl }, (tabs) => {
        if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "disableKeyboardBlocking" });
            chrome.tabs.reload(tabs[0].id); // Reload the exam website
        }
    });
}

// Fetch a random motivational quote
async function fetchMotivationalQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        return data.content; // Return the quote text
    } catch (error) {
        console.error("Failed to fetch quote:", error);
        return "Stay focused and keep going!";
    }
}

// Show a motivational quote every 10 minutes
function startMotivationalQuotes() {
    chrome.alarms.create("motivationalQuote", { periodInMinutes: 10 });
}

// Stop motivational quotes
function stopMotivationalQuotes() {
    chrome.alarms.clear("motivationalQuote");
}

// Handle motivational quote alarm
chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === "motivationalQuote") {
        const quote = await fetchMotivationalQuote();
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon48.png",
            title: "Motivational Quote",
            message: quote
        });
    }
});

// Handle shortcut to exit exam mode
chrome.commands.onCommand.addListener((command) => {
    if (command === "exit-exam-mode") {
        deactivateExamMode();
        chrome.storage.local.set({ examActive: false, examEndTime: 0 });
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon48.png",
            title: "Exam Mode",
            message: "Exam Mode Ended."
        });
        exitFullScreen();
        disableKeyboardBlocking();
    }
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startExam") {
        examUrl = message.examUrl;
        const examDuration = message.examDuration * 60 * 1000; // Convert to milliseconds
        examEndTime = Date.now() + examDuration;

        activateExamMode(examUrl);
        startCountdown(examDuration);

        chrome.storage.local.set({ examActive: true, examEndTime, examWebsite: examUrl });
        enterFullScreen();
        startMotivationalQuotes();
    } else if (message.action === "exitExam") {
        deactivateExamMode();
        clearCountdown();
        chrome.storage.local.set({ examActive: false, examEndTime: 0 });
        exitFullScreen();
        disableKeyboardBlocking();
        stopMotivationalQuotes();
    }
});