import React from "react";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { routes, hasPermission } from "data/routes";

const Authorization: React.FunctionComponent = (props) => {
  const [accessGranted, allowAccessGranted] = React.useState<boolean>(true);

  const router = useRouter();

  // const checking = useSelector((state: any) => state.auth.checking);
  const user = useSelector((state: any) => state.auth.user);

  const redirectRoute = () => {
    const { userType = "guest" } = user || {};
    if (userType === "guest") {
      router.push("/");
    } else if (userType === "customer") {
      router.push("/profile");
    } else {
      const { brands } = user;
      if (brands.length === 0) {
        if (localStorage.getItem("isOnboarding") === "no") {
          router.push("/merchant/brands/draft");
        } else {
          router.push("/merchant/onboarding");
        }
      } else router.push(`/merchant/brands/[brandSlug]`, `/merchant/brands/${brands[0]}`);
    }
  };

  //getDerivedStateFromProps
  // find matched route object and check if user has permission
  const { userType = "guest" } = user || {};

  const matched = routes.find((route) => router.pathname === route.path);

  if (matched && hasPermission(matched, userType)) {
    if (accessGranted === false) allowAccessGranted(true);
  } else {
    if (accessGranted === true) allowAccessGranted(false);
  }

  React.useEffect(() => {
    if (!accessGranted) {
      redirectRoute();
    }
  });

  //render
  // !!! revert
  // if (matched && hasPermission(matched, "guest")) {
  //   return <>{props.children}</>;
  // } else if (checking) {
  //   return null;
  // } else if (!checking && accessGranted) {
  //   return <>{props.children}</>;
  // } else return null;

  if (accessGranted) return <>{props.children}</>;
  else return null;
};

export default Authorization;
