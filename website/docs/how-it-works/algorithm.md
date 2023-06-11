# How it works?

### We have two parts in our safekey model,one is pendrive and other is desktop/laptop. 
### Whenever we insert a new usb onto the system,the script starts running,it searches for the files present in metadata,if the file is present in the usb,it decrypts the files.
### It stores temporary meta data as a cache data to encrypt the files,after it encyptes the files,the cache is deleted.
### Again whenever you are ejecting the usb the script starts running and files get encrypted,so,other users cannot view the files without the key
![Flowchart](../../Electronjs/images/image.jpeg)


