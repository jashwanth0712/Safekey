#!/usr/bin/env python3

import os
import subprocess
import stat
import sys
from cryptography.fernet import Fernet

#-----------------------variables------------------------------
# Extract folder path and drive name from command line arguments
if len(sys.argv) < 3:
    print("less arguments")
    sys.exit(1)

path = sys.argv[1]
drive_name = sys.argv[2]

# Construct the path for the key file
key_file_path = f'{drive_name}:\\thekey.key'
#-------------------------functions------------------------------
def set_write_permission(file_path):
    # Set write permission for the file
    try:
        os.chmod(file_path, stat.S_IWRITE)
    except:
        pass

#function to get all the files in a given folder
def list_files(directory):
    file_list = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_list.append(os.path.join(root, file))
    return file_list

def unhide_files(directory):
    # Unhide individual files within the directory
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            unhide_single_file(file_path)

def unhide_single_file(file_path):
    # Remove the hidden attribute from the file
    try:
        # Execute the command to unhide the file using the command prompt
        subprocess.run(['attrib', '-h', file_path], shell=True)
    except:
        pass

#------------------------------------------------------
unhide_files(path)
files = list_files(path)
print(files)

key=''

# Check if the key file exists
if os.path.exists(key_file_path):
    # Read the key from the file
    with open(key_file_path, "rb") as key_file:
        key = key_file.read()
        print(key)
else:
    print(f"Key file '{key_file_path}' not found.")

for file in files:
    with open(file, "rb") as thefile:
        contents = thefile.read()
    contents_decrypted = Fernet(key).decrypt(contents)
    set_write_permission(file)  # Set write permission
    with open(file, "wb") as thefile:
        thefile.write(contents_decrypted)
