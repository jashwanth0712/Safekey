#!/use/bin/env python3

import os
from cryptography.fernet import Fernet
#function to get all the files in a given folder
def list_files(directory):
    file_list = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_list.append(os.path.join(root, file))
    return file_list

path=r'C:\Users\jashw\OneDrive\Desktop\Pangea\Safekey\scripts\test'
files=list_files(path)
print(files)
#generating a key
key=''
with open("thekey.key","rb") as key:
    key=key.read()
print(key)

with open("thekey.key","wb")as thekey:
    thekey.write(key)

for file in files:
    with open(file,"rb") as thefile:
        contents=thefile.read()
    contents_decrypted = Fernet(key).decrypt(contents)
    with open(file,"wb") as thefile:
        thefile.write(contents_decrypted)