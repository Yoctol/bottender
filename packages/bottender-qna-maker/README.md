# @bottender/qna-maker

[QnA Maker](https://www.qnamaker.ai/) integration for Bottender.

## Installation

You can install it with npm:

```sh
npm install @bottender/qna-maker
```

or Yarn:

```sh
yarn add @bottender/qna-maker
```

## Usage

```js
const qnaMaker = require('@bottender/qna-maker');

async function Unknown(context) {
  await context.sendText('Sorry, I don’t know what you say.');
}

const QnaMaker = qnaMaker({
  resourceName: 'RESOURCE_NAME',
  knowledgeBaseId: 'KNOWLEDGE_BASE_ID',
  endpointKey: 'ENDPOINT_KEY',
  scoreThreshold: 70,
});

module.exports = async function App() {
  return chain([
    QnaMaker, //
    Unknown,
  ]);
};
```

## Reference

### resourceName

Name of Azure Resource.

Type: `string`
Required.

### knowledgeBaseId

Knowledgebase id.

Type: `string`
Required.

### endpointKey

API key.

Type: `string`
Required.

### isTest

Query against the test index.

Type: `boolean`
Optional.

### qnaId

Exact qnaId to fetch from the knowledgebase, this field takes priority over question.

Type: `string`
Optional.

### scoreThreshold

Threshold for answers returned based on score.

Type: `number`
Optional.

### strictFilters

Find only answers that contain these metadata.

Type: `MetadataDTO[]`
Optional.

## License

MIT © [Yoctol](https://github.com/Yoctol/bottender)
