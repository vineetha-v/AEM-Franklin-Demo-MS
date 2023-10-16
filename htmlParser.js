// const parser = require('node-html-parser');

// const artParser = require('@extractus/article-extractor');
import { writeFileSync, readFile } from 'fs';
// const fs = require('fs');
import { extract } from '@extractus/article-extractor';
// const html = fs.readFileSync(__dirname + '/data/index.html', 'utf-8');

async function extractFunc() {
  const result = await extract('https://main--ossmobiledemo--vineetha-v.hlx.page');

  writeFileSync(
    'websitedata.json',
    JSON.stringify(result, null, 2),
    (err) => {
      if (err) throw err;
      console.log('successfully saved file');
    },
  );

  readFile('websitedata.json', 'utf-8', (err, data) => {
    if (err) throw err;

    const obj = JSON.parse(data);

    console.log(obj.title);
    console.log(obj.url);
    console.log(obj.description);
    console.log(obj.links[0]);
    console.log(obj.image);
    // console.log(obj.content);
  });
}

extractFunc();
// console.log(result);

// const root = parser.parse(html);

// root.getElementsByTagName("title").map((elm) => {
//     console.log(elm.innerText)
// });

// const description = root.querySelector('picture').rawText
// console.log(description)
// fs.writeFile('scrappeddata.json', JSON.stringify(description), function(err) {
//       if (err) throw err;
//       console.log('successfully saved file')}
// )
