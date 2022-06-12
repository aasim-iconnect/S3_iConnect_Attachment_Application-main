const fs = require("fs");

const fileName = "User Manual For Softline.docx";
const path = fileName;

try {
  fs.unlinkSync(path);
  //file removed
} catch (err) {
  console.error(err);
}
