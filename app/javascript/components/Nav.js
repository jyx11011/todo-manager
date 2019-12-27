import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box"
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const StyledAppBar = withStyles({
  root:{"@media only screen and (min-width: 600px)": {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  }}
})(AppBar);

const StyledBox = withStyles({
  root: {"@media only screen and (min-width: 600px)": {
    width: drawerWidth,
    flexShrink: 0
  }}
})(Box);

const StyledMenuButton=withStyles({
    root:{"@media (min-width: 600px)": {
      display: "none"
    }}
})(IconButton);

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.getDrawer = this.getDrawer.bind(this);
  }

  handleDrawerToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  getDrawer() {
    return (
      <div>
        <Toolbar/>
        <Divider />
        <List>
          {["Todo list", "Trash", "Tags"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <StyledAppBar position="fixed">
          <Toolbar>
            <StyledMenuButton edge="start" onClick={this.handleDrawerToggle}>
              <MenuIcon />
            </StyledMenuButton>
            <Typography variant="h6" noWrap>
              Todo Manager
            </Typography>
          </Toolbar>
        </StyledAppBar>
        <StyledBox component="nav">
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={this.state.isOpen}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true
              }}
              PaperProps={{style:{width: drawerWidth}}}
            >
              {this.getDrawer()}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer variant="permanent" open PaperProps={{style:{width: drawerWidth}}}>
              {this.getDrawer()}
            </Drawer>
          </Hidden>
        </StyledBox>
      </React.Fragment>
    );
  }
}

export default Nav;
