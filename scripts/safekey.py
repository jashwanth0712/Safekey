import argparse
import subprocess
import os
from cryptography.fernet import Fernet


is_get = False
file_paths = []
folder_path = ""
is_usb = False
drive_name=""
def read_file(file):
    if not os.path.isfile(file):
        return None

    with open(file, "rb") as thefile:
        contents = thefile.read().decode("utf-8")
    return contents


def get_current_pendrives():
    out = subprocess.check_output('wmic logicaldisk get DriveType, Caption', shell=True)
    current_disks = []
    for drive in str(out).strip().split('\\r\\r\\n'):
        if '2' in drive:
            drive_info = drive.split(':')
            drive_name = drive_info[0]
            drive_type = drive_info[1].strip()
            if drive_type == '2':
                current_disks.append(drive_name)
                print(drive_name," ",read_file(f'{drive_name}:\\thekey.key'))
    
def get_function():
    print("Get")

def set_function():
    print("Set")

def set_list_function(key):
    drive_name=file_paths[0]
    # print("Drive letter ",drive_name)
    file_paths.pop(0)
    # print("List of file paths:", file_paths)
    key = Fernet.generate_key()
    key_file_path = os.path.join(drive_name+":", "thekey.key")
    metadata_file_path = os.path.join(drive_name+":", "metadata.txt")
    # Write file paths to metadata file
    with open(metadata_file_path, "w") as metadata_file:
        for file_path in file_paths:
            metadata_file.write(file_path + "\n")
    
    # Write key to thekey.key file
    with open(key_file_path, "wb") as key_file:
        key_file.write(key)
    # encrypting the files
    for file in file_paths:
        with open(file,"rb") as thefile:
            contents=thefile.read()
        contents_encrypted = Fernet(key).encrypt(contents)
        with open(file,"wb") as thefile:
            thefile.write(contents_encrypted)
    print(key)

def folder_function():
    print("Folder path:", folder_path)
def transfer(data):
    print("transfered")
def delete_key(data):
    print("deleted")

def parse_arguments():
    global is_get, file_paths, folder_path, is_usb , drive_name

    parser = argparse.ArgumentParser(description='CLI Tool')
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('-g', '--get', action='store_true', help='Get')
    group.add_argument('-gu', '--getusb', action='store_true', help='USB')
    group.add_argument('-s', '--set', action='store_true', help='Set')
    group.add_argument('-l', '--list', nargs='+', help='List of file paths')
    group.add_argument('-lk', '--list_with_key', nargs='+', help='List of file paths')
    group.add_argument('-f', '--folder', help='Folder path')
    group.add_argument('-t', '--transfer',nargs='+', help='transfer keys')
    group.add_argument('-d', '--delete', help='delete keys')

    args = parser.parse_args()

    if args.get:
        is_get = True
        get_function()
    elif args.set:
        is_get = False
        set_function()
    elif args.list:
        file_paths = args.list
        set_list_function("IWrhkVmBAy7Oy-qyAM-NUcOh6OjDqoz9lrE1JzaYHYk=")
    elif args.folder:
        folder_path = args.folder
        folder_function()
    elif args.getusb:
        is_usb = True
    elif args.transfer:
        transfer(args.transfer)
    elif args.delete:
        delete_key(args.delete)
    elif args.list_with_key:
        file_paths =args.list_with_key
        key=file_paths.pop(0)
        set_list_function(key)


    #set files 
    if(is_usb):
        get_current_pendrives()
            
if __name__ == '__main__':
    parse_arguments()
