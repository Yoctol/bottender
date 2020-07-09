import nock from 'nock';

import FacebookClient from '../FacebookClient';

nock.disableNetConnect();
nock.enableNetConnect('127.0.0.1');

afterEach(() => nock.cleanAll());

const ACCESS_TOKEN = '1234567890';

describe('#getPageInsights', () => {
  it('should support day period', async () => {
    const client = new FacebookClient({
      accessToken: ACCESS_TOKEN,
    });

    const PAGE_ID = 'PAGE_ID';

    let receviedQuery;
    nock('https://graph.facebook.com/v6.0')
      .get('/me/insights')
      .query(query => {
        receviedQuery = query;
        return true;
      })
      .reply(200, {
        data: [
          {
            name: 'page_total_actions',
            period: 'day',
            values: [
              {
                value: 0,
                end_time: '2020-07-05T07:00:00+0000',
              },
              {
                value: 0,
                end_time: '2020-07-06T07:00:00+0000',
              },
            ],
            title: 'Daily Total: total action count per Page',
            description:
              "Daily: The number of clicks on your Page's contact info and call-to-action button.",
            id: `${PAGE_ID}/insights/page_total_actions/day`,
          },
          {
            name: 'page_engaged_users',
            period: 'day',
            values: [
              {
                value: 0,
                end_time: '2020-07-05T07:00:00+0000',
              },
              {
                value: 0,
                end_time: '2020-07-06T07:00:00+0000',
              },
            ],
            title: 'Daily Page Engaged Users',
            description:
              'Daily: The number of people who engaged with your Page. Engagement includes any click or story created. (Unique Users)',
            id: `${PAGE_ID}/insights/page_engaged_users/day`,
          },
        ],
        paging: {
          previous: `https://graph.facebook.com/v6.0/${PAGE_ID}/insights?access_token=${ACCESS_TOKEN}&pretty=0&metric=page_total_actions%2Cpage_engaged_users&period=day&since=1593673200&until=1593846000`,
          next: `https://graph.facebook.com/v6.0/${PAGE_ID}/insights?access_token=${ACCESS_TOKEN}&pretty=0&metric=page_total_actions%2Cpage_engaged_users&period=day&since=1594018800&until=1594191600`,
        },
      });

    const res = await client.getPageInsights({
      metric: ['page_total_actions', 'page_engaged_users'],
      period: 'day',
    });

    expect(receviedQuery).toEqual({
      access_token: ACCESS_TOKEN,
      metric: 'page_total_actions,page_engaged_users',
      period: 'day',
    });
    expect(res).toEqual([
      {
        description:
          "Daily: The number of clicks on your Page's contact info and call-to-action button.",
        id: 'PAGE_ID/insights/page_total_actions/day',
        name: 'page_total_actions',
        period: 'day',
        title: 'Daily Total: total action count per Page',
        values: [
          { endTime: '2020-07-05T07:00:00+0000', value: 0 },
          { endTime: '2020-07-06T07:00:00+0000', value: 0 },
        ],
      },
      {
        description:
          'Daily: The number of people who engaged with your Page. Engagement includes any click or story created. (Unique Users)',
        id: 'PAGE_ID/insights/page_engaged_users/day',
        name: 'page_engaged_users',
        period: 'day',
        title: 'Daily Page Engaged Users',
        values: [
          { endTime: '2020-07-05T07:00:00+0000', value: 0 },
          { endTime: '2020-07-06T07:00:00+0000', value: 0 },
        ],
      },
    ]);
  });

  it('should support day period (non-numeric value)', async () => {
    const client = new FacebookClient({
      accessToken: ACCESS_TOKEN,
    });

    const PAGE_ID = 'PAGE_ID';

    let receviedQuery;
    nock('https://graph.facebook.com/v6.0')
      .get('/me/insights')
      .query(query => {
        receviedQuery = query;
        return true;
      })
      .reply(200, {
        data: [
          {
            name: 'page_tab_views_login_top_unique',
            period: 'day',
            values: [
              {
                value: {
                  tab_home: 3,
                  about: 2,
                  profile_home: 1,
                  videos: 3,
                  posts: 6,
                  photos: 2,
                  home: 34,
                },
                end_time: '2020-07-06T07:00:00+0000',
              },
              {
                value: {
                  tab_home: 3,
                  reviews: 1,
                  about: 2,
                  profile_home: 2,
                  videos: 2,
                  community: 1,
                  posts: 5,
                  photos: 2,
                  home: 68,
                },
                end_time: '2020-07-07T07:00:00+0000',
              },
            ],
            title: 'Daily Logged-in Tab Views',
            description:
              'Daily: Tabs on your Page that were viewed when logged-in users visited your Page. (Unique Users)',
            id: `${PAGE_ID}/insights/page_tab_views_login_top_unique/day`,
          },
          {
            name: 'page_tab_views_login_top',
            period: 'day',
            values: [
              {
                value: {
                  tab_home: 4,
                  about: 2,
                  profile_home: 1,
                  videos: 3,
                  posts: 8,
                  photos: 2,
                  home: 54,
                },
                end_time: '2020-07-06T07:00:00+0000',
              },
              {
                value: {
                  tab_home: 7,
                  reviews: 1,
                  about: 2,
                  profile_home: 2,
                  videos: 2,
                  community: 1,
                  posts: 5,
                  photos: 2,
                  home: 110,
                },
                end_time: '2020-07-07T07:00:00+0000',
              },
            ],
            title: 'Daily Logged-in Tab Views',
            description:
              'Daily: Tabs on your Page that were viewed when logged-in users visited your Page. (Total Count)',
            id: `${PAGE_ID}/insights/page_tab_views_login_top/day`,
          },
          {
            name: 'page_tab_views_logout_top',
            period: 'day',
            values: [
              {
                value: {
                  profile_home: 1,
                  posts: 1,
                  home: 4,
                },
                end_time: '2020-07-06T07:00:00+0000',
              },
              {
                value: {
                  profile_videos: 1,
                  profile_posts: 1,
                  profile_home: 3,
                  about: 1,
                  photos: 2,
                  posts: 1,
                  home: 3,
                  profile_photos: 1,
                },
                end_time: '2020-07-07T07:00:00+0000',
              },
            ],
            title: 'Daily Logged-out Page Views Per Tab',
            description:
              'Daily: Page views by tab from users not logged into Facebook (Total Count)',
            id: `${PAGE_ID}/insights/page_tab_views_logout_top/day`,
          },
          {
            name: 'page_negative_feedback_by_type',
            period: 'day',
            values: [
              {
                value: {
                  hide_clicks: 0,
                  hide_all_clicks: 0,
                  report_spam_clicks: 0,
                  unlike_page_clicks: 0,
                },
                end_time: '2020-07-06T07:00:00+0000',
              },
              {
                value: {
                  hide_clicks: 0,
                  hide_all_clicks: 0,
                  report_spam_clicks: 0,
                  unlike_page_clicks: 0,
                },
                end_time: '2020-07-07T07:00:00+0000',
              },
            ],
            title: 'Daily Negative Feedback From Users',
            description:
              'Daily: The number of times people have given negative feedback to your Page, by type. (Total Count)',
            id: `${PAGE_ID}/insights/page_negative_feedback_by_type/day`,
          },
          {
            name: 'page_positive_feedback_by_type',
            period: 'day',
            values: [
              {
                value: {
                  link: 10,
                  like: 25,
                  comment: 19,
                  other: 6,
                },
                end_time: '2020-07-06T07:00:00+0000',
              },
              {
                value: {
                  link: 6,
                  like: 43,
                  comment: 25,
                  other: 11,
                },
                end_time: '2020-07-07T07:00:00+0000',
              },
            ],
            title: 'Daily Positive Feedback From Users',
            description:
              'Daily: The number of times people have given positive feedback to your Page, by type. (Total Count)',
            id: `${PAGE_ID}/insights/page_positive_feedback_by_type/day`,
          },
          {
            name: 'page_fans_by_like_source',
            period: 'day',
            values: [
              {
                value: {
                  Other: 1,
                  'Your Page': 5,
                },
                end_time: '2020-07-06T07:00:00+0000',
              },
              {
                value: {
                  Other: 1,
                  'Your Page': 10,
                },
                end_time: '2020-07-07T07:00:00+0000',
              },
            ],
            title: 'Daily Like Sources',
            description:
              'Daily: This is a breakdown of the number of Page likes from the most common places where people can like your Page. (Total Count)',
            id: `${PAGE_ID}/insights/page_fans_by_like_source/day`,
          },
          {
            name: 'page_fans_by_like_source_unique',
            period: 'day',
            values: [
              {
                value: {
                  Other: 1,
                  'Your Page': 5,
                  'News Feed': 0,
                  'Page Suggestions': 0,
                  'Restored Likes from Reactivated Accounts': 0,
                  Search: 0,
                },
                end_time: '2020-07-06T07:00:00+0000',
              },
              {
                value: {
                  Other: 1,
                  'Your Page': 10,
                  'News Feed': 0,
                  'Page Suggestions': 0,
                  'Restored Likes from Reactivated Accounts': 0,
                  Search: 0,
                },
                end_time: '2020-07-07T07:00:00+0000',
              },
            ],
            title: 'Daily Like Sources',
            description:
              'Daily: The number of people who liked your Page, broken down by the most common places where people can like your Page. (Unique Users)',
            id: `${PAGE_ID}/insights/page_fans_by_like_source_unique/day`,
          },
          {
            name: 'page_fans_by_unlike_source_unique',
            period: 'day',
            values: [
              {
                value: {},
                end_time: '2020-07-06T07:00:00+0000',
              },
              {
                value: {
                  Other: 1,
                  'Suspicious Account Removals': 1,
                  'Deactivated or Memorialized Account Removals': 0,
                  'Unlikes from Page, Posts, or News Feed': 0,
                  'Unlikes from Search': 0,
                },
                end_time: '2020-07-07T07:00:00+0000',
              },
            ],
            title: 'Daily Unlike Sources',
            description:
              'Daily: The number of people who unliked your Page, broken down by the most common places where people can unlike your Page. (Unique Users)',
            id: `${PAGE_ID}/insights/page_fans_by_unlike_source_unique/day`,
          },
          {
            name: 'page_fans_by_unlike_source',
            period: 'day',
            values: [
              {
                value: {},
                end_time: '2020-07-06T07:00:00+0000',
              },
              {
                value: {
                  Other: 1,
                  'Suspicious Account Removals': 1,
                  'Deactivated or Memorialized Account Removals': 0,
                  'Unlikes from Page, Posts, or News Feed': 0,
                  'Unlikes from Search': 0,
                },
                end_time: '2020-07-07T07:00:00+0000',
              },
            ],
            title: 'Daily Unlike Sources',
            description:
              'Daily: This is a breakdown of the number of Page unlikes from the most common places where people can unlike your Page. (Total Count)',
            id: `${PAGE_ID}/insights/page_fans_by_unlike_source/day`,
          },
          {
            name: 'page_content_activity_by_action_type_unique',
            period: 'day',
            values: [
              {
                value: {
                  'page post': 9,
                  fan: 6,
                  other: 30,
                },
                end_time: '2020-07-06T07:00:00+0000',
              },
              {
                value: {
                  'page post': 6,
                  fan: 11,
                  other: 53,
                },
                end_time: '2020-07-07T07:00:00+0000',
              },
            ],
            title: 'Daily Talking About This By Story Type',
            description:
              'Daily: The number of people talking about your Page, by story type. (Unique Users)',
            id: `${PAGE_ID}/insights/page_content_activity_by_action_type_unique/day`,
          },
          {
            name: 'page_content_activity_by_action_type',
            period: 'day',
            values: [
              {
                value: {
                  'page post': 10,
                  other: 44,
                  fan: 6,
                },
                end_time: '2020-07-06T07:00:00+0000',
              },
              {
                value: {
                  other: 68,
                  fan: 11,
                  'page post': 6,
                },
                end_time: '2020-07-07T07:00:00+0000',
              },
            ],
            title: 'Daily Page Stories By Story Type',
            description:
              'Daily: The number of stories about your Page by story type. (Total Count)',
            id: `${PAGE_ID}/insights/page_content_activity_by_action_type/day`,
          },
        ],
        paging: {
          previous: `https://graph.facebook.com/v6.0/${PAGE_ID}/insights?access_token=${ACCESS_TOKEN}&pretty=0&metric=page_total_actions%2Cpage_engaged_users&period=day&since=1593673200&until=1593846000`,
          next: `https://graph.facebook.com/v6.0/${PAGE_ID}/insights?access_token=${ACCESS_TOKEN}&pretty=0&metric=page_total_actions%2Cpage_engaged_users&period=day&since=1594018800&until=1594191600`,
        },
      });

    const res = await client.getPageInsights({
      metric: [
        'page_tab_views_login_top_unique',
        'page_tab_views_login_top',
        'page_tab_views_logout_top',
        'page_negative_feedback_by_type',
        'page_positive_feedback_by_type',
        'page_fans_by_like_source_unique',
        'page_fans_by_like_source',
        'page_fans_by_unlike_source_unique',
        'page_fans_by_unlike_source',
        'page_content_activity_by_action_type_unique',
        'page_content_activity_by_action_type',
      ],
      period: 'day',
    });

    expect(receviedQuery).toEqual({
      access_token: ACCESS_TOKEN,
      metric:
        'page_tab_views_login_top_unique,page_tab_views_login_top,page_tab_views_logout_top,page_negative_feedback_by_type,page_positive_feedback_by_type,page_fans_by_like_source_unique,page_fans_by_like_source,page_fans_by_unlike_source_unique,page_fans_by_unlike_source,page_content_activity_by_action_type_unique,page_content_activity_by_action_type',
      period: 'day',
    });
    expect(res).toEqual([
      {
        description:
          'Daily: Tabs on your Page that were viewed when logged-in users visited your Page. (Unique Users)',
        id: 'PAGE_ID/insights/page_tab_views_login_top_unique/day',
        name: 'page_tab_views_login_top_unique',
        period: 'day',
        title: 'Daily Logged-in Tab Views',
        values: [
          {
            endTime: '2020-07-06T07:00:00+0000',
            value: {
              about: 2,
              home: 34,
              photos: 2,
              posts: 6,
              profileHome: 1,
              tabHome: 3,
              videos: 3,
            },
          },
          {
            endTime: '2020-07-07T07:00:00+0000',
            value: {
              about: 2,
              community: 1,
              home: 68,
              photos: 2,
              posts: 5,
              profileHome: 2,
              reviews: 1,
              tabHome: 3,
              videos: 2,
            },
          },
        ],
      },
      {
        description:
          'Daily: Tabs on your Page that were viewed when logged-in users visited your Page. (Total Count)',
        id: 'PAGE_ID/insights/page_tab_views_login_top/day',
        name: 'page_tab_views_login_top',
        period: 'day',
        title: 'Daily Logged-in Tab Views',
        values: [
          {
            endTime: '2020-07-06T07:00:00+0000',
            value: {
              about: 2,
              home: 54,
              photos: 2,
              posts: 8,
              profileHome: 1,
              tabHome: 4,
              videos: 3,
            },
          },
          {
            endTime: '2020-07-07T07:00:00+0000',
            value: {
              about: 2,
              community: 1,
              home: 110,
              photos: 2,
              posts: 5,
              profileHome: 2,
              reviews: 1,
              tabHome: 7,
              videos: 2,
            },
          },
        ],
      },
      {
        description:
          'Daily: Page views by tab from users not logged into Facebook (Total Count)',
        id: 'PAGE_ID/insights/page_tab_views_logout_top/day',
        name: 'page_tab_views_logout_top',
        period: 'day',
        title: 'Daily Logged-out Page Views Per Tab',
        values: [
          {
            endTime: '2020-07-06T07:00:00+0000',
            value: {
              home: 4,
              posts: 1,
              profileHome: 1,
            },
          },
          {
            endTime: '2020-07-07T07:00:00+0000',
            value: {
              about: 1,
              home: 3,
              photos: 2,
              posts: 1,
              profileHome: 3,
              profilePhotos: 1,
              profilePosts: 1,
              profileVideos: 1,
            },
          },
        ],
      },
      {
        description:
          'Daily: The number of times people have given negative feedback to your Page, by type. (Total Count)',
        id: 'PAGE_ID/insights/page_negative_feedback_by_type/day',
        name: 'page_negative_feedback_by_type',
        period: 'day',
        title: 'Daily Negative Feedback From Users',
        values: [
          {
            endTime: '2020-07-06T07:00:00+0000',
            value: {
              hideAllClicks: 0,
              hideClicks: 0,
              reportSpamClicks: 0,
              unlikePageClicks: 0,
            },
          },
          {
            endTime: '2020-07-07T07:00:00+0000',
            value: {
              hideAllClicks: 0,
              hideClicks: 0,
              reportSpamClicks: 0,
              unlikePageClicks: 0,
            },
          },
        ],
      },
      {
        name: 'page_positive_feedback_by_type',
        period: 'day',
        values: [
          {
            value: {
              link: 10,
              like: 25,
              comment: 19,
              other: 6,
            },
            endTime: '2020-07-06T07:00:00+0000',
          },
          {
            value: {
              link: 6,
              like: 43,
              comment: 25,
              other: 11,
            },
            endTime: '2020-07-07T07:00:00+0000',
          },
        ],
        title: 'Daily Positive Feedback From Users',
        description:
          'Daily: The number of times people have given positive feedback to your Page, by type. (Total Count)',
        id: 'PAGE_ID/insights/page_positive_feedback_by_type/day',
      },
      {
        description:
          'Daily: This is a breakdown of the number of Page likes from the most common places where people can like your Page. (Total Count)',
        id: 'PAGE_ID/insights/page_fans_by_like_source/day',
        name: 'page_fans_by_like_source',
        period: 'day',
        title: 'Daily Like Sources',
        values: [
          {
            endTime: '2020-07-06T07:00:00+0000',
            value: {
              other: 1,
              yourPage: 5,
            },
          },
          {
            endTime: '2020-07-07T07:00:00+0000',
            value: {
              other: 1,
              yourPage: 10,
            },
          },
        ],
      },
      {
        description:
          'Daily: The number of people who liked your Page, broken down by the most common places where people can like your Page. (Unique Users)',
        id: 'PAGE_ID/insights/page_fans_by_like_source_unique/day',
        name: 'page_fans_by_like_source_unique',
        period: 'day',
        title: 'Daily Like Sources',
        values: [
          {
            endTime: '2020-07-06T07:00:00+0000',
            value: {
              other: 1,
              yourPage: 5,
              newsFeed: 0,
              pageSuggestions: 0,
              restoredLikesFromReactivatedAccounts: 0,
              search: 0,
            },
          },
          {
            endTime: '2020-07-07T07:00:00+0000',
            value: {
              other: 1,
              yourPage: 10,
              newsFeed: 0,
              pageSuggestions: 0,
              restoredLikesFromReactivatedAccounts: 0,
              search: 0,
            },
          },
        ],
      },
      {
        description:
          'Daily: The number of people who unliked your Page, broken down by the most common places where people can unlike your Page. (Unique Users)',
        id: 'PAGE_ID/insights/page_fans_by_unlike_source_unique/day',
        name: 'page_fans_by_unlike_source_unique',
        period: 'day',
        title: 'Daily Unlike Sources',
        values: [
          {
            endTime: '2020-07-06T07:00:00+0000',
            value: {},
          },
          {
            endTime: '2020-07-07T07:00:00+0000',
            value: {
              deactivatedOrMemorializedAccountRemovals: 0,
              other: 1,
              suspiciousAccountRemovals: 1,
              unlikesFromPagePostsOrNewsFeed: 0,
              unlikesFromSearch: 0,
            },
          },
        ],
      },
      {
        description:
          'Daily: This is a breakdown of the number of Page unlikes from the most common places where people can unlike your Page. (Total Count)',
        id: 'PAGE_ID/insights/page_fans_by_unlike_source/day',
        name: 'page_fans_by_unlike_source',
        period: 'day',
        title: 'Daily Unlike Sources',
        values: [
          {
            endTime: '2020-07-06T07:00:00+0000',
            value: {},
          },
          {
            endTime: '2020-07-07T07:00:00+0000',
            value: {
              deactivatedOrMemorializedAccountRemovals: 0,
              other: 1,
              suspiciousAccountRemovals: 1,
              unlikesFromPagePostsOrNewsFeed: 0,
              unlikesFromSearch: 0,
            },
          },
        ],
      },
      {
        description:
          'Daily: The number of people talking about your Page, by story type. (Unique Users)',
        id: 'PAGE_ID/insights/page_content_activity_by_action_type_unique/day',
        name: 'page_content_activity_by_action_type_unique',
        period: 'day',
        title: 'Daily Talking About This By Story Type',
        values: [
          {
            endTime: '2020-07-06T07:00:00+0000',
            value: {
              fan: 6,
              other: 30,
              pagePost: 9,
            },
          },
          {
            endTime: '2020-07-07T07:00:00+0000',
            value: {
              fan: 11,
              other: 53,
              pagePost: 6,
            },
          },
        ],
      },
      {
        description:
          'Daily: The number of stories about your Page by story type. (Total Count)',
        id: 'PAGE_ID/insights/page_content_activity_by_action_type/day',
        name: 'page_content_activity_by_action_type',
        period: 'day',
        title: 'Daily Page Stories By Story Type',
        values: [
          {
            endTime: '2020-07-06T07:00:00+0000',
            value: {
              fan: 6,
              other: 44,
              pagePost: 10,
            },
          },
          {
            endTime: '2020-07-07T07:00:00+0000',
            value: {
              fan: 11,
              other: 68,
              pagePost: 6,
            },
          },
        ],
      },
    ]);
  });

  it('should support week period', async () => {
    const client = new FacebookClient({
      accessToken: ACCESS_TOKEN,
    });

    const PAGE_ID = 'PAGE_ID';

    let receviedQuery;
    nock('https://graph.facebook.com/v6.0')
      .get('/me/insights')
      .query(query => {
        receviedQuery = query;
        return true;
      })
      .reply(200, {
        data: [
          {
            name: 'page_total_actions',
            period: 'week',
            values: [
              {
                value: 0,
                end_time: '2020-07-05T07:00:00+0000',
              },
              {
                value: 0,
                end_time: '2020-07-06T07:00:00+0000',
              },
            ],
            title: 'Weekly Total: total action count per Page',
            description:
              "Weekly: The number of clicks on your Page's contact info and call-to-action button.",
            id: `${PAGE_ID}/insights/page_total_actions/week`,
          },
          {
            name: 'page_engaged_users',
            period: 'week',
            values: [
              {
                value: 14,
                end_time: '2020-07-05T07:00:00+0000',
              },
              {
                value: 14,
                end_time: '2020-07-06T07:00:00+0000',
              },
            ],
            title: 'Weekly Page Engaged Users',
            description:
              'Weekly: The number of people who engaged with your Page. Engagement includes any click or story created. (Unique Users)',
            id: `${PAGE_ID}/insights/page_engaged_users/week`,
          },
        ],
        paging: {
          previous: `https://graph.facebook.com/v6.0/${PAGE_ID}/insights?access_token=${ACCESS_TOKEN}&pretty=0&metric=page_total_actions%2Cpage_engaged_users&period=week&since=1593673200&until=1593846000`,
          next: `https://graph.facebook.com/v6.0/${PAGE_ID}/insights?access_token=${ACCESS_TOKEN}&pretty=0&metric=page_total_actions%2Cpage_engaged_users&period=week&since=1594018800&until=1594191600`,
        },
      });

    const res = await client.getPageInsights({
      metric: ['page_total_actions', 'page_engaged_users'],
      period: 'week',
    });

    expect(receviedQuery).toEqual({
      access_token: ACCESS_TOKEN,
      metric: 'page_total_actions,page_engaged_users',
      period: 'week',
    });
    expect(res).toEqual([
      {
        description:
          "Weekly: The number of clicks on your Page's contact info and call-to-action button.",
        id: 'PAGE_ID/insights/page_total_actions/week',
        name: 'page_total_actions',
        period: 'week',
        title: 'Weekly Total: total action count per Page',
        values: [
          { endTime: '2020-07-05T07:00:00+0000', value: 0 },
          { endTime: '2020-07-06T07:00:00+0000', value: 0 },
        ],
      },
      {
        description:
          'Weekly: The number of people who engaged with your Page. Engagement includes any click or story created. (Unique Users)',
        id: 'PAGE_ID/insights/page_engaged_users/week',
        name: 'page_engaged_users',
        period: 'week',
        title: 'Weekly Page Engaged Users',
        values: [
          { endTime: '2020-07-05T07:00:00+0000', value: 14 },
          { endTime: '2020-07-06T07:00:00+0000', value: 14 },
        ],
      },
    ]);
  });

  it('should support days_28 period', async () => {
    const client = new FacebookClient({
      accessToken: ACCESS_TOKEN,
    });

    const PAGE_ID = 'PAGE_ID';

    let receviedQuery;
    nock('https://graph.facebook.com/v6.0')
      .get('/me/insights')
      .query(query => {
        receviedQuery = query;
        return true;
      })
      .reply(200, {
        data: [
          {
            name: 'page_total_actions',
            period: 'days_28',
            values: [
              {
                value: 0,
                end_time: '2020-07-05T07:00:00+0000',
              },
              {
                value: 0,
                end_time: '2020-07-06T07:00:00+0000',
              },
            ],
            title: '28 Days Total: total action count per Page',
            description:
              "28 Days: The number of clicks on your Page's contact info and call-to-action button.",
            id: `${PAGE_ID}/insights/page_total_actions/days_28`,
          },
          {
            name: 'page_engaged_users',
            period: 'days_28',
            values: [
              {
                value: 36,
                end_time: '2020-07-05T07:00:00+0000',
              },
              {
                value: 34,
                end_time: '2020-07-06T07:00:00+0000',
              },
            ],
            title: '28 Days Page Engaged Users',
            description:
              '28 Days: The number of people who engaged with your Page. Engagement includes any click or story created. (Unique Users)',
            id: `${PAGE_ID}/insights/page_engaged_users/days_28`,
          },
        ],
        paging: {
          previous: `https://graph.facebook.com/v6.0/${PAGE_ID}/insights?access_token=${ACCESS_TOKEN}&pretty=0&metric=page_total_actions%2Cpage_engaged_users&period=days_28&since=1593673200&until=1593846000`,
          next: `https://graph.facebook.com/v6.0/${PAGE_ID}/insights?access_token=${ACCESS_TOKEN}&pretty=0&metric=page_total_actions%2Cpage_engaged_users&period=days_28&since=1594018800&until=1594191600`,
        },
      });

    const res = await client.getPageInsights({
      metric: ['page_total_actions', 'page_engaged_users'],
      period: 'days_28',
    });

    expect(receviedQuery).toEqual({
      access_token: ACCESS_TOKEN,
      metric: 'page_total_actions,page_engaged_users',
      period: 'days_28',
    });
    expect(res).toEqual([
      {
        description:
          "28 Days: The number of clicks on your Page's contact info and call-to-action button.",
        id: 'PAGE_ID/insights/page_total_actions/days_28',
        name: 'page_total_actions',
        period: 'days_28',
        title: '28 Days Total: total action count per Page',
        values: [
          { endTime: '2020-07-05T07:00:00+0000', value: 0 },
          { endTime: '2020-07-06T07:00:00+0000', value: 0 },
        ],
      },
      {
        description:
          '28 Days: The number of people who engaged with your Page. Engagement includes any click or story created. (Unique Users)',
        id: 'PAGE_ID/insights/page_engaged_users/days_28',
        name: 'page_engaged_users',
        period: 'days_28',
        title: '28 Days Page Engaged Users',
        values: [
          { endTime: '2020-07-05T07:00:00+0000', value: 36 },
          { endTime: '2020-07-06T07:00:00+0000', value: 34 },
        ],
      },
    ]);
  });

  it('should support datePreset', async () => {
    const client = new FacebookClient({
      accessToken: ACCESS_TOKEN,
    });

    let receviedQuery;
    nock('https://graph.facebook.com/v6.0')
      .get('/me/insights')
      .query(query => {
        receviedQuery = query;
        return true;
      })
      .reply(200, {});

    await client.getPageInsights({
      metric: ['page_tab_views_login_top_unique'],
      period: 'day',
      datePreset: 'today',
    });

    expect(receviedQuery).toEqual({
      access_token: ACCESS_TOKEN,
      metric: 'page_tab_views_login_top_unique',
      period: 'day',
      date_preset: 'today',
    });
  });

  it('should support since and until', async () => {
    const client = new FacebookClient({
      accessToken: ACCESS_TOKEN,
    });

    let receviedQuery;
    nock('https://graph.facebook.com/v6.0')
      .get('/me/insights')
      .query(query => {
        receviedQuery = query;
        return true;
      })
      .reply(200, {});

    await client.getPageInsights({
      metric: ['page_tab_views_login_top_unique'],
      period: 'day',
      since: new Date('2020-07-06T03:24:00Z'),
      until: new Date('2020-07-07T03:24:00Z'),
    });

    expect(receviedQuery).toEqual({
      access_token: ACCESS_TOKEN,
      metric: 'page_tab_views_login_top_unique',
      period: 'day',
      since: '2020-07-06T03:24:00.000Z',
      until: '2020-07-07T03:24:00.000Z',
    });
  });
});

describe('#getPostInsights', () => {
  it('should support day period', async () => {
    const client = new FacebookClient({
      accessToken: ACCESS_TOKEN,
    });

    const POST_ID = 'POST_ID';

    let receviedQuery;
    nock('https://graph.facebook.com/v6.0')
      .get(`/${POST_ID}/insights`)
      .query(query => {
        receviedQuery = query;
        return true;
      })
      .reply(200, {
        data: [
          {
            name: 'post_video_views_organic',
            period: 'day',
            values: [
              {
                value: 0,
                end_time: '2020-07-05T07:00:00+0000',
              },
              {
                value: 0,
                end_time: '2020-07-06T07:00:00+0000',
              },
            ],
            title: 'Daily Organic Video Views',
            description:
              'Daily: Number of times your video was viewed for more than 3 seconds without any paid promotion. (Total Count)',
            id: `${POST_ID}/insights/post_video_views_organic/day`,
          },
          {
            name: 'post_video_views_paid',
            period: 'day',
            values: [
              {
                value: 0,
                end_time: '2020-07-05T07:00:00+0000',
              },
              {
                value: 0,
                end_time: '2020-07-06T07:00:00+0000',
              },
            ],
            title: 'Daily Total Paid Video Views',
            description:
              'Daily: Total number of times your video was viewed for more than 3 seconds after paid promotion.',
            id: `${POST_ID}/insights/post_video_views_paid/day`,
          },
        ],
        paging: {
          previous: `https://graph.facebook.com/v6.0/${POST_ID}/insights?access_token=${ACCESS_TOKEN}&pretty=0&metric=post_video_views_organic%2Cpost_video_views_paid&period=day&since=1593673200&until=1593846000`,
          next: `https://graph.facebook.com/v6.0/${POST_ID}/insights?access_token=${ACCESS_TOKEN}&pretty=0&metric=post_video_views_organic%2Cpost_video_views_paid&period=day&since=1594018800&until=1594191600`,
        },
      });

    const res = await client.getPostInsights(POST_ID, {
      metric: ['post_video_views_organic', 'post_video_views_paid'],
      period: 'day',
    });

    expect(receviedQuery).toEqual({
      access_token: ACCESS_TOKEN,
      metric: 'post_video_views_organic,post_video_views_paid',
      period: 'day',
    });
    expect(res).toEqual([
      {
        name: 'post_video_views_organic',
        period: 'day',
        values: [
          {
            value: 0,
            endTime: '2020-07-05T07:00:00+0000',
          },
          {
            value: 0,
            endTime: '2020-07-06T07:00:00+0000',
          },
        ],
        title: 'Daily Organic Video Views',
        description:
          'Daily: Number of times your video was viewed for more than 3 seconds without any paid promotion. (Total Count)',
        id: `${POST_ID}/insights/post_video_views_organic/day`,
      },
      {
        name: 'post_video_views_paid',
        period: 'day',
        values: [
          {
            value: 0,
            endTime: '2020-07-05T07:00:00+0000',
          },
          {
            value: 0,
            endTime: '2020-07-06T07:00:00+0000',
          },
        ],
        title: 'Daily Total Paid Video Views',
        description:
          'Daily: Total number of times your video was viewed for more than 3 seconds after paid promotion.',
        id: `${POST_ID}/insights/post_video_views_paid/day`,
      },
    ]);
  });

  it('should support lifetime period', async () => {
    const client = new FacebookClient({
      accessToken: ACCESS_TOKEN,
    });

    const POST_ID = 'POST_ID';

    let receviedQuery;
    nock('https://graph.facebook.com/v6.0')
      .get(`/${POST_ID}/insights`)
      .query(query => {
        receviedQuery = query;
        return true;
      })
      .reply(200, {
        data: [
          {
            name: 'post_engaged_users',
            period: 'lifetime',
            values: [
              {
                value: 11,
              },
            ],
            title: 'Lifetime Engaged Users',
            description:
              'Lifetime: The number of unique people who engaged in certain ways with your Page post, for example by commenting on, liking, sharing, or clicking upon particular elements of the post. (Unique Users)',
            id: `${POST_ID}/insights/post_engaged_users/lifetime`,
          },
          {
            name: 'post_negative_feedback',
            period: 'lifetime',
            values: [
              {
                value: 0,
              },
            ],
            title: 'Lifetime Negative Feedback',
            description:
              'Lifetime: The number of times people have given negative feedback to your post. (Total Count)',
            id: `${POST_ID}/insights/post_negative_feedback/lifetime`,
          },
        ],
        paging: {
          previous: `https://graph.facebook.com/v6.0/${POST_ID}/insights?access_token=${ACCESS_TOKEN}&pretty=0&metric=post_engaged_users%2Cpost_negative_feedback&period=lifetime&since=1593673200&until=1593846000`,
          next: `https://graph.facebook.com/v6.0/${POST_ID}/insights?access_token=${ACCESS_TOKEN}&pretty=0&metric=post_engaged_users%2Cpost_negative_feedback&period=lifetime&since=1594018800&until=1594191600`,
        },
      });

    const res = await client.getPostInsights(POST_ID, {
      metric: ['post_engaged_users', 'post_negative_feedback'],
      period: 'lifetime',
    });

    expect(receviedQuery).toEqual({
      access_token: ACCESS_TOKEN,
      metric: 'post_engaged_users,post_negative_feedback',
      period: 'lifetime',
    });
    expect(res).toEqual([
      {
        description:
          'Lifetime: The number of unique people who engaged in certain ways with your Page post, for example by commenting on, liking, sharing, or clicking upon particular elements of the post. (Unique Users)',
        id: 'POST_ID/insights/post_engaged_users/lifetime',
        name: 'post_engaged_users',
        period: 'lifetime',
        title: 'Lifetime Engaged Users',
        values: [{ value: 11 }],
      },
      {
        description:
          'Lifetime: The number of times people have given negative feedback to your post. (Total Count)',
        id: 'POST_ID/insights/post_negative_feedback/lifetime',
        name: 'post_negative_feedback',
        period: 'lifetime',
        title: 'Lifetime Negative Feedback',
        values: [{ value: 0 }],
      },
    ]);
  });

  it('should support datePreset', async () => {
    const client = new FacebookClient({
      accessToken: ACCESS_TOKEN,
    });

    const POST_ID = 'POST_ID';

    let receviedQuery;
    nock('https://graph.facebook.com/v6.0')
      .get(`/${POST_ID}/insights`)
      .query(query => {
        receviedQuery = query;
        return true;
      })
      .reply(200, {});

    await client.getPostInsights(POST_ID, {
      metric: ['post_video_views_organic'],
      period: 'day',
      datePreset: 'today',
    });

    expect(receviedQuery).toEqual({
      access_token: ACCESS_TOKEN,
      metric: 'post_video_views_organic',
      period: 'day',
      date_preset: 'today',
    });
  });

  it('should support since and until', async () => {
    const client = new FacebookClient({
      accessToken: ACCESS_TOKEN,
    });

    const POST_ID = 'POST_ID';

    let receviedQuery;
    nock('https://graph.facebook.com/v6.0')
      .get(`/${POST_ID}/insights`)
      .query(query => {
        receviedQuery = query;
        return true;
      })
      .reply(200, {});

    await client.getPostInsights(POST_ID, {
      metric: ['post_video_views_organic'],
      period: 'day',
      since: new Date('2020-07-06T03:24:00Z'),
      until: new Date('2020-07-07T03:24:00Z'),
    });

    expect(receviedQuery).toEqual({
      access_token: ACCESS_TOKEN,
      metric: 'post_video_views_organic',
      period: 'day',
      since: '2020-07-06T03:24:00.000Z',
      until: '2020-07-07T03:24:00.000Z',
    });
  });
});
