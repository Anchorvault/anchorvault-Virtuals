/**
 * AnchorVault Waitlist — Google Apps Script
 * ==========================================
 * SETUP (one time, 3 minutes):
 *
 * 1. Go to https://sheets.google.com → Create new sheet → Name it "AnchorVault Waitlist"
 * 2. Click Extensions → Apps Script
 * 3. Delete all existing code → Paste THIS entire file content
 * 4. Click Save (Ctrl+S)
 * 5. Click Deploy → New Deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy → Copy the Web App URL
 * 7. Add to your hosting env vars:
 *    VITE_SHEETS_URL = https://script.google.com/macros/s/YOUR_ID/exec
 *
 * That's it! Every subscriber email is saved to your Google Sheet automatically.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['#', 'Email', 'Date', 'Time', 'Source']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#0F172A').setFontColor('#ffffff');
      sheet.setColumnWidth(1, 50);
      sheet.setColumnWidth(2, 280);
      sheet.setColumnWidth(3, 120);
      sheet.setColumnWidth(4, 100);
      sheet.setColumnWidth(5, 200);
    }

    const data = JSON.parse(e.postData.contents);
    const now = new Date();
    const rowNum = sheet.getLastRow(); // next subscriber number

    sheet.appendRow([
      rowNum,                                    // #
      data.email,                                // Email
      now.toLocaleDateString('en-IN'),           // Date
      now.toLocaleTimeString('en-IN'),           // Time
      data.source || 'AnchorVault Waitlist'      // Source
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: rowNum }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Required for preflight/GET requests
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'AnchorVault Waitlist API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
