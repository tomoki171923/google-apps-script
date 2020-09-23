/**********************************************
error.gs
Errorオブジェクトを操作する汎用的な機能を保持
**********************************************/

/**
 * エラーを出力する
 * @param {Error} error (require): Errorオブジェクト
 */
function outputError(error) {
  const msg = "NAME : " + error.name + "\n" + "STACK TRACE : \n" + error.stack;
  Logger.log(msg);
  Browser.msgBox(error.stack);
}
