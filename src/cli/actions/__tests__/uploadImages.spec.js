import path from 'path';

import uploadImages from '../uploadImages';

jest.mock('fs');
jest.mock('glob');
jest.mock('jsonfile');
jest.mock('hasha');
jest.mock('@yoctol/static');
jest.mock('delay');
jest.mock('file-type');

const fs = require('fs');

const glob = require('glob');
const jsonfile = require('jsonfile');
const hasha = require('hasha');
const yoctolStatic = require('@yoctol/static');
const fileType = require('file-type');

const _log = console.log;
const folderPath = '/tmp';
const filenames = ['cph.jpg', 'chentsulin.png'];

beforeEach(() => {
  process._exit = process.exit;
  process.exit = jest.fn();

  fs.existsSync = jest.fn(() => true);
  glob.sync = jest.fn(() => filenames);
  jsonfile.writeFileSync = jest.fn();
  jsonfile.readFileSync = jest.fn(() => ({}));
  console.log = jest.fn();
});

afterEach(() => {
  process.exit = process._exit;
  console.log = _log;
  jest.resetAllMocks();
});

it('be defined', () => {
  expect(uploadImages).toBeDefined();
});

describe('folder', () => {
  it('call process exit when folderPath is not existed', async () => {
    fs.existsSync = jest.fn(() => false);
    await uploadImages({ folderPath });
    expect(process.exit).toBeCalledWith(1);
  });

  it('call process exit when no image found in folderPath', async () => {
    glob.sync = jest.fn(() => []);
    await uploadImages({ folderPath });
    expect(process.exit).toBeCalledWith(1);
  });
});

describe('uploaded-images.json', () => {
  it('create uploaded-images.json when file not existed', async () => {
    fs.existsSync = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    await uploadImages({ folderPath });

    expect(jsonfile.writeFileSync.mock.calls[0]).toEqual([
      path.resolve('uploaded-images.json'),
      {},
    ]);
  });

  it('create uploaded-images.json in output folder when file not existed', async () => {
    const outputPath = 'fakePath';
    fs.existsSync = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    await uploadImages({ folderPath, outputPath });

    expect(jsonfile.writeFileSync.mock.calls[0]).toEqual([
      path.resolve(outputPath, 'uploaded-images.json'),
      {},
    ]);
  });
});

describe('#staticManager', () => {
  it('call pushFile when checksum is different', async () => {
    const mockPushFile = jest.fn();

    hasha.fromFileSync = jest
      .fn()
      .mockReturnValueOnce('qazwsx')
      .mockReturnValueOnce('wsxedc');
    yoctolStatic.__setMockPushFile(mockPushFile);
    fileType.mockReturnValue({
      mime: 'image/png',
    });
    await uploadImages({ folderPath });
    expect(mockPushFile).toHaveBeenCalledTimes(2);
  });

  it('not call pushFile when checksum is same', async () => {
    const aChecksum = 'qazwsx';
    const bChecksum = 'wsxedc';
    const mockPushFile = jest.fn();

    hasha.fromFileSync = jest
      .fn()
      .mockReturnValueOnce('qazwsx')
      .mockReturnValueOnce('wsxedc');
    jsonfile.readFileSync = jest.fn(() => ({
      'cph.jpg': {
        checksum: aChecksum,
      },
      'chentsulin.png': {
        checksum: bChecksum,
      },
    }));
    yoctolStatic.__setMockPushFile(mockPushFile);

    await uploadImages({ folderPath });

    expect(mockPushFile).not.toBeCalled();
  });
});
