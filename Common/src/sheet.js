/**********************************************
sheet.gs
Sheetオブジェクトを操作する汎用的な機能を保持
**********************************************/

/**
 * 引数のkeyを検索し、sheet内のrangeを返却する
 * @param {Sheet} sheet (require): シートオブジェクト
 * @param {String} key (require): 検索する文字
 * @return {Range} : Rangeオブジェクト
 */
function findText(sheet, key) {
  const textFinder = sheet.createTextFinder(key);
  const range = textFinder.findNext();
  return range;
}
