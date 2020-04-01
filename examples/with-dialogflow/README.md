# With Dialogflow

## Install and Run

Download this example or clone [Bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-dialogflow
cd with-dialogflow
npm install
npm run dev -- --console
```

## Idea of This Example

This example shows how to combine your bot with modern NLU (Natural Language Understanding) technologies. In
this case, we take [Dialogflow](https://dialogflow.com/) as an example. Before you run
this example, make sure you have followed the [Official Setup Guide](https://cloud.google.com/dialogflow/docs/quick/setup) and filled the two values: `GOOGLE_APPLICATION_CREDENTIALS` (the file path of the JSON file that contains your service account key) and `GOOGLE_APPLICATION_PROJECT_ID` (the GCP project ID) in `.env` file.
