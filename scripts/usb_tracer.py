import subprocess
import time

while True:
    out = subprocess.check_output('wmic logicaldisk get DriveType, Caption', shell=True)
    for drive in str(out).strip().split('\\r\\r\\n'):
        if '2' in drive:
            drive_letter = drive.split(':')[0]
            drive_type = drive.split(':')[1].strip()
            if drive_type == '2':
                print('Removable disk detected on drive', drive_letter)
                # Additional actions can be performed here if needed
    time.sleep(2)
