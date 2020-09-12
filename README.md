# google-apps-script

## Application Architecture
```
root
 └ Common // common functions code for every project are located in this folder.
 └ YOUR_PROJECT_NAME // individual project code are located in this folder.
 └ YOUR_PROJECT_NAME // individual project code are located in this folder.
```

## Initial Settings

### 1. Git Clone
```
git clone https://github.com/tomoki171923/google-apps-script.git
cp -pi deploy.yml.org deploy.yml
```

### 2. create your Common project
create "Common" project from the following.
https://script.google.com/home/my
[Setting] > [Google Apps Script API] > On
[+ new project]
project name: "Common"

### 3. create .clasp.json
create .clasp.json
```
touch Common/.clasp.json
```

write the following on Common/.clasp.json
```
{"scriptId":"YOUR_COMMON_SCRIPT_ID","rootDir":"src"}
```

### 4. install npm packages
```
npm i @google/clasp -g
cd Common
npm install
```

### 5. deploy your Common project
```
npm run push
? Manifest file has been updated. Do you want to push and overwrite? (y/N) > y
cd ../
```

### 6. import Common functions into your own project.
install and connect your own GAS project
```
npx @google/dscc-gen connector --script_id YOUR_SCRIPT_ID
? Project name > YOUR_PROJECT_NAME
```
modify ./YOUR_PROJECT_NAME/src/appsscript.json
```
{
  "timeZone": "Asia/Tokyo",
  "dependencies": {
    "libraries": [
      {
        "userSymbol": "Common",
        "libraryId": "YOUR_COMMON_SCRIPT_ID",
        "version": xx
      }
    ]
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8"
}
```

## How to deploy to your own GAS project
modify ./deploy.yml
change YOUR_SCRIPT_ID and YOUR_PROJECT_NAME
```
common:
  script_id: "*********************************************************"
  project_name: "Common"
target:
  script_id: "YOUR_SCRIPT_ID"
  project_name: "YOUR_PROJECT_NAME"
```
deploy to your own GAS project
```
python deploy.py
```


## How to confirm YOUR_SCRIPT_ID and YOUR_PROJECT_NAME
you can confirm the following.
https://script.google.com/d/*********************************************************/edit
File > Project properties 


## Reference
https://developers.google.com/datastudio/connector/local-development?hl=ja