# Select Quote Automation

This project uses **Cucumber**, **Playwright**, and **TypeScript** for automated end-to-end testing.
It supports **desktop and mobile execution**, records test runs, and generates CSV logs for results.

---

## 📦 Prerequisites

* [Node.js](https://nodejs.org/) (>= 20.x recommended)
* [npm](https://www.npmjs.com/)

---

## ⚙️ Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/aminyeeet-outliant/selectquote-leadsubmission.git
   cd selectquote-leadsubmission
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

---

## ▶️ Running Tests

### Run All Tests (desktop and mobile)

```bash
npm test
```
### Run in **Desktop Mode**

```bash
npm test:desktop
```

### Run in **Mobile Mode**

```bash
npm test:mobile
```


### Run by Tags

```bash
npx cucumber-js --tags "@mobile"
npx cucumber-js --tags "@desktop"
```

---

## 📝 Reports

- Test execution results are saved in **CSV format**.
- After a run, an HTML report is generated in:

  ```bash
  reports/cucumber-report.html
  ```
   Open this file in a browser to view scenario results, screenshots, and videos.
---

## 📹 Test Recording

Each scenario execution is recorded using **Playwright’s video recording**.
The recording is attached to test reports for debugging.

---

## 🛠️ Project Structure

```
├── features/          # Feature files (Gherkin)
├── steps/             # Step definitions
├── support/           # World, hooks, utilities
├── reports/           # Test results, recordings, CSV logs
└── package.json
```

---

## ⚡ Notes

* Device mode (desktop/mobile) is handled via **tags**.
