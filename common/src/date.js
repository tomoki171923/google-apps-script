/**********************************************
date.gs
Dateオブジェクトを操作する汎用的な機能を保持
**********************************************/

/*
機能:
    日本時間のタイムスタンプを返却する
引数:
    format(option): 日付フォーマット (e.g.  "yyyy/MM/dd")
*/
function getTime(format = "yyyyMMdd_HHmmSS") {
  return Utilities.formatDate(new Date(), "Asia/Tokyo", format);
}

/*
機能:
    日付のフォーマットを整える
引数:
    date: 日付データ(Date)
    format: 日付フォーマット (e.g.  "yyyy/MM/dd")
*/
function formatDate(date, format) {
  return Utilities.formatDate(date, "Asia/Tokyo", format);
}
