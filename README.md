# **Exam Mode - Browser Extension**  

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)  
> A browser extension that creates a **100% distraction-free exam environment** by **blocking all websites except the exam website**, enforcing **full-screen mode**, and restricting **keyboard and mouse usage** to simulate a real exam experience.  

🔗 **GitHub Repository:** [Exam Mode Extension](https://github.com/arvindthetech/exam-mode-extension)  

---

## **Features**

 **1. Whitelist Exam Website** – Users enter the exam website URL, and all other websites are automatically blocked.
 
 **2. Exam Timer** – Countdown starts from the selected exam duration (e.g., 3 hours) and **exits Exam Mode** when time is up.
 
 **3. Auto Full-Screen Mode** – Prevents users from minimizing or switching tabs/apps during the exam.
 
 **4. Keyboard & Mouse Restrictions** – The keyboard is **disabled** except for the exit shortcut. Only the mouse can be used for answering questions. *(Keyboard blocking not fully functional – see Known Issues.)*
 
 **5. Audio Alerts & Motivational Messages** – Plays an **audio notification** with a motivational message when Exam Mode starts and ends.
 
 **6. Exit Exam Mode Button** – The exit button appears **only when Exam Mode is active** and restores normal browser behavior.

-----

## **Installation Guide**

Since this extension is not available in the Chrome Web Store yet, you need to **manually install** it in Developer Mode:

### **Step 1: Download or Clone the Repository**

```sh
git clone [https://github.com/arvindthetech/exam-mode-extension.git](https://github.com/arvindthetech/exam-mode-extension.git)
Or, download the ZIP file from the GitHub repository and extract it.

```

### **Step 2: Load the Extension in Chrome**

```
1. Open Chrome and go to `chrome://extensions/`.
2. Enable Developer Mode (toggle switch in the top-right corner).
3. Click "Load Unpacked" and select the extension folder you downloaded.
4. The Exam Mode extension will now appear in the extensions list.
```

## **How to Use**

**Start Exam Mode**

\* Click on the Exam Mode extension icon.

\* Enter the exam website URL (e.g., `https://exam.com`).

\* Select the exam duration (e.g., 3 hours).

\* Click "Start Exam Mode".

\* Your browser will:

   * Go into full-screen mode
   * Block all websites except the exam website
   * Disable the keyboard & restrict mouse usage

**Exit Exam Mode**

\* Click the "Exit Exam Mode" button inside the extension.

\* Or, use the special keyboard shortcut (defined in the code) to exit.

\* A popup message will confirm that Exam Mode has ended.

***Note:*** If you close the extension popup, the countdown timer will continue running in the background.


## **Technical Details**

  * **Manifest Version:** 3

  * **Languages Used:**

      * HTML (User Interface)

      * CSS (Styling)

      * JavaScript (Functionality)

      * Chrome Extensions API (Blocking, Full-Screen, etc.)

  * **Permissions Used:**

      * `"declarativeNetRequest"` (For website blocking)

      * `"tabs"` (For tab management)

      * `"storage"` (For saving settings)

      * `"alarms"` (For the countdown timer)

## **Known Issues & Future Enhancements**

### **Known Issues**

  * Keyboard Blocking Not Fully Functional – Some keys may still be active during Exam Mode.

  * Exit Shortcut Not Working in Some Browsers – Full-screen mode may not properly exit in some versions of Chrome.

### **Future Enhancements**

  * Custom Exam Timer – Allow users to enter a custom duration instead of preset options.

  * Improved Keyboard Blocking – Fully restrict all unnecessary keys.

  * Dark Mode Support – Improve UI for better accessibility.

  * Firefox Support – Extend compatibility beyond Chrome.

## **Contributing**

Want to improve Exam Mode? Contributions are welcome\!

1.  Fork the repository.

2.  Create a new branch:

    ```
    git checkout -b feature-name

    ```

3.  Commit changes:

    ```
    git commit -m "Added new feature"

    ```

4.  Push to GitHub:

    ```
    git push origin feature-name

    ```

5.  Open a Pull Request explaining your changes.

## **License**

This project is licensed under the MIT License – you can freely use, modify, and distribute

