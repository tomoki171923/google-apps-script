/**********************************************
date.gs
Dateオブジェクトを操作する汎用的な機能を保持
**********************************************/

/**
 * 日本時間のタイムスタンプを返却する
 * @param {String} format (option): 日付フォーマット (e.g.  "yyyy/MM/dd")
 * @return {String} 日本時間のタイムスタンプ
 */
function getTime(format = "yyyyMMdd_HHmmSS") {
  return Utilities.formatDate(new Date(), "Asia/Tokyo", format);
}

/**
 * 日付のフォーマットを整える
 * @param {Date} date (require): 日付データ
 * @param {String} format (require): 日付フォーマット (e.g.  "yyyy/MM/dd")
 * @return {String} 指定したフォーマットの日付
 */
function formatDate(date, format) {
  return Utilities.formatDate(date, "Asia/Tokyo", format);
}
