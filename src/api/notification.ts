import base from "./base";

const getNotificationsUnread = () => {
  // return Promise.resolve({
  //   data: [
  //     {
  //       id: 6,
  //       type: "new_comment",
  //       recipient: {
  //         name: "contact",
  //         slug: null,
  //         image: null,
  //       },
  //       actor: {
  //         name: "Boohoo",
  //         slug: "boohoo",
  //         image: "/media/brands/69241050_2523364394350666_4863998162903236608_n.png",
  //       },
  //       verb: "added a new comment",
  //       action_object: {
  //         name: "test4",
  //         slug: null,
  //         image: null,
  //       },
  //       target: null,
  //       timestamp: "2020-12-14T08:14:24.713681Z",
  //       unread: true,
  //     },
  //     {
  //       id: 5,
  //       type: "new_comment",
  //       recipient: {
  //         name: "contact",
  //         slug: null,
  //         image: null,
  //       },
  //       actor: {
  //         name: "Boohoo",
  //         slug: "boohoo",
  //         image: "/media/brands/69241050_2523364394350666_4863998162903236608_n.png",
  //       },
  //       verb: "added a new comment",
  //       action_object: {
  //         name: "test3",
  //         slug: null,
  //         image: null,
  //       },
  //       target: null,
  //       timestamp: "2020-12-14T08:14:22.739017Z",
  //       unread: true,
  //     },
  //   ],
  // });
  return base({
    url: `/notifications/unread/`,
    method: "get",
  });
};

const getNotificationsUnreadCount = () => {
  return base({
    url: `/notifications/unread_count/`,
    method: "get",
  });
};

const markNotificationRead = (payload) => {
  return base({
    url: `/notifications/${payload.id}/mark_as_read/`,
    method: "get",
  });
};

export default {
  getNotificationsUnread,
  getNotificationsUnreadCount,
  markNotificationRead,
};
