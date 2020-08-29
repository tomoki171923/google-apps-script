#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
How to use this script file.
- Deploying to GAS Project
python deploy.py
"""

import subprocess
from subprocess import PIPE
import sys
import yaml
import json
import termcolor
import shutil

# execute a bash command
def execBash(cmd):
    print('----------' + cmd + '----------')
    result = subprocess.run(
        cmd, shell=True, stdout=PIPE, stderr=PIPE, text=True)
    if result.returncode == 0:
        print(termcolor.colored(result.returncode, 'green'))
        print(termcolor.colored(result, 'green'))
        print('------------------------------')
        return result
    else:
        print(termcolor.colored(result.returncode, 'red'))
        print(termcolor.colored(result, 'red'))
        print(termcolor.colored(
            'ERROR happened. Stop this process.', 'red'))
        sys.exit()


def updateProduction(project_name: str):
    cmd = f"cd {project_name} && npm run update_production && cd ../"
    result = execBash(cmd)
    version = None
    for line in result.stdout.splitlines():
        if 'Created version' in line:
            line = line.replace('Created version', '')
            line = line.replace(' ', '')
            line = line.replace('.', '')
            line = line.replace('\x1b[2K\x1b[1G', '')
            version = line
    return int(version)


def deploy(common_name: str, project_name: str):
    print(f"************ Start Deploying to GAS {project_name} ************")
    cmd = f"cd {common_name} && npm run prettier && echo 'y' | npm run push && cd ../"
    execBash(cmd)
    commonVer = updateProduction(common_name)

    jsonPath = f"{project_name}/src/appsscript.json"
    with open(jsonPath, "r") as file:
        jsonData = json.load(file)
    for library in jsonData['dependencies']['libraries']:
        if library['userSymbol']=='common':
            library['version']= commonVer
    with open(jsonPath, "w") as file:
        json.dump(jsonData, file, indent=2, ensure_ascii=False)
    
    cmd = f"cd {project_name} && npm run prettier && echo 'y' | npm run push && cd ../"
    execBash(cmd)
    print(f"************ End Deploying to GAS {project_name} ************")


if __name__ == "__main__":
    with open('./deploy.yml') as file:
        deploy_yaml = yaml.safe_load(file)
    deploy(deploy_yaml['common']['project_name'], deploy_yaml['target']['project_name'])
