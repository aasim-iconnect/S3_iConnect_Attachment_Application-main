const url =
  "https://iconnectsolutionspvtltd.ind-attachments.freshservice.com/data/helpdesk/attachments/production/27007817627/original/Asset0.png?response-content-type=image/png&Expires=1655064148&Signature=FK9HrWdg5jiQu~yCmNwKB2vRaNVJ4u2mUOL2xiD02cywAsf3r9X3ecz4~jGfvPA8ngTY6cDgrdCd3wW7DpGqi1geZht67GhXN2Egi0XHJ~cwU5JStpd24R5io5FT-Kd-92Z5FIFlw9t1MW0FFzPrQ3w58srfBeNrE2eCePZF~phsHQ49N83GWUeDn4SktKHpQPcZnjLVv481vt3Xtqhz~u-3fSzMXidNK0rXNfqWUK8ZeUc-GLipw-8T7LdgvAvKpOPjkE0UfmdPfpkMNe7MUY6LdZv9yTo-a5xKZOfO3v~OUZQpalp0BYOu~-PyZIb0nAc3FFERHkfVb-MfJI835A__&Key-Pair-Id=APKAIPHBXWY2KT5RCMPQ";

const https = require("https");
const fs = require("fs");

https.get(url, (resp) => resp.pipe(fs.createWriteStream("./test.jpeg")));
