import SvgIcon from "@material-ui/core/SvgIcon";

import IconWrapper from "components/icons/IconWrapper";

export default function CreditCardIcon(props) {
  return (
    <IconWrapper style={{ ...props.style }}>
      <SvgIcon width="32" height="15" viewBox="0 0 32 20" fill="none" style={{ width: "auto", height: "auto" }}>
        <rect width="31.4548" height="20" fill="#C4C4C4" />
        <rect x="2.82812" y="4" width="12.216" height="8" fill="white" />
        <rect x="2.82812" y="16" width="24.432" height="1" fill="white" />
      </SvgIcon>
    </IconWrapper>
  );
}
