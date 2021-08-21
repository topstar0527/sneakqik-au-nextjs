import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";

interface StyledTabsProps {
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
  value: number;
}

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: "92px",
      width: "100%",
      backgroundColor: "#635ee7",
    },
  },
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

export default StyledTabs;
