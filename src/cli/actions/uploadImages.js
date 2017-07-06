/* eslint-disable no-await-in-loop, consistent-return */
import fs from 'fs';
import path from 'path';

import shortid from 'shortid';
import glob from 'glob';
import isImage from 'is-image';
import jsonfile from 'jsonfile';
import hasha from 'hasha';
import delay from 'delay';
import fileType from 'file-type';
import { StaticManager } from '@yoctol/static';

import { print, error, bold } from '../shared/log';

export default (async function uploadImages({
  folderPath,
  outputPath,
  container = 'cli-uploader',
  staticManagerPath = 'http://localhost:3000',
}) {
  if (!fs.existsSync(folderPath)) {
    error(`image folder path not found: ${bold(folderPath)}`);
    return process.exit(1);
  }
  print(`start to upload images in ${bold(folderPath)}`);

  const filenames = glob.sync(`${folderPath}/*`).filter(isImage);

  if (!filenames.length) {
    error('No images found!');
    return process.exit(1);
  }

  const manager = new StaticManager(staticManagerPath);

  print('Your images:');
  print(filenames.join('\n'));

  const pathOfMappingFile = outputPath
    ? path.resolve(outputPath, 'uploaded-images.json')
    : path.resolve('uploaded-images.json');

  if (!fs.existsSync(pathOfMappingFile)) {
    jsonfile.writeFileSync(pathOfMappingFile, {});

    print(`initialize ${bold('uploaded-images.json')} for you`);
  }

  for (let i = 0; i < filenames.length; i++) {
    const uploadedImages = jsonfile.readFileSync(pathOfMappingFile);

    const name = filenames[i];
    const basename = path.basename(name);
    const imageMeta = uploadedImages[basename];

    const checksum = hasha.fromFileSync(name);
    if (!imageMeta || checksum !== imageMeta.checksum) {
      // overwrite
      const file = fs.readFileSync(name);
      try {
        const data = await manager.pushFile(
          container,
          shortid.generate(),
          file,
          {
            contentType: fileType(file).mime,
          }
        );
        jsonfile.writeFileSync(
          pathOfMappingFile,
          {
            ...uploadedImages,
            [basename]: {
              ...data,
              checksum,
            },
          },
          { spaces: 2 }
        );
        print(`${basename} is successfully uploaded`);

        await delay(200);
      } catch (e) {
        error(e);
      }
    }
  }
});
