import fs from 'fs';

import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';
import readdir from 'recursive-readdir';
import fileType from 'file-type';
import readChunk from 'read-chunk';
import inquirer from 'inquirer';

import getConfig from '../../shared/getConfig';
import { error, warn, print, bold } from '../../shared/log';

import help from './help';

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

    const files = await readdir('assets');

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

    for (let i = 0; i < files.length; i++) {
      const imageType = ['jpg', 'png', 'jpeg', 'gif'];
      const videoType = ['avi', 'mp4', 'm4v'];
      const audioType = ['mp3', 'mid', 'm4a', 'wav'];

      let type = 'file';

      const buffer = readChunk.sync(files[i], 0, 4100);
      const { ext } = fileType(buffer);

      if (imageType.includes(ext)) {
        type = 'image';
      } else if (videoType.includes(ext)) {
        type = 'video';
      } else if (audioType.includes(ext)) {
        type = 'audio';
      }

      await client.uploadAttachment(type, fs.createReadStream(files[i])); // eslint-disable-line no-await-in-loop

      print(`uploaded: ${files[i]} as ${type} type`);
    }
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
