/**********************************************
folder.gs
Folderオブジェクトを操作する汎用的な機能を保持
**********************************************/

/*
機能:
    引数のSpreadSheetを配置しているフォルダオブジェクトを返却する
引数:
    spreadsheet: Spreadsheetオブジェクト(Spreadsheet)
*/
function getFolder(spreadsheet) {
  const ssId = spreadsheet.getId();
  const parentFolder = DriveApp.getFileById(ssId).getParents();
  const folderId = parentFolder.next().getId();
  const folder = DriveApp.getFolderById(folderId);
  return folder;
}

/*
機能:
    引数のフォルダ内に新規でフォルダを作成する
引数:
    parentFolder: フォルダオブジェクト(Folder)
    folderName: フォルダ名(String)
*/
function createFolder(parentFolder, foldername) {
  const newfolder = parentFolder.createFolder(foldername);
  return newfolder;
}

/*
機能:
    ドライブフォルダにJSONファイルを作成
引数:
    fileData: ファイル内データ(Json)
    fileName: ファイル名(String)
    folder: ファイルを保存するフォルダオブジェクト(Folder)
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

/*
機能:
    ドライブフォルダにCSVファイルを作成
引数:
    fileData: ファイル内データ(CSV)
    fileName: ファイル名(String)
    folder: ファイルを保存するフォルダオブジェクト(Folder)
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

/*
機能:
    フォルダ内に引数の名前のファイルが存在しているか判定
    以下を返却する
      ファイルが存在している場合 : spreadsheetオブジェクト
      ファイルが存在していない場合 : null
引数:
    folder: フォルダオブジェクト(Folder)
    fileName: ファイル名(String)
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

/*
機能:
    フォルダ内に引数の名前のサブフォルダが存在しているか判定
    以下を返却する
      サブフォルダが存在している場合 : サブフォルダオブジェクト(folder)
      サブフォルダが存在していない場合 : null
引数:
    folder: フォルダオブジェクト(Folder)
    folderName: サブフォルダ名(String)
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
