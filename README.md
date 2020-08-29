# google-apps-script

# Application Architecture
```
root
 └ common // common functions code for every project are located in this folder.
 └ YOUR_PROJECT_NAME1 // individual project code are located in this folder.
 └ YOUR_PROJECT_NAME2 // individual project code are located in this folder.
```

# How to import Common functions into individual project.
modify PROJECT_NAME1/src/appsscript.json
```
{
  "timeZone": "Asia/Tokyo",
  "dependencies": {
    "libraries": [
      {
        "userSymbol": "common",
        "libraryId": "*********************************************************",
        "version": xx
      }
    ]
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8"
}
```


# https://developers.google.com/datastudio/connector/local-development?hl=ja
# install and connect GAS project 
```
npx @google/dscc-gen connector --script_id YOUR_SCRIPT_ID
cp -pi deploy.yml.org deploy.yml
```

# deploy to GAS project
cd YOUR_PROJECT_NAME
npm run push


# SCRIPT_ID and PROJECT_NAME
you can confirm the following.
https://script.google.com/d/*********************************************************/edit
File > Project properties 
