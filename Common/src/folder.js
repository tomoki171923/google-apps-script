/**********************************************
folder.gs
Folderオブジェクトを操作する汎用的な機能を保持
**********************************************/

/**
 * 引数のSpreadSheetを配置しているフォルダオブジェクトを返却する
 * @param {Spreadsheet} spreadsheet (require): Spreadsheetオブジェクト
 * @return {Folder} 引数のSpreadSheetを配置しているフォルダオブジェクト
 */
function getFolder(spreadsheet) {
  const ssId = spreadsheet.getId();
  const parentFolder = DriveApp.getFileById(ssId).getParents();
  const folderId = parentFolder.next().getId();
  const folder = DriveApp.getFolderById(folderId);
  return folder;
}

/**
 * 引数のフォルダ内に新規でフォルダを作成する
 * @param {Folder} parentFolder (require): 親フォルダ
 * @param {String} folderName (require): 新規作成するフォルダ名
 * @return {Folder} 新規で作成したフォルダオブジェクト
 */
function createFolder(parentFolder, foldername) {
  const newfolder = parentFolder.createFolder(foldername);
  return newfolder;
}

/**
 * ドライブフォルダにJSONファイルを作成
 * @param {Json} fileData (require): ファイル内データ
 * @param {String} fileName (require): ファイル名
 * @param {Folder} folder (require): ファイルを保存するフォルダオブジェクト
 */
function createJsonFile(fileData, fileName, folder) {
  const contentType = "text/json";
  fileName += ".json";
  const charset = "utf-8";
  const blob = Utilities.newBlob("", contentType, fileName).setDataFromString(
    fileData,
    charset
  );
  folder.createFile(blob);
}

/**
 * ドライブフォルダにCSVファイルを作成
 * @param {CSV} fileData (require): ファイル内データ
 * @param {String} fileName (require): ファイル名
 * @param {Folder} folder (require): ファイルを保存するフォルダオブジェクト
 */
function createCsvFile(fileData, fileName, folder) {
  var contentType = "text/csv";
  fileName += ".csv";
  var charset = "utf-8";
  var blob = Utilities.newBlob("", contentType, fileName).setDataFromString(
    fileData,
    charset
  );
  folder.createFile(blob);
}

/**
 * フォルダ内に引数の名前のファイルが存在しているか判定
 * 以下を返却する
 *   ファイルが存在している場合 : spreadsheetオブジェクト
 *   ファイルが存在していない場合 : null
 * @param {Folder} folder (require): フォルダオブジェクト
 * @param {String} fileName (require): ファイル名
 * @return {Spreadsheet} spreadsheetオブジェクト
 * @return {Null}
 */
function existFile(folder, fileName) {
  let files = folder.getFiles();
  let file = null;
  let targetFile = null;
  while (files.hasNext()) {
    file = files.next();
    if (file.getName() == fileName) {
      targetFile = file;
      break;
    }
  }
  return targetFile;
}

/**
 * フォルダ内に引数の名前のサブフォルダが存在しているか判定
 * 以下を返却する
 *   サブフォルダが存在している場合 : サブフォルダオブジェクト(folder)
 *   サブフォルダが存在していない場合 : null
 * @param {Folder} folder (require): フォルダオブジェクト
 * @param {String} folderName (require): フォルダ名
 * @return {Folder} サブフォルダオブジェクト
 * @return {Null}
 */
function existFolder(folder, folderName) {
  const subfolders = folder.getFolders();
  let subfolder;
  let targetFolder = null;
  while (subfolders.hasNext()) {
    subfolder = subfolders.next();
    if (subfolder.getName() == folderName) {
      targetFolder = subfolder;
      break;
    }
  }
  return targetFolder;
}
