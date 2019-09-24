const fs = jest.genMockFromModule('fs') as any;

let mockFiles;

function __setMockFiles(newMockFiles) {
  mockFiles = newMockFiles;
}

function readFileSync() {
  return JSON.stringify(mockFiles || { mockKey: 'mockValue' });
}

fs.__setMockFiles = __setMockFiles;
fs.readFileSync = readFileSync;

module.exports = fs;
