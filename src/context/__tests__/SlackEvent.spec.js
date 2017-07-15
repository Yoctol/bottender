import SlackEvent from '../SlackEvent';

const appUninstalled = {
  type: 'app_uninstalled',
};

const channelArchive = {
  type: 'channel_archive',
  channel: 'C024BE91L',
  user: 'U024BE7LH',
};

const channelCreated = {
  type: 'channel_created',
  channel: {
    id: 'C024BE91L',
    name: 'fun',
    created: 1360782804,
    creator: 'U024BE7LH',
  },
};

const message = {
  type: 'message',
  channel: 'C2147483705',
  user: 'U2147483697',
  text: 'Hello world',
  ts: '1355517523.000005',
};

it('#rawEvent', () => {
  expect(new SlackEvent(message).rawEvent).toEqual(message);
});

it('#isMessage', () => {
  expect(new SlackEvent(appUninstalled).isMessage).toEqual(false);
  expect(new SlackEvent(channelArchive).isMessage).toEqual(false);
  expect(new SlackEvent(channelCreated).isMessage).toEqual(false);
  expect(new SlackEvent(message).isMessage).toEqual(true);
});

it('#isAppUninstalled', () => {
  expect(new SlackEvent(appUninstalled).isAppUninstalled).toEqual(true);
  expect(new SlackEvent(channelArchive).isAppUninstalled).toEqual(false);
  expect(new SlackEvent(message).isAppUninstalled).toEqual(false);
});
