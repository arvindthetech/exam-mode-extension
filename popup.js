document.addEventListener("DOMContentLoaded", function () {
    const startExamBtn = document.getElementById("startExam");
    const exitExamBtn = document.getElementById("exitExam");
    const countdownDisplay = document.getElementById("countdown");
    const timeLeftSpan = document.getElementById("timeLeft");
    const examUrlInput = document.getElementById("examUrl");

    // Load stored exam state
    chrome.storage.local.get(["examActive", "examEndTime", "examWebsite"], function (data) {
        if (data.examActive) {
            exitExamBtn.classList.remove("hidden"); // Show Exit button
            countdownDisplay.classList.remove("hidden"); // Show countdown
            examUrlInput.value = data.examWebsite || ""; // Restore exam website

            const remainingTime = Math.max(0, Math.floor((data.examEndTime - Date.now()) / 1000));
            updateCountdown(remainingTime);
        }
    });

    // Start Exam Mode
    startExamBtn.addEventListener("click", function () {
        const examWebsite = examUrlInput.value.trim();
        const examDuration = parseInt(document.getElementById("examDuration").value);

        if (examWebsite === "") {
            alert("Please enter an exam website before starting Exam Mode.");
            return;
        }

        chrome.runtime.sendMessage({
            action: "startExam",
            examUrl: examWebsite,
            examDuration: examDuration
        });

        exitExamBtn.classList.remove("hidden"); // Show Exit button
        countdownDisplay.classList.remove("hidden"); // Show countdown
    });

    // Exit Exam Mode
    exitExamBtn.addEventListener("click", function () {
        chrome.runtime.sendMessage({ action: "exitExam" });

        exitExamBtn.classList.add("hidden"); // Hide Exit button
        countdownDisplay.classList.add("hidden"); // Hide countdown
    });

    // Update Countdown Timer
    function updateCountdown(seconds) {
        function tick() {
            if (seconds > 0) {
                const minutes = Math.floor(seconds / 60);
                const secs = seconds % 60;
                timeLeftSpan.textContent = `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
                seconds--;
                setTimeout(tick, 1000);
            } else {
                timeLeftSpan.textContent = "0:00";
            }
        }
        tick();
    }

    // Listen for countdown updates
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.examEndTime) {
            const remainingTime = Math.max(0, Math.floor((changes.examEndTime.newValue - Date.now()) / 1000));
            updateCountdown(remainingTime);
        }
    });
});