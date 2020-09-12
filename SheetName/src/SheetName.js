/**
 * Gets the Sheet Name of a selected Sheet.
 *
 * @param {number} option 0 - Current Sheet, 1  All Sheets, 2 Spreadsheet filename
 * @return The input multiplied by 2.
 * @customfunction
 */

function SheetName(option) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const thisSheet = ss.getActiveSheet();
  const sheetName = thisSheet.getName();

  //Current option Sheet Name
  if (option === 0) {
    return sheetName;

    //All Sheet Names in Spreadsheet
  } else if (option === 1) {
    let sheetNames = [];
    ss.getSheets().forEach(function(sheet) {
      sheetNames.push(sheet.getName());
    });
    return sheetNames;

    //The Spreadsheet File Name
  } else if (option === 2) {
    return ss.getName();

    //Error
  } else {
    return "#N/A";
  }
}
