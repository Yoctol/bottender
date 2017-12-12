export default {
  line: {
    channelSecret: '__PUT_YOUR_CHANNEL_SECRET_HERE__',
    accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
    richMenus: Array.from(new Array(11), (_, index) => ({
      size: {
        width: 1250,
        height: 1686,
      },
      selected: false,
      name: `Nice richmenu ${index}`,
      chatBarText: 'Tap here',
      areas: [
        {
          bounds: {
            x: index * 5,
            y: index * 5,
            width: 5,
            height: 5,
          },
          action: {
            type: 'postback',
            data: `action=buy&itemid=${index}`,
          },
        },
      ],
    })),
  },
};
