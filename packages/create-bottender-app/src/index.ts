import path from 'path';
import { execSync } from 'child_process';

import chalk from 'chalk';
import commander from 'commander';
import envinfo from 'envinfo';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import spawn from 'cross-spawn';
import validateProjectName from 'validate-npm-package-name';

import generateAppEntry from './utils/generateAppEntry';
import generateConfig from './utils/generateConfig';
import { Answer, Platform, Session } from './types';
import { bold, error, print } from './shared/log';

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
);

// These files should be allowed to remain on a failed install,
// but then silently removed during the next create.
const errorLogFilePatterns = [
  'npm-debug.log',
  'yarn-error.log',
  'yarn-debug.log',
];

let projectName: string;

const program = new commander.Command(pkg.name)
  .version(pkg.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => {
    projectName = name;
  })
  .option('--info', 'print environment debug info')
  .option('--use-npm')
  .option('--typescript')
  .allowUnknownOption()
  .parse(process.argv);

if (program.info) {
  print(bold('\nEnvironment Info:'));
  envinfo
    .run(
      {
        System: ['OS', 'CPU'],
        Binaries: ['Node', 'npm', 'Yarn'],
        Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
        npmPackages: ['bottender'],
        npmGlobalPackages: ['create-bottender-app'],
      },
      {
        duplicates: true,
        showNotFound: true,
      }
    )
    .then(print);
}

const getQuestions = (): Record<string, any>[] => [
  ...(projectName
    ? []
    : [
        {
          name: 'name',
          message: "What's your project name?",
          type: 'input',
        },
      ]),
  {
    name: 'platforms',
    message: 'What platform of bot do you want to create?',
    type: 'checkbox',
    choices: ['messenger', 'line', 'slack', 'telegram', 'viber'],
  },
  {
    name: 'session',
    message: 'Where do you want to store session?',
    type: 'list',
    choices: ['memory', 'file', 'redis', 'mongo'],
  },
];

const shouldUseYarn = (): boolean => {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

const isSafeToCreateProjectIn = (root: string, name: string): boolean => {
  const validFiles = [
    '.DS_Store',
    'Thumbs.db',
    '.git',
    '.gitignore',
    '.idea',
    'README.md',
    'LICENSE',
    '.hg',
    '.hgignore',
    '.hgcheck',
    '.npmignore',
    'mkdocs.yml',
    'docs',
    '.travis.yml',
    '.gitlab-ci.yml',
    '.gitattributes',
  ];
  print('');

  const conflicts = fs
    .readdirSync(root)
    .filter(file => !validFiles.includes(file))
    // IntelliJ IDEA creates module files before CRA is launched
    .filter(file => !/\.iml$/.test(file))
    // Don't treat log files from previous installation as conflicts
    .filter(
      file => !errorLogFilePatterns.some(pattern => file.indexOf(pattern) === 0)
    );

  if (conflicts.length > 0) {
    error(
      `The directory ${chalk.green(name)} contains files that could conflict:`
    );
    error();
    for (const file of conflicts) {
      error(`  ${file}`);
    }
    error();
    error(
      'Either try using a new directory name, or remove the files listed above.'
    );

    return false;
  }

  // Remove any remnant files from a previous installation
  const currentFiles = fs.readdirSync(path.join(root));
  currentFiles.forEach(file => {
    errorLogFilePatterns.forEach(errorLogFilePattern => {
      // This will catch `(npm-debug|yarn-error|yarn-debug).log*` files
      if (file.indexOf(errorLogFilePattern) === 0) {
        fs.removeSync(path.join(root, file));
      }
    });
  });
  return true;
};

const printValidationResults = (results: string[]): void => {
  if (typeof results !== 'undefined') {
    results.forEach(Error => {
      error(`  *  ${Error}`);
    });
  }
};

const checkBotName = (botName: string): void => {
  const validationResult = validateProjectName(botName);

  if (!validationResult.validForNewPackages) {
    error(
      `Could not create a project called ${chalk.green(
        `"${botName}"`
      )} because of npm naming restrictions:`
    );
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);

    process.exit(1);
  }
};

const install = (
  useYarn: boolean,
  allDependencies: { dependencies: string[]; devDependencies: string[] }
): Promise<void> =>
  new Promise((resolve, reject): void => {
    let command: string;
    let args: string[] = [];
    if (useYarn) {
      command = 'yarnpkg';
      args = args.concat(
        ['add', '--exact', '--silent'],
        allDependencies.dependencies
      );
      spawn.sync(command, args, { stdio: 'inherit' });
      args = [];
      args = args.concat(
        ['add', '--dev', '--silent'],
        allDependencies.devDependencies
      );
    } else {
      command = 'npm';
      args = args.concat(
        ['install', '--save', '--save-exact', '--loglevel', 'error'],
        allDependencies.dependencies
      );
      spawn.sync(command, args, { stdio: 'inherit' });
      args = [];
      args = args.concat(
        ['install', '--dev', '--save-exact', '--loglevel', 'error'],
        allDependencies.devDependencies
      );
    }

    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', code => {
      if (code !== 0) {
        const err = new Error('install failed');
        (err as any).command = `${command} ${args.join(' ')}`;
        reject(err);
        return;
      }
      resolve();
    });
  });

const run = async (
  root: string,
  name: string,
  useYarn: boolean,
  useTypescript: boolean,
  platforms: Platform[],
  session: Session
): Promise<void> => {
  try {
    const allDependencies = {
      dependencies: ['bottender'],
      devDependencies: [
        'jest',
        'eslint',
        'prettier',
        'eslint-plugin-prettier',
        'eslint-config-prettier',
        ...(useTypescript
          ? [
              '@types/jest',
              'ts-jest',
              'typescript',
              '@typescript-eslint/parser',
              '@typescript-eslint/eslint-plugin',
            ]
          : []),
      ],
    };
    print('Installing packages... This might take a couple of minutes.');
    print('');

    await install(useYarn, allDependencies);

    const botConfig = generateConfig(session, platforms);
    fs.writeFileSync(path.join(root, 'bottender.config.js'), botConfig);

    fs.copySync(
      path.resolve(
        __dirname,
        `../${useTypescript ? 'template-typescript' : 'template'}`
      ),
      root
    );
    const appEntry = generateAppEntry(useTypescript, platforms);
    fs.writeFileSync(
      path.join(root, 'src', useTypescript ? 'index.ts' : 'index.js'),
      appEntry
    );
    fs.copySync(path.join(root, '.env.example'), path.join(root, '.env'));
    fs.copySync(path.join(root, 'gitignore'), path.join(root, '.gitignore'));
    fs.removeSync(path.join(root, 'gitignore'));
  } catch (reason) {
    print('');
    print('Aborting installation.');
    if (reason.command) {
      error(`  ${reason.command} has failed.`);
    } else {
      error('Unexpected error. Please report it as a bug:');
      print(reason);
    }
    print('');

    const knownGeneratedFiles = [
      'bottender.config.js',
      'package.json',
      'npm-debug.log',
      'yarn-error.log',
      'yarn-debug.log',
      'yarn.lock',
      'node_modules',
    ];
    const currentFiles = fs.readdirSync(path.join(root));
    currentFiles.forEach(file => {
      knownGeneratedFiles.forEach(fileToMatch => {
        if (
          (fileToMatch.match(/.log/g) && file.indexOf(fileToMatch) === 0) ||
          file === fileToMatch
        ) {
          print(`Deleting generated file... ${file}`);
          fs.removeSync(path.join(root, file));
        }
      });
    });
    const remainingFiles = fs.readdirSync(path.join(root));
    if (!remainingFiles.length) {
      print(`Deleting ${name} / from ${path.resolve(root, '..')}`);
      process.chdir(path.resolve(root, '..'));
      fs.removeSync(path.join(root));
    }
    print('Done.');
    return process.exit(1);
  }
};

const createBot = async (
  name: string,
  root: string,
  useYarn: boolean,
  useTypescript: boolean,
  platforms: Platform[],
  session: Session
): Promise<void> => {
  checkBotName(name);

  fs.ensureDirSync(name);
  if (!isSafeToCreateProjectIn(root, name)) {
    return process.exit(1);
  }

  print(`Creating a new Bottender bot at ${chalk.green(root)}.`);
  print();

  const packageJson = {
    name,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'bottender dev',
      lint: `eslint . ${useTypescript ? '--ext=js,ts' : ''}`,
      start: `${useTypescript ? 'tsc && ' : ''}bottender start`,
      test: 'jest',
    },
  };

  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  process.chdir(root);

  await run(root, name, useYarn, useTypescript, platforms, session);
};

const init = async (): Promise<void> => {
  try {
    const answer = (await inquirer.prompt(getQuestions())) as Answer;

    const name = projectName || answer.name;

    if (typeof name === 'undefined' || name === '') {
      print('');
      error('Please specify the project name');
      print('For example:');
      print("  ? What's your project name? my-bot");
      print('');
      print(`Run ${chalk.cyan('bottender --help')} to see all options.`);
      return process.exit(1);
    }

    const useYarn = program.useNpm ? false : shouldUseYarn();
    const root = path.resolve(name);

    await createBot(
      name,
      root,
      useYarn,
      program.typescript,
      answer.platforms,
      answer.session
    );

    const command = useYarn ? 'yarn' : 'npm run';

    print('Success!');
    print(`Created ${name} at ${root}`);
    print(
      `Please make sure you have edited ${chalk.green(
        'bottender.config.js'
      )} before running the bot.`
    );
    print('');
    print('Inside that directory, you can run several commands:');
    print('');
    print(`  ${command} start`);
    print('    Starts the production server.');
    print('');
    print(`  ${command} dev`);
    print('    Starts the development server.');
    print('');
    print(`  ${command} lint`);
    print('    Checks the code with the linter.');
    print('');
    print('We suggest that you begin by typing:');
    print('');
    print(`  cd ${name}`);
    print(`  ${command} dev`);
    print('');
    print('Happy hacking!');
  } catch (err) {
    error('init error with');
    if (err.response) {
      error(`status: ${err.response.status}`);
    } else {
      error(`message: ${err.message}`);
    }
    return process.exit(1);
  }
};

export default init;
