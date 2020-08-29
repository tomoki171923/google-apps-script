/**********************************************
sheet.gs
Sheetオブジェクトを操作する汎用的な機能を保持
**********************************************/

/*
機能:
    引数のkeyを検索し、sheet内のrangeを返却する
引数:
    sheet: シートオブジェクト名(Sheet)
    key: 検索する文字(String)
*/
function findText(sheet, key) {
  const textFinder = sheet.createTextFinder(key);
  const range = textFinder.findNext();
  return range;
}
