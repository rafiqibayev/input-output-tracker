# input-output-tracker
Web app that lets you track your input (daily work) and output (finished product) for 2026

# INPUT / OUTPUT

**Turn the grind into a loading bar.**

Most habit trackers just track habits. This one tracks **shipping**.
Based on the GitHub contribution graph, but designed for creators who need to balance daily effort with actual results.


## The Logic

It's a simple visualization of your year (2026):

*   **⬜ Void (Gray):** You didn't do the work.
*   **⬛ Input (Black):** You did the daily grind (e.g., "Work 2 hours").
*   **🟥 Output (Red):** You shipped the result (e.g., "Published Video").

**The Rule:** Red overrides Black. The goal is to fill the grid with black squares (the loading bar) until you hit a red square (the release).

## Features

*   **Visual Feedback:** GitHub-style yearly calendar (Jan 1 - Dec 31).
*   **Privacy First:** 100% Local Storage. No database, no logins, no cloud. Your data stays in your browser.
*   **Dual Tracking:** Track the *effort* separately from the *result*.
*   **Minimalist Design:** No fluff. Just the data.

## Built With

*   React (Vite)
*   Tailwind CSS
*   Lucide React
*   date-fns

## Running Locally

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
