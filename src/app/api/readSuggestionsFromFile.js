const fs = require('fs');
const readline = require('readline');

//const filePath = 'priv/asset/wordlist.txt';
const filePath = 'src/app/api/trialDataFile.js';

async function readSuggestionsFromFile(prefix) {
  const customPromise = new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream('./' + filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });
    
    const res = [];

    rl.on('error', function(err) {
      // Get error details
      let outputErrorMsg = null;
      if (err?.code == 'ENOENT') {
        outputErrorMsg = 'Error: cannot locate file: ' + filePath;
      } else {
        outputErrorMsg = err.message;
      }

      console.log('[readSuggestions] [rl.on(error)] ' + outputErrorMsg);
      
      reject(outputErrorMsg);
    });
    
    rl.on('line', (line) => {
      if (line.toLowerCase().startsWith(prefix.toLowerCase())) {
        res.push(line);
      }
    });
    
    rl.on('close', () => {
      console.log('Finished reading the file.');
      resolve(res);
    });
  });

  return customPromise;
};

function getFileSize() {
debugger;
  var stats = fs.statSync(filePath)
  var fileSizeInBytes = stats.size;
  // Convert the file size to megabytes (optional)
  var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
  return fileSizeInMegabytes;
};

module.exports.readSuggestionsFromFile = readSuggestionsFromFile;
module.exports.getFileSize = getFileSize;
