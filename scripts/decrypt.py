#!/use/bin/env python3

import os
import subprocess
import stat
from cryptography.fernet import Fernet
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
path=r'C:\Users\jashw\OneDrive\Desktop\Pangea\Safekey\scripts\test'
unhide_files(path)
files = list_files(path)
print(files)
# Generating a key
key = ''
with open("thekey.key", "rb") as key_file:
    key = key_file.read()
print(key)

for file in files:
    with open(file, "rb") as thefile:
        contents = thefile.read()
    contents_decrypted = Fernet(key).decrypt(contents)
    set_write_permission(file)  # Set write permission
    with open(file, "wb") as thefile:
        thefile.write(contents_decrypted)