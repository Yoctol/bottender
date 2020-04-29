# With GCP Cloud Function

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-gcp-cloud-function
cd with-gcp-cloud-function
```

Install dependencies:

```sh
npm install
```

This is an example that runs on Facebook Messenger Platform. Therefore, you must fill `MESSENGER_APP_ID`, `MESSENGER_APP_SECRET`, `MESSENGER_PAGE_ID`, `MESSENGER_ACCESS_TOKEN`, and `MESSENGER_VERIFY_TOKEN` in your `.env` file.

If you are not familiar with Messenger Bot, you may refer to Bottender's doc, [Messenger Setup](https://bottender.js.org/docs/channel-messenger-setup), to find detailed instructions.

### Deploy on GCP

Next, you must deploy the bot on GCP as a serverless Cloud Function.

However, deploying our serverless bot function manually using the GCP console can be a tedious job. Thus, we can utilize the [Google Cloud SDK](https://cloud.google.com/sdk) to deploy our app.

To install the SDK, we should follow their [installation guide](https://cloud.google.com/sdk/docs/) step by step.

After we intall the SDK and initialize it, we can deploy our app using `gcloud` command.

To deploy our app, we run the command:

```sh
gcloud functions deploy bottender-with-gcp-cloud-function --runtime nodejs8 --trigger-http --entry-point server
```

If we deploy successfully, we should see output like:

```
Deploying function (may take a while - up to 2 minutes)...done.
availableMemoryMb: 256
entryPoint: server
httpsTrigger:
  url: https://xxxxxx.cloudfunctions.net/bottender-with-gcp-cloud-function

...
```

## Set Webhook

To set the webhook, we must go to the Developers Console of the Facebook Messenger Platform and use the endpoints we get to set the webhook. Don't forget to add `webhooks/messenger` at the end of the endpoint string. For example, here we must use `https://xxxxxx.cloudfunctions.net/bottender-with-gcp-cloud-function/webhooks/messenger` as our webhook.

## Idea of This Example

This example is a bot running on [Messenger](https://www.messenger.com/) and deployed on GCP Cloud Function. The bot deployed on a serverless service such as GCP Cloud Function should not store session locally since the serverless service can not maintain the state.
