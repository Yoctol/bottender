import fs from 'fs';
import path from 'path';

import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';
import readdir from 'recursive-readdir';
import fileType from 'file-type';
import readChunk from 'read-chunk';
import inquirer from 'inquirer';
import jsonfile from 'jsonfile';
import hasha from 'hasha';

import getConfig from '../../shared/getConfig';
import { error, warn, print, bold, log } from '../../shared/log';

import help from './help';

const getFileType = file => {
  const imageType = ['jpg', 'png', 'jpeg', 'gif'];
  const videoType = ['avi', 'mp4', 'm4v'];
  const audioType = ['mp3', 'mid', 'm4a', 'wav'];

  let type = 'file';

  const buffer = readChunk.sync(file, 0, 4100);

  const typeResult = fileType(buffer);
  if (typeResult) {
    const { ext } = typeResult;
    if (imageType.includes(ext)) {
      type = 'image';
    } else if (videoType.includes(ext)) {
      type = 'video';
    } else if (audioType.includes(ext)) {
      type = 'audio';
    }
  }

  return type;
};

const logUploadInfo = uploadInfo => {
  log('==================== Upload status ===================');
  log(
    `Total successfully uploaded ${uploadInfo.success.length} ${
      uploadInfo.success.length <= 1 ? 'file' : 'files'
    }, failed ${uploadInfo.error.length} ${
      uploadInfo.error.length <= 1 ? 'file' : 'files'
    }, unchanged ${uploadInfo.unchanged.length} ${
      uploadInfo.unchanged.length <= 1 ? 'file' : 'files'
    }.`
  );
  for (let i = 0; i < uploadInfo.error.length; i += 1) {
    error(`Failed file: ${uploadInfo.error[i]}`);
  }
};

export async function uploadAttachment() {
  try {
    warn(
      `${bold(
        'Attachments upload'
      )} is under heavy development. API may change between any versions.`
    );

    const config = getConfig('bottender.config.js', 'messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    const files = await readdir('assets'); // FIXME: filter ignore file

    files.forEach(print);

    const promptResult = await inquirer.prompt([
      {
        type: 'confirm',
        message: 'Is it correct for uploading?',
        name: 'confirm',
      },
    ]);

    if (!promptResult.confirm) {
      print('bye');
      process.exit(0);
    }

    const pathOfMappingFile = path.resolve('bottender-lock.json'); // TODO: output path?

    if (!fs.existsSync(pathOfMappingFile)) {
      jsonfile.writeFileSync(pathOfMappingFile, {});

      print(`Initialize ${bold('bottender-lock.json')} for you`);
    }

    const uploadInfo = {
      success: [],
      error: [],
      unchanged: [],
    };

    print(`Trying to upload ${files.length} files...`);

    for (let i = 0; i < files.length; i++) {
      const _uploadedFiles = jsonfile.readFileSync(pathOfMappingFile);
      const uploadedFiles = _uploadedFiles.messenger || {};

      const name = files[i];
      const basename = path.basename(name);

      const fileMeta = uploadedFiles[basename];
      const checksum = hasha.fromFileSync(name);

      let pageId;

      if (!fileMeta || checksum !== fileMeta.checksum) {
        try {
          if (!pageId) {
            // eslint-disable-next-line no-await-in-loop
            const pageInfo = await client.getPageInfo();
            pageId = pageInfo.id;
          }
          // eslint-disable-next-line no-await-in-loop
          const data = await client.uploadAttachment(
            getFileType(name),
            fs.createReadStream(name)
          );
          jsonfile.writeFileSync(
            pathOfMappingFile,
            {
              ..._uploadedFiles,
              messenger: {
                ...uploadedFiles,
                [basename]: {
                  ...data,
                  pageId,
                  uploaded_at: Date.now(),
                  checksum,
                },
              },
            },
            { spaces: 2 }
          );
          print(`Successfully uploaded: ${name}`);
          uploadInfo.success.push(name);
        } catch (e) {
          error(e);
          uploadInfo.error.push(name);
        }
      } else {
        uploadInfo.unchanged.push(name);
      }
    }

    logUploadInfo(uploadInfo);
  } catch (err) {
    error(err.message);
    return process.exit(1);
  }
}

export default async function main(ctx) {
  const subcommand = ctx.argv._[2];
  switch (subcommand) {
    case 'upload':
      await uploadAttachment();
      break;
    default:
      error(`Please specify a valid subcommand: upload`);
      help();
  }
}
