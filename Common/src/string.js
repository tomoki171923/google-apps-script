/**********************************************
string.gs
Stringオブジェクトを操作する汎用的な機能を保持
**********************************************/

/**
 * 引数のstringから、空白を削除して返却する
 * @param {String} str (require): Stringオブジェクト
 * @return {Range} : Rangeオブジェクト
 */
function deleteSpace(str) {
  return str.replace(/[\s\t\n]/g, "");
}
