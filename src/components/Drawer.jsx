import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InputBase from "@material-ui/core/InputBase";
import AssessmentIcon from "@material-ui/icons/Assessment";
import StoreIcon from "@material-ui/icons/Store";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ReceiptIcon from "@material-ui/icons/Receipt";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import Typography from "@material-ui/core/Typography";
import CategoryIcon from "@material-ui/icons/Category";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles, useTheme, alpha } from "@material-ui/core/styles";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import Auth from "./auth/Auth";
import Stock from "./stock/Stock";
import Invoice from "./stock/Invoice";
import userService from "./services/UserService";
import Category from "./category/Category";
import {
  withRouter,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import AddStock from "./stock/AddStock";
import ViewStock from "./stock/ViewStock";
import EditStock from "./stock/EditStock";
import ViewCategory from "./category/ViewCategory";
import EditCategory from "./category/EditCategory";
import Index from "./saleReport/Index";
import Sales from "./saleReport/Sales";
import GetInvoice from "./saleReport/GetInvoice";
import ViewProfit from "./saleReport/ViewProfit";
import CustomerInstallment from "./saleReport/CustomerInstallment";
import GetInvoiceCustomer from "./saleReport/GetInvoiceCustomer";
import AutoComplete from "./stock/AutoComplete";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBarTitle: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  appBarTitle: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchData, setSearchData] = React.useState("");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    fetch(`http://localhost:4000/stocks?q=${searchTerm}`)
      .then((res) => res.json())
      .then((result) => {
        setSearchData(result);
      });
  }, [searchTerm]);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List id="no-print">
        <ListItem
          onClick={(e) => {
            props.history.push("/");
          }}
          button
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          onClick={(e) => {
            props.history.push("/addstock");
          }}
          button
        >
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Add Stock" />
        </ListItem>
        <ListItem
          onClick={() => {
            props.history.push("/viewStock");
          }}
          button
        >
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Stock" />
        </ListItem>
        <ListItem
          onClick={() => props.history.push("/customerInstallment")}
          button
        >
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem onClick={() => props.history.push("/saleReport")} button>
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Sale Report" />
        </ListItem>
        <ListItem
          onClick={() => {
            props.history.push("/invoice");
          }}
          button
        >
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="View Receipt" />
        </ListItem>
        <ListItem
          onClick={(e) => {
            props.history.push("/addcategory");
          }}
          button
        >
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Add Category" />
        </ListItem>
        <ListItem onClick={() => props.history.push("/viewCategory")} button>
          <ListItemIcon>
            <ChangeHistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Category" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          onClick={(e) => {
            localStorage.clear();
            userService.logout();
            props.history.push("/login");
          }}
          button
        >
          <ListItemIcon id="no-print">
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText id="no-print" primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Auth>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar id="no-print" position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.appBarTitle}
              style={{ flexGrow: 1 }}
              variant="h6"
              noWrap
            >
              Madina Traders Electric Store
            </Typography>
            <div style={{ color: "white" }} className={classes.search}>
              <AutoComplete />
            </div>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route exact path="/" render={() => <Stock />} />
            <Route path="/addstock" render={() => <AddStock />} />
            <Route path="/addcategory" render={() => <Category />} />
            <Route path="/invoice" render={() => <Invoice />} />
            <Route path="/viewStock" render={() => <ViewStock />} />
            <Route path="/editStock/:id" render={() => <EditStock />} />
            <Route path="/viewCategory" render={() => <ViewCategory />} />
            <Route path="/editCategory/:id" render={() => <EditCategory />} />
            <Route path="/saleReport" render={() => <Index />} />
            <Route path="/sales" render={() => <Sales />} />
            <Route path="/getInvoice/:id" render={() => <GetInvoice />} />
            <Route
              path="/getInvoiceCustomer/:id"
              render={() => <GetInvoiceCustomer />}
            />
            <Route path="/viewProfit" render={() => <ViewProfit />} />
            <Route
              path="/customerInstallment"
              render={() => <CustomerInstallment />}
            />
          </Switch>
        </main>
      </div>
    </Auth>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withRouter(ResponsiveDrawer);
