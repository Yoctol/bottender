const mockStatic = jest.genMockFromModule('@yoctol/static');

let mockPushFile;

function __setMockPushFile(newMockFiles) {
  mockPushFile = newMockFiles;
}

function StaticManager() {
  return {
    pushFile: mockPushFile,
  };
}

mockStatic.__setMockPushFile = __setMockPushFile;
mockStatic.StaticManager = StaticManager;

module.exports = mockStatic;
