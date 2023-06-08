import subprocess
import time

previous_disks = []

while True:
    out = subprocess.check_output('wmic logicaldisk get DriveType, Caption', shell=True)
    current_disks = []
    for drive in str(out).strip().split('\\r\\r\\n'):
        if '2' in drive:
            drive_letter = drive.split(':')[0]
            drive_type = drive.split(':')[1].strip()
            if drive_type == '2':
                current_disks.append(drive_letter)
                if drive_letter not in previous_disks:
                    print('|_ Removable disk detected on drive', drive_letter)
                    # Additional actions can be performed here if needed
    for drive in previous_disks:
        if drive not in current_disks:
            print('|_ Removable disk removed from drive', drive)
            # Additional actions can be performed here if needed
    previous_disks = current_disks
    time.sleep(2)
