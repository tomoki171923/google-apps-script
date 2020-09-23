#!/usr/bin/env python
# -*- coding: utf-8 -*-

import subprocess
from subprocess import PIPE
import sys
import yaml
import json
import termcolor
import shutil

# execute a command
def execCmd(cmd):
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
    result = execCmd(cmd)
    version = None
    for line in result.stdout.splitlines():
        if 'Created version' in line:
            line = line.replace('Created version', '')
            line = line.replace(' ', '')
            line = line.replace('.', '')
            line = line.replace('\x1b[2K\x1b[1G', '')
            version = line
    return int(version)


def __deployCommon(common_name: str):
    print(f"************ Start Deploying to GAS {common_name} ************")
    cmd = f"cd {common_name} && npm run prettier && echo 'y' | npm run push && cd ../"
    execCmd(cmd)
    version = updateProduction(common_name)
    print(f"************ End Deploying to GAS {common_name} ************")
    return version


def __deployTarget(project_name: str):
    print(f"************ Start Deploying to GAS {project_name} ************")
    cmd = f"cd {project_name} && npm run prettier && echo 'y' | npm run push && cd ../"
    execCmd(cmd)
    print(f"************ End Deploying to GAS {project_name} ************")



def deploy(common_name: str, project_name=None):
    if project_name is None:
        # CASE: Common
        __deployCommon(common_name)
        return
    elif common_name is None:
        # CASE: Target
        __deployTarget(project_name)
        return
    else:
        # CASE: Target & Common
        flag = False
        common_ver = __deployCommon(common_name)
        jsonPath = f"{project_name}/src/appsscript.json"
        with open(jsonPath, "r") as file:
            jsonData = json.load(file)
        if 'dependencies' in jsonData:
            for library in jsonData['dependencies']['libraries']:
                if library['userSymbol']=='Common':
                    flag = True
                    library['version']= common_ver
        if flag:
            with open(jsonPath, "w") as file:
                json.dump(jsonData, file, indent=2, ensure_ascii=False)
        __deployTarget(project_name)


if __name__ == "__main__":
    with open('./deploy.yml') as file:
        deploy_yaml = yaml.safe_load(file)
    args = sys.argv
    if len(args) == 1:
        deploy(deploy_yaml['common']['project_name'], deploy_yaml['target']['project_name'])
    elif len(args) == 2:
        if args[1] == '--common':
            deploy(deploy_yaml['common']['project_name'])
        elif args[1] == '--target':
            deploy(None, deploy_yaml['target']['project_name'])
        else:
            print(termcolor.colored('Arguments are invalid...', 'red'))
    else:
        print(termcolor.colored('Arguments are invalid...', 'red'))

