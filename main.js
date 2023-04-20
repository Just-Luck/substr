const { performance } = require("perf_hooks");
const fs = require("fs"); //* Модуль для работы с файлами
let input = fs.readFileSync("war_and_peace.ru.txt", "utf8"); //*Считываем input файл

function BruteForce(str, substr) {
  let n = str.length;
  let m = substr.length;
  let res = [];

  for (let i = 0; i <= n - m + 1; i++) {
    let j;
    for (j = 0; j < m; j++) if (str[i + j] !== substr[j]) break;
    if (j === m) res.push(i);
  }
  return { res };
}

const simple_dimpl = 282_589_933;
function hash(substr) {
  let m = substr.length;
  let hash = 0;
  for (let i = 0; i < m; i++)
    hash = (hash + substr.charCodeAt(i) * 13 ** (m - i - 1)) % simple_dimpl;
  return hash % simple_dimpl;
}

function findSubstring(s, t) {
  let res = [];
  let collision = 0;
  let tHash = hash(t);
  let m = t.length;
  let sHash = hash(s.slice(0, m));
  let base = 13 ** (m - 1);
  for (let i = 0; i <= s.length - m; i++) {
    if (sHash === tHash) {
      let j;
      for (j = 0; j < m; j++) {
        if (s[i + j] !== t[j]) {
          collision++;
          break;
        }
      }
      if (j === m) res.push(i);
    }
    if (i < s.length - m) {
      sHash =
        ((sHash - s.charCodeAt(i) * base) * 13 + s.charCodeAt(i + m)) %
        simple_dimpl;
      if (sHash < 0) sHash += simple_dimpl;
    }
  }
  return { res, collision };
}

// Test("hello world", "l");
// Test("aaabbbcccacbbcdaaa", "aaa");
// Test("abcdabcdabcdabcd", "abc");
// Test("abababab", "ab");
// Test("aa", "a");

Test(input, "кн");
function Test(str, substr) {
  let time_start = performance.now();
  let res = BruteForce(str, substr);
  let time_end = performance.now();
  let time = (time_end - time_start).toFixed(5);
  console.log(`Brut: ${time} ms`, res);

  let time2_start = performance.now();
  let res2 = findSubstring(str, substr);
  let time2_end = performance.now();
  let time2 = (time2_end - time2_start).toFixed(5);
  console.log(`Hash: ${time2} ms`, res2);
  console.log(`profit: ${time - time2} ms`);
  console.log("---------------------------------");
}
