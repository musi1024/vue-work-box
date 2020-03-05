const fs = require('fs');
const path = require('path');

function getAllFiles(dir, filter) {
  let files = [];
  function walk(dir) {
    const res = fs.readdirSync(dir, {
      withFileTypes: true
    });
    res.forEach(dirent => {
      if (dirent.isFile() && filter(dirent.name)) {
        files.push(path.resolve(dir, dirent.name));
      } else if (dirent.isDirectory()) {
        walk(path.resolve(dir, dirent.name));
      }
    });
  }
  walk(dir);
  return files;
}

module.exports = getAllFiles;
