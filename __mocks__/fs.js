const fs = jest.genMockFromModule('fs');

let mockFiles;

function __setMockFiles(newMockFiles) {
  mockFiles = newMockFiles;
}

function readFileSync() {
  return new Buffer(JSON.stringify(mockFiles || { mockKey: 'mockValue' }));
}

fs.__setMockFiles = __setMockFiles;
fs.readFileSync = readFileSync;

module.exports = fs;
