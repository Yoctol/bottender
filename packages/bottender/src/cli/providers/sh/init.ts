import childProcess from 'child_process';

const init = () => {
  const cp = childProcess.exec('npx create-bottender-app');

  if (cp) {
    if (cp.stdout) {
      cp.stdout.on('data', console.log);
    }
    if (cp.stderr) {
      cp.stderr.on('data', console.log);
    }

    cp.on('exit', (code: number) => {
      process.exit(code);
    });
  }
};

export default init;
