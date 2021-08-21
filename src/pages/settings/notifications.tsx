import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
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

import { GradientButton } from "components/Buttons";
import AntSwitch from "components/core/AntSwitch";
import CollapseContent from "components/settings/CollapseContent";
import NotificationSwitchWrapper from "components/settings/NotificationSwitchWrapper";
import SettingsLayout from "layouts/SettingsLayout";

const useStyles = makeStyles({
  root: {
    padding: 20,
    opacity: 0.4,
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

export default function LoginSecurity() {
  const classes = useStyles();

  return (
    <SettingsLayout>
      <Head>
        <title>Notifications</title>
      </Head>
      <div className={classes.root}>
        <Typography className="mb-8 text-base font-bold">Notifications Settings</Typography>
        <Typography className={classes.pageSubTitle}>What notifications you receive</Typography>
        <div>
          <CollapseContent title="Comments" subTitle="Push, Email" titleIcon={<ModeCommentOutlinedIcon />}>
            <Typography className="mb12 blackop60">
              These are notifications for comments on your replies to your comments.
            </Typography>
            <Typography className="mb12 bold blackop60">Where you receive these notifications</Typography>
            <NotificationSwitchWrapper label="Push" icon={<OpenInBrowserOutlinedIcon />}>
              <AntSwitch></AntSwitch>
            </NotificationSwitchWrapper>
            <NotificationSwitchWrapper label="Email" icon={<EmailOutlinedIcon />}>
              <AntSwitch></AntSwitch>
            </NotificationSwitchWrapper>
          </CollapseContent>

          <CollapseContent title="Likes" subTitle="Push, Email" titleIcon={<ThumbUpOutlinedIcon />}>
            <Typography className="mb12 blackop60">
              These are notifications for comments on your replies to your comments.
            </Typography>
            <Typography className="mb12 bold blackop60">Where you receive these notifications</Typography>
            <NotificationSwitchWrapper label="Push" icon={<OpenInBrowserOutlinedIcon />}>
              <AntSwitch></AntSwitch>
            </NotificationSwitchWrapper>
            <NotificationSwitchWrapper label="Email" icon={<EmailOutlinedIcon />}>
              <AntSwitch></AntSwitch>
            </NotificationSwitchWrapper>
          </CollapseContent>

          <CollapseContent title="Tags" subTitle="Push, Email" titleIcon={<BookmarksOutlinedIcon />}>
            <Typography className="mb12 blackop60">
              These are notifications for comments on your replies to your comments.
            </Typography>
            <Typography className="mb12 bold blackop60">Where you receive these notifications</Typography>
            <NotificationSwitchWrapper label="Push" icon={<OpenInBrowserOutlinedIcon />}>
              <AntSwitch></AntSwitch>
            </NotificationSwitchWrapper>
            <NotificationSwitchWrapper label="Email" icon={<EmailOutlinedIcon />}>
              <AntSwitch></AntSwitch>
            </NotificationSwitchWrapper>
          </CollapseContent>

          <CollapseContent title="Reminders" subTitle="Push, Email" titleIcon={<NotificationsActiveOutlinedIcon />}>
            <Typography className="mb12 blackop60">
              These are notifications for comments on your replies to your comments.
            </Typography>
            <Typography className="mb12 bold blackop60">Where you receive these notifications</Typography>
            <NotificationSwitchWrapper label="Push" icon={<OpenInBrowserOutlinedIcon />}>
              <AntSwitch></AntSwitch>
            </NotificationSwitchWrapper>
            <NotificationSwitchWrapper label="Email" icon={<EmailOutlinedIcon />}>
              <AntSwitch></AntSwitch>
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
              <AntSwitch></AntSwitch>
            </NotificationSwitchWrapper>
            <NotificationSwitchWrapper label="Email" icon={<EmailOutlinedIcon />}>
              <AntSwitch></AntSwitch>
            </NotificationSwitchWrapper>
          </CollapseContent>

          <CollapseContent title="Follow Request" subTitle="Push, Email" titleIcon={<GroupAddOutlinedIcon />}>
            <Typography className="mb12 blackop60">
              These are notifications for comments on your replies to your comments.
            </Typography>
            <Typography className="mb12 bold blackop60">Where you receive these notifications</Typography>
            <NotificationSwitchWrapper label="Push" icon={<OpenInBrowserOutlinedIcon />}>
              <AntSwitch></AntSwitch>
            </NotificationSwitchWrapper>
            <NotificationSwitchWrapper label="Email" icon={<EmailOutlinedIcon />}>
              <AntSwitch></AntSwitch>
            </NotificationSwitchWrapper>
          </CollapseContent>
        </div>

        <Typography className={classes.pageSubTitle} style={{ marginTop: 44 }}>
          How to receive push notification
        </Typography>
        <CollapseContent title="Browser" subTitle="Push, Email" titleIcon={<OpenInBrowserOutlinedIcon />}>
          <Typography className="mb12 bold blackop60">Push Notifications</Typography>
          <NotificationSwitchWrapper largeWidth>
            <div className="avatar-label">
              <Avatar alt="Chrome" src="/images/chrome.svg" />
              <div className="label">
                <Typography className="bold">Chrome Push Notification</Typography>
                <Typography>
                  <Link href="#">Mute notification</Link>
                </Typography>
              </div>
            </div>
            <AntSwitch></AntSwitch>
          </NotificationSwitchWrapper>

          <Typography className="mb12 bold blackop60">Sounds</Typography>
          <NotificationSwitchWrapper label="Play a sound when each new notification is received" largeWidth>
            <AntSwitch></AntSwitch>
          </NotificationSwitchWrapper>
          <NotificationSwitchWrapper label="Play a sound when a message is received" largeWidth>
            <AntSwitch></AntSwitch>
          </NotificationSwitchWrapper>
        </CollapseContent>

        <GradientButton variant="contained" disableElevation color="primary" className={classes.updateBtn}>
          Update
        </GradientButton>
      </div>
    </SettingsLayout>
  );
}
