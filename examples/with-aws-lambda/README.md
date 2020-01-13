# With AWS Lambda

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-aws-lambda
cd with-aws-lambda
```

Install dependencies:

```sh
npm install
```

This is an example that runs on Facebook Messenger Platform. Therefore, you have to put `appId`, `appSecret`, `pageId`, `accessToken` and `verifyToken` into the `.env` file.

If you are not familiar with Messenger Bot, you may refer to Bottender's doc, [Setup Messenger](https://bottender.js.org/docs/channel-messenger-setup), to find detailed instructions.

### Deploy on AWS

Next, you have to deploy the bot on AWS Lambda as a serverless function and use AWS API Gateway as the endpoint for Webhook.

However, deploying our serverless bot function manually using an API Gateway and AWS Lambda can be a tedious job. Thus, we can utilize a tool named `Serverless Framework` to deploy our app.

We first use npm to install the tool globally by running the command:

```sh
npm install -g serverless
```

After finishing the installation, we have to set the AWS access and secret keys by the command:

```sh
serverless config credentials --provider aws --key ACCESS_KEY ?secret SECRET_KEY
```

Finally, we can easily deploy our app using the command:

```sh
serverless deploy
```

This command will deploy our app on AWS Lambda and API Gateway using the `serverless.yml` file. It will take some time to complete the deployment. If you deploy successfully, you should see output like:

```
endpoints:
  ANY - https://xxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/
  ANY - https://xxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/{proxy+}
```

## Set Webhook

To set the webhook, we have to go to the Developers Console of the Facebook Messenger Platform and use the endpoints we get to set the webhook. Don't forget to add `webhooks/messenger` at the end of the endpoint string. For example, here we have to use `https://xxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/webhooks/messenger` as our webhook.

## Idea of this Example

This example is a simple bot running on [Messenger](https://www.messenger.com/) and deployed on AWS Lambda and API Gateway. The bot deployed on a serverless service such as AWS Lambda should not store session locally since the serverless service can not maintain the state.
