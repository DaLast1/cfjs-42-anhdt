const fs = require('fs');
const isOdd = require('./isOdd');
// Bước 1: Đọc file
// const data = fs.readFileSync('./odd.txt', { encoding: 'utf-8' });

// console.log(data);

// // Bước 2: Chuyển string mảng các số
// const numbers = data.split(' ').map(x => parseInt(x));
// console.log('b2', numbers);

// // Bước 3: Đếm
// let count = 0;
// // for of (for let i = 0)
// // reduce
// numbers.forEach(x => {
//   if (isOdd(x)) {
//     count++;
//   }
// });

// console.log(count);

// // Bước 4: Ghi vào file
// fs.writeFile('result.txt', count, (err) => {
//   if (err) return console.log(err);
//   console.log('success');
// })

fs.readFile('odd.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) return err;
  const numbers = data.split(' ').map(x => parseInt(x));
  let count = 0;
  // for of (for let i = 0)
  // reduce
  numbers.forEach(x => {
    if (isOdd(x)) {
      count++;
    }
  });
  fs.writeFile('result.txt', count, (err) => {
    if (err) return console.log(err);
    console.log('success');
  })
});