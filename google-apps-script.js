// Google Apps Script for Form Submission
// Copy this code into Google Apps Script (script.google.com)

function doPost(e) {
  try {
    // Get the form data
    const formData = e.parameter;
    
    // Get the active spreadsheet (using the provided spreadsheet ID)
    const spreadsheet = SpreadsheetApp.openById('1NmOSfIFKc74RGmESc7wns2QgPdKvWlcI2RFVpMvJh20');
    const sheet = spreadsheet.getActiveSheet();
    
    // Prepare the data to write
    const rowData = [
      new Date(), // Timestamp
      formData.fullName || '',
      formData.businessName || '',
      formData.businessWebsite || '',
      formData.phoneNumber || '',
      formData.emailAddress || '',
      formData.serviceArea || '',
      formData.services || '',
      formData.marketingChallenge || '',
      formData.leadsPerMonth || '',
      formData.monthlyBudget || '',
      formData.startTimeline || '',
      formData.additionalInfo || '',
      formData.contactConsent || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Form submission endpoint is working!')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Instructions for setup:
// 1. Go to script.google.com
// 2. Create a new project
// 3. Replace the default code with this script
// 4. The spreadsheet ID is already configured: 1NmOSfIFKc74RGmESc7wns2QgPdKvWlcI2RFVpMvJh20
// 5. Deploy as web app:
//    - Click Deploy > New deployment
//    - Choose "Web app"
//    - Set "Execute as" to "Me"
//    - Set "Who has access" to "Anyone"
//    - Click Deploy
// 6. Copy the Web App URL and update your website 