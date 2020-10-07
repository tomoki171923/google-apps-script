function __load (sheet) {
  //入力必須値
  const requiredParams = [
    'jword',
    'hiragana',
    'eword',
    'pronunciation_us',
    'oxford_dictionary',
    'summary',
    'meaning',
    'example_en1',
    'example_ja1',
    'class1'
  ]

  //データ格納配列
  let data = [];
  let json = {};
  let key, value;

  //行（横軸）と列（縦軸）の最大数を取得
  const endRow = sheet.getLastRow();
  const endColumn = 17;

  try {
    // 実データを変数に格納
    for (y = 2; y <= endRow; y++) {
      // 初期化
      json = {};

      for (x = 1; x <= endColumn; x++) {
        // 初期化
        key = sheet.getRange(1, x).getValue();
        value = sheet.getRange(y, x).getValue();
        // 必須値にデータがなければエラーを発生させる
        if (Common.isNull(value) && Common.isExisted(requiredParams, key)) {
          const errormsg = __createErrorMsg(spreadsheet, sheet, y, x);
          throw new ReferenceError(errormsg);
        }
        //  左がkey　右がvalue
        json[key] = sheet.getRange(y, x).getValue();
      }
      data.push(json);
    }
  } catch (error) {
    Common.outputError(error);
    return null;
  }
  let parentJson = {}
  parentJson["NancebookTable"] = data;
  return parentJson;
}

function exportJson () {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const folder = Common.getFolder(spreadsheet)
  const foldername = 'exportJson_' + Common.getTime()
  const newFolder = Common.createFolder(folder, foldername)
  const sheet = spreadsheet.getSheetByName('nb_words')
  const jsonData = __load(sheet)
  Common.createJsonFile(jsonData, sheet.getName(), newFolder)
}
