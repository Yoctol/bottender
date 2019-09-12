import childProcess from 'child_process';

const init = () => {
  const cp = childProcess.exec('npx create-bottender-app');

  cp.stdout.on('data', console.log);
  cp.stderr.on('data', console.log);

  cp.on('exit', code => {
    process.exit(code);
  });
};

export default init;
