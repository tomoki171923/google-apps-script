/**********************************************
object.gs
オブジェクトを操作する汎用的な機能を保持
**********************************************/

/*
機能:
    Null判定
引数:
    data: データ(Object)
*/
function isNull(data) {
  if (typeof data == "string" && !data.trim()) {
    data = null;
  }
  if (data == null || data == undefined) {
    return true;
  } else {
    return false;
  }
}

/*
機能:
    配列内にデータが存在しているか判定
引数:
    array: 配列データ(Array)
    data: データ(Object)
*/
function isExisted(array, data) {
  return array.includes(data);
}

/*
機能:
    オブジェクトの型を返却
引数:
    obj: オブジェクト(Object)
*/
function getObjecyType(obj) {
  return Object.prototype.toString.call(obj);
}
