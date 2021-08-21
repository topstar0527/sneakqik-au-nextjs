import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BookmarksOutlinedIcon from "@material-ui/icons/BookmarksOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActiveOutlined";
import OpenInBrowserOutlinedIcon from "@material-ui/icons/OpenInBrowserOutlined";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";

import AntSwitch from "components/core/AntSwitch";
import CollapseContent from "components/settings/CollapseContent";
import NotificationSwitchWrapper from "components/settings/NotificationSwitchWrapper";
import SettingsLayout from "layouts/SettingsLayout";
import { authActions } from "store/auth/actions";

const useStyles = makeStyles({
  root: {
    padding: 20,
    opacity: 0.4,
  },
  pageTitle: {
    marginBottom: 29,
    fontSize: 16,
    fontWeight: "bold",
  },
  pageSubTitle: {
    marginBottom: 17,
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    display: "flex",
    alignItems: "center",
  },
  updateBtn: {
    width: 117,
    height: 40,
    marginTop: 12,
    float: "right",
  },
});

export default function Notifications() {
  const classes = useStyles();

  const settings = useSelector((state: any) => state.auth.user?.notificationSettingsByType);

  const dispatch = useDispatch();

  const handleChange = (type, type1, checked) => {
    dispatch(authActions.updateNotificationRequest({ type: type, [type1]: checked }));
  };

  if (!settings)
    return (
      <SettingsLayout>
        <Head>
          <title>Notifications</title>
        </Head>
        <div className={classes.root}>
          <Typography className={classes.pageTitle}>Notifications Settings</Typography>
          <Typography className={classes.pageSubTitle}>What notifications you receive</Typography>
        </div>
      </SettingsLayout>
    );

  return (
    <SettingsLayout>
      <Head>
        <title>Notifications</title>
      </Head>
      <div className={classes.root}>
        <Typography className={classes.pageTitle}>Notifications Settings</Typography>
        <Typography className={classes.pageSubTitle}>What notifications you receive</Typography>
        <div>
          <CollapseContent title="Comments" subTitle="Push, Email" titleIcon={<ModeCommentOutlinedIcon />}>
            <Typography className="mb12 blackop60">
              These are notifications for comments on your replies to your comments.
            </Typography>
            <Typography className="mb12 bold blackop60">Where you receive these notifications</Typography>
            <NotificationSwitchWrapper label="Push" icon={<OpenInBrowserOutlinedIcon />}>
              <AntSwitch
                checked={settings["comment"]["push"]}
                onChange={(_e, checked) => handleChange("comment", "push", checked)}
              />
            </NotificationSwitchWrapper>
            <NotificationSwitchWrapper label="Email" icon={<EmailOutlinedIcon />}>
              <AntSwitch
                checked={settings["comment"]["email"]}
                onChange={(_e, checked) => handleChange("comment", "email", checked)}
              />
            </NotificationSwitchWrapper>
          </CollapseContent>

          <CollapseContent title="Likes" subTitle="Push, Email" titleIcon={<ThumbUpOutlinedIcon />}>
            <Typography className="mb12 blackop60">
              These are notifications for comments on your replies to your comments.
            </Typography>
            <Typography className="mb12 bold blackop60">Where you receive these notifications</Typography>
            <NotificationSwitchWrapper label="Push" icon={<OpenInBrowserOutlinedIcon />}>
              <AntSwitch
                checked={settings["like"]["push"]}
                onChange={(_e, checked) => handleChange("like", "push", checked)}
              />
            </NotificationSwitchWrapper>
            <NotificationSwitchWrapper label="Email" icon={<EmailOutlinedIcon />}>
              <AntSwitch
                checked={settings["like"]["email"]}
                onChange={(_e, checked) => handleChange("like", "email", checked)}
              />
            </NotificationSwitchWrapper>
          </CollapseContent>

          <CollapseContent title="Tags" subTitle="Push, Email" titleIcon={<BookmarksOutlinedIcon />}>
            <Typography className="mb12 blackop60">
              These are notifications for comments on your replies to your comments.
            </Typography>
            <Typography className="mb12 bold blackop60">Where you receive these notifications</Typography>
            <NotificationSwitchWrapper label="Push" icon={<OpenInBrowserOutlinedIcon />}>
              <AntSwitch
                checked={settings["tag"]["push"]}
                onChange={(_e, checked) => handleChange("tag", "push", checked)}
              />
            </NotificationSwitchWrapper>
            <NotificationSwitchWrapper label="Email" icon={<EmailOutlinedIcon />}>
              <AntSwitch
                checked={settings["tag"]["email"]}
                onChange={(_e, checked) => handleChange("tag", "email", checked)}
              />
            </NotificationSwitchWrapper>
          </CollapseContent>

          <CollapseContent title="Reminders" subTitle="Push, Email" titleIcon={<NotificationsActiveOutlinedIcon />}>
            <Typography className="mb12 blackop60">
              These are notifications for comments on your replies to your comments.
            </Typography>
            <Typography className="mb12 bold blackop60">Where you receive these notifications</Typography>
            <NotificationSwitchWrapper label="Push" icon={<OpenInBrowserOutlinedIcon />}>
              <AntSwitch
                checked={settings["reminder"]["push"]}
                onChange={(_e, checked) => handleChange("reminder", "push", checked)}
              />
            </NotificationSwitchWrapper>
            <NotificationSwitchWrapper label="Email" icon={<EmailOutlinedIcon />}>
              <AntSwitch
                checked={settings["reminder"]["email"]}
                onChange={(_e, checked) => handleChange("reminder", "email", checked)}
              />
            </NotificationSwitchWrapper>
          </CollapseContent>

          <CollapseContent
            title="Update brands from you follow"
            subTitle="Push, Email"
            titleIcon={<FlagOutlinedIcon />}
          >
            <Typography className="mb12 blackop60">
              These are notifications for comments on your replies to your comments.
            </Typography>
            <Typography className="mb12 bold blackop60">Where you receive these notifications</Typography>
            <NotificationSwitchWrapper label="Push" icon={<OpenInBrowserOutlinedIcon />}>
              <AntSwitch
                checked={settings["share"]["push"]}
                onChange={(_e, checked) => handleChange("share", "push", checked)}
              />
            </NotificationSwitchWrapper>
            <NotificationSwitchWrapper label="Email" icon={<EmailOutlinedIcon />}>
              <AntSwitch
                checked={settings["share"]["email"]}
                onChange={(_e, checked) => handleChange("share", "email", checked)}
              />
            </NotificationSwitchWrapper>
          </CollapseContent>

          <CollapseContent title="Follow Request" subTitle="Push, Email" titleIcon={<GroupAddOutlinedIcon />}>
            <Typography className="mb12 blackop60">
              These are notifications for comments on your replies to your comments.
            </Typography>
            <Typography className="mb12 bold blackop60">Where you receive these notifications</Typography>
            <NotificationSwitchWrapper label="Push" icon={<OpenInBrowserOutlinedIcon />}>
              <AntSwitch
                checked={settings["follow_request"]["push"]}
                onChange={(_e, checked) => handleChange("follow_request", "push", checked)}
              />
            </NotificationSwitchWrapper>
            <NotificationSwitchWrapper label="Email" icon={<EmailOutlinedIcon />}>
              <AntSwitch
                checked={settings["follow_request"]["email"]}
                onChange={(_e, checked) => handleChange("follow_request", "email", checked)}
              />
            </NotificationSwitchWrapper>
          </CollapseContent>
        </div>
      </div>
    </SettingsLayout>
  );
}
