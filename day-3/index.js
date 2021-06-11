const laSoLe = require('is-odd');
const isOdd = require('./isOdd');

console.log('thu vien', laSoLe('5'));
console.log('minh viet', isOdd('5'));

const fs = require('fs');

const str = 'tuan\n';
const str1 = `${1}

web full stack 42 
hello

`;

// fs.writeFile('test.txt', str1, (err) => {
//   if (err) return console.log(err);
//   console.log('Success');
// });

// fs.writeFileSync('test.txt', str1);
// console.log('Success');
// console.log('Success 1');

// fs.readFile('./test2.txt', (loi, dulieu) => {
//   if (loi) {
//     console.log(loi);
//     console.log(dulieu);
//     return;
//   }
//   console.log(dulieu);
// });

// fs.readFile('./test.txt', (loi, dulieu) => {
//   if (loi) {
//     console.log(loi);
//     console.log(dulieu);
//     return;
//   }
//   console.log(dulieu.toString());
// });

fs.readFile('./test.txt', { encoding : 'utf8'}, (loi, dulieu) => {
  if (loi) {
    console.log(loi);
    console.log(dulieu);
    return;
  }
  console.log(dulieu);
});

