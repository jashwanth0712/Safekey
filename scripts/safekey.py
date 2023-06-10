import argparse
import subprocess
import os

is_get = False
file_paths = []
folder_path = ""
is_usb = False
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
            drive_letter = drive_info[0]
            drive_type = drive_info[1].strip()
            if drive_type == '2':
                current_disks.append(drive_letter)
                print(drive_letter," ",read_file(f'{drive_letter}:\\thekey.key'))
    
def get_function():
    print("Get")

def set_function():
    print("Set")

def list_function():
    print("List of file paths:", file_paths)

def folder_function():
    print("Folder path:", folder_path)


def parse_arguments():
    global is_get, file_paths, folder_path, is_usb

    parser = argparse.ArgumentParser(description='CLI Tool')
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('-g', '--get', action='store_true', help='Get')
    group.add_argument('-gu', '--getusb', action='store_true', help='USB')
    group.add_argument('-s', '--set', action='store_true', help='Set')
    group.add_argument('-l', '--list', nargs='+', help='List of file paths')
    group.add_argument('-f', '--folder', help='Folder path')

    args = parser.parse_args()

    if args.get:
        is_get = True
        get_function()
    elif args.set:
        is_get = False
        set_function()
    elif args.list:
        file_paths = args.list
        list_function()
    elif args.folder:
        folder_path = args.folder
        folder_function()
    elif args.getusb:
        is_usb = True


    #set files 
    if(is_usb):
        get_current_pendrives()
            
if __name__ == '__main__':
    parse_arguments()
