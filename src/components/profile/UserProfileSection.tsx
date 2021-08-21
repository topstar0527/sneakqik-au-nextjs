import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import { useSelector } from "react-redux";

import Link from "components/core/Link";

const useStyles = makeStyles({
  avatar: {
    marginTop: 57,
    borderRadius: 40,
    width: 80,
    height: 80,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  },

  username: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 6,
    alignItems: "center",
    display: "flex",
  },
});

const UserProfileSection: React.FC = () => {
  const classes = useStyles();

  const user = useSelector((state: any) => state.auth.user) || {};

  const profileState = useSelector((state: any) => state.customer.profile);

  return (
    <div className="mx-4 flex flex-col items-center">
      {/* <Avatar className={classes.avatar} alt={user.username} src={user.avatar} /> */}
      <Avatar className={classes.avatar} alt={user.username}>
        <Image src={user.avatar} layout="fill" objectFit="cover" />
      </Avatar>

      <h2 className={classes.username}>
        {user.username}{" "}
        <Link naked href="/settings/general">
          <IconButton aria-label="settings">
            <img className="opacity-30" width="18" height="18" alt="settings" src="/images/settings.png" />
          </IconButton>
        </Link>
      </h2>

      <Divider className="w-full" />

      <ul className="w-full pr-1 mt-2">
        <li className="flex justify-between my-4">
          <span className="text-xs">Liked</span>
          <span className="text-sm font-bold text-primary">{profileState.offers.liked.length}</span>
        </li>

        <li className="flex justify-between my-4">
          <span className="text-xs">Saved</span>
          <span className="text-sm font-bold text-primary">{profileState.offers.saved.length}</span>
        </li>

        <li className="flex justify-between my-4">
          <span className="text-xs">Following</span>
          <span className="text-sm font-bold text-primary">{profileState.brands.length}</span>
        </li>
      </ul>
    </div>
  );
};

export default UserProfileSection;
