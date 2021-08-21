import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

export default function InstagramIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="21" height="21" viewBox="0 0 21 21" {...props}>
      <path
        d="M16 5.5H17M4.5 0.5H16.5C18.7091 0.5 20.5 2.29086 20.5 4.5V16.5C20.5 18.7091 18.7091 20.5 16.5 20.5H4.5C2.29086 20.5 0.5 18.7091 0.5 16.5V4.5C0.5 2.29086 2.29086 0.5 4.5 0.5ZM10.5 14.5C8.29086 14.5 6.5 12.7091 6.5 10.5C6.5 8.29086 8.29086 6.5 10.5 6.5C12.7091 6.5 14.5 8.29086 14.5 10.5C14.5 12.7091 12.7091 14.5 10.5 14.5Z"
        stroke="#9B51E0"
        fill="#ffffff"
      />
    </SvgIcon>
  );
}
