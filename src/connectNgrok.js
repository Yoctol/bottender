import ngrok from 'ngrok';

const connectNgrok = (port, ngrokHandler) => {
  if (typeof port === 'number') {
    ngrok.connect(port, ngrokHandler);
  } else {
    ngrok.connect(ngrokHandler);
  }
};

export default connectNgrok;
