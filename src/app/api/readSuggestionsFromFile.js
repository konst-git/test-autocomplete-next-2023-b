const fs = require('fs');
const readline = require('readline');

async function readSuggestions(prefix) {
  const customPromise = new Promise((resolve, reject) => {
    const filePath = 'priv/asset/wordlist.txt';

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

module.exports = readSuggestions;
