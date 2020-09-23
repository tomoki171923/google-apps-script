function __load(sheet) {
  const data = sheet.getDataRange().getValues();
  let csv = "";
  for (let i = 0; i < data.length; i++) {
    // add double
    for (let j = 0; j < data[i].length; j++) {
      data[i][j] = '"' + data[i][j] + '"';
    }
    csv += data[i].join(",") + "\r\n";
  }
  return csv;
}

function main() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const folder = Common.getFolder(spreadsheet);
  const foldername = "outputCsv_" + Common.getTime();
  const newFolder = Common.createFolder(folder, foldername);
  const sheet = spreadsheet.getSheetByName("nb_words");
  const csvData = __load(sheet);
  Common.createCsvFile(csvData, sheet.getName(), newFolder);
}
