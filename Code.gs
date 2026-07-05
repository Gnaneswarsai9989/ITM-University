/**
 * ITM UNIVERSITY — APPLY NOW FORM
 * Google Apps Script that receives form submissions from the website
 * and stores them as new rows in a Google Sheet.
 *
 * SETUP:
 * 1. Create a new Google Sheet (e.g. "ITM Applications").
 * 2. Open it, go to Extensions > Apps Script.
 * 3. Delete any existing code in Code.gs and paste this entire file.
 * 4. Click Deploy > New deployment.
 *      - Type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Click Deploy, authorize the permissions when asked.
 * 6. Copy the "Web app URL" (ends in /exec).
 * 7. Paste that URL into GOOGLE_SCRIPT_URL in script.js on the website.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add header row automatically if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Email",
        "Country Code",
        "Mobile Number",
        "State",
        "City",
        "Course",
        "Specialization"
      ]);
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.fullName || "",
      data.email || "",
      data.countryCode || "",
      data.mobile || "",
      data.state || "",
      data.city || "",
      data.course || "",
      data.specialization || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: lets you test the deployment by visiting the /exec URL
 * directly in a browser — it should say the script is running.
 */
function doGet(e) {
  return ContentService.createTextOutput("ITM University form endpoint is running.");
}
