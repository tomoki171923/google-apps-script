function calIncomeTax(income) {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName("所得税計算シート");
    const data = sheet.getDataRange().getValues();
    let tax = 0;
    let min = 0;
    let max = 0;
    let rate = 0;
    let temp = 0;
    for (let row = 1; row < data.length; row++) {
      min = data[row][0]
      max = data[row][1]
      rate = data[row][2]
      if (min < income){
        if(max <= income){
          temp = max
        }else{
          temp = income - min
        }
        temp = temp * rate
        tax += temp
      }else{
        continue;
      }
    }
    return tax
  }
  