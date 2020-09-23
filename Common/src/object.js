/**********************************************
object.gs
オブジェクトを操作する汎用的な機能を保持
**********************************************/

/**
 * Null判定
 * @param {Object} data (require): データ(Object)
 * @return {boolean} : true/false
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

/**
 * 配列内にデータが存在しているか判定
 * @param {Array} array (require): 配列データ
 * @param {Object} data (require): データ(Object)
 * @return {boolean} : true/false
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
/**
 * オブジェクトの型を返却
 * @param {Object} data (require): オブジェクト
 * @return {String} : オブジェクトの型
 */
function getObjecyType(obj) {
  return Object.prototype.toString.call(obj);
}
