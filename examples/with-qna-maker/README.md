# With QnA Maker

## Install and Run

Download this example or clone [Bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-qna-maker
cd with-qna-maker
npm install
```

Before you run this example, make sure you have got `RESOURCE_NAME`, `KNOWLEDGE_BASE_ID`, and `ENDPOINT_KEY` from [QnA Maker](https://www.qnamaker.ai/) and filled in your `.env` file.

```sh
npm run dev -- --console
```

## Idea of This Example

This example shows how to integrate your bot with [QnA Maker](https://www.qnamaker.ai/).
