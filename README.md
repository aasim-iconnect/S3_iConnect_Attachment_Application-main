# Freshservice to S3 Bucket - Attachment 

Basically we are creating a program where an agent in freshservice will be making a reply in a chat with an attachment. The file will be saved on the S3 bucket with Folder and Sub-Folder & File format.

## Installation

Download dependencies

```bash
npm install
```
To use the code you need an S3 Bucket & NodeJS server

```bash
node index.js
```

## Output

```python
Downloaded File
Downloaded File
File uploaded successfully. https://iconnect-aditya.s3.amazonaws.com/10/50/Googl
ePhoto.jpg
Downloaded File Deleted
File uploaded successfully. https://iconnect-aditya.s3.amazonaws.com/10/53/adfad
f.jpg
Downloaded File Deleted
Downloaded File
File uploaded successfully. https://iconnect-aditya.s3.ap-south-1.amazonaws.com/
10/51/15MBFile.jpg
Downloaded File Deleted
```
