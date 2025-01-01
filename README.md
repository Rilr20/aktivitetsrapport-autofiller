# Aktivitetsrapport Autofill with Cypress

This project is a Cypress-based program designed to autofill Arbetsförmedlingen's aktivitetsrapport. It uses data from a CSV file (`aktiviteter.csv`) to automatically populate the required fields. Below is a guide on how to use this program effectively.

## Getting Started

### Prerequisites
- Install [Node.js](https://nodejs.org/) (tested with version 20.12).
- Install Cypress:
  ```bash
  npm install cypress --save-dev
  ```
- Ensure `aktiviteter.csv` exists in the root directory. This file should follow the format shown in the examples below.

### Example File Format
An example CSV file (`examples.csv`) is provided to illustrate the structure:
```csv
jobb,arbetsgivare,ort,datum
Substitute Herbology Teacher, Hogwarts, abr, 7
Spell Researcher, Hogwarts Library, rem, 10
Broomstick Mechanic, Nimbus Workshop, Hogsmeade, 19
```
- `jobb`: Job title or role applied for.
- `arbetsgivare`: Employer or organization.
- `ort`: Location type:
  - `abr`: Abroad
  - `rem`: Remote
  - (Specific city names can also be used, e.g., `Hogsmeade`.)
- `datum`: Date of application or activity.

### Installation
Clone this repository and navigate to the project folder:
```bash
git clone <repository-url>
cd aktivitetsrapport-autofill
```

Install dependencies:
```bash
npm install
```

## How to Use

1. **Prepare Your CSV File:**
   - Update the `aktiviteter.csv` file with the activities you want to report, following the format in the example file.

2. **Run Cypress:**
   ```bash
   npx cypress open
   ```
   - This will open the Cypress Test Runner.
   - Select the test file for autofilling the aktivitetsrapport.

3. **Log in Using Mobile Bank ID:**
   - When prompted, you have **35 seconds** to enter your Mobile Bank ID credentials before the program times out.

4. **Let the Program Run:**
   - The program will automatically read from `aktiviteter.csv` and fill in the aktivitetsrapport.

## Notes
- Ensure you have a stable internet connection for Mobile Bank ID and the Arbetsförmedlingen website.
- Double-check the `aktiviteter.csv` file for typos or formatting errors to avoid submission issues.
- Avoid using extra commas in fields such as `jobb`, `arbetsgivare`, etc., as the file is comma-separated and additional commas can cause parsing errors.

## Troubleshooting
- **Timeout Errors:** If the Mobile Bank ID login times out, simply rerun the test and ensure you complete the login within 35 seconds.
- **Cypress Errors:**
  - Ensure all dependencies are installed.
  - Check the console output for specific error messages.

## License
This project is open-source and available under the MIT License.