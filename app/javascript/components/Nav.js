import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import LabelIcon from "@material-ui/icons/Label";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import TagForm from "./TagForm";
import { Tooltip, ListItemIcon } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import DeleteIcon from "@material-ui/icons/Delete";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { indigo } from "@material-ui/core/colors";

const drawerWidth = 200;

const StyledAppBar = withStyles({
  root: {
    "@media only screen and (min-width: 600px)": {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  }
})(AppBar);

const StyledBox = withStyles({
  root: {
    "@media only screen and (min-width: 600px)": {
      width: drawerWidth,
      flexShrink: 0
    }
  }
})(Box);

const StyledMenuButton = withStyles({
  root: {
    "@media (min-width: 600px)": {
      display: "none"
    }
  }
})(IconButton);

const drawerList = [
  {
    text: "Todo list",
    icon: <ListIcon />,
    href: "/tasks"
  },
  {
    text: "Tags",
    icon: <LabelIcon />,
    href: "/tags"
  },
  {
    text: "Trash",
    icon: <DeleteIcon />,
    href: "/trash"
  }
];

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isEditTag: false,
      isExist: false
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.getDrawer = this.getDrawer.bind(this);
    this.handleAddTaskButtonClick = this.handleAddTaskButtonClick.bind(this);
    this.handleAddTagButtonClick = this.handleAddTagButtonClick.bind(this);
    this.getTagArea = this.getTagArea.bind(this);
    this.handleCloseTagForm = this.handleCloseTagForm.bind(this);
    this.handleNewTag = this.handleNewTag.bind(this);
    this.getNewTaskButton = this.getNewTaskButton.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleAddTaskButtonClick() {
    this.props.handleAddTaskButtonClick();
  }

  handleDrawerToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleAddTagButtonClick() {
    this.setState({
      isEditTag: !this.state.isEditTag
    });
  }

  handleCloseTagForm() {
    this.setState({
      isEditTag: false
    });
  }

  handleNewTag(tag) {
    this.props.handleNewTag(tag);
  }

  getTagArea() {
    if (!this.props.createTag) return null;
    if (this.state.isEditTag) {
      return (
        <React.Fragment>
          <IconButton
            style={{ color: "white", marginLeft: "4px" }}
            onClick={this.handleAddTagButtonClick}
          >
            <LabelIcon fontSize="small" />
          </IconButton>
          <TagForm onSubmit={this.handleNewTag} clear={true} />
          <IconButton
            size="small"
            onClick={this.handleCloseTagForm}
            style={{ color: indigo[100] }}
          >
            <HighlightOffIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    } else {
      return (
        <Tooltip title="Create new tag" style={{ marginLeft: "4px" }}>
          <IconButton
            onClick={this.handleAddTagButtonClick}
            disableRipple
            style={{ color: indigo[100], marginLeft: "4px" }}
          >
            <LabelIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      );
    }
  }

  getNewTaskButton() {
    if (!this.props.taskButton) return null;
    return (
      <Tooltip title="Create new task">
        <IconButton
          onClick={this.handleAddTaskButtonClick}
          style={{ color: indigo[100], marginLeft: "4px" }}
          disableRipple
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    );
  }

  handleCancel() {
    this.setState({
      isExist: false
    });
  }

  getMenuItem() {
    return drawerList.map(item =>
      new RegExp(item.href).test(window.location.href) ? (
        <ListItem
          button
          disableRipple
          key={item.text}
          component="a"
          href={item.href}
          style={{
            backgroundColor: indigo[50]
          }}
        >
          <ListItemIcon
            style={{
              color: indigo[900]
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ) : (
        <ListItem button key={item.text} component="a" href={item.href}>
          <ListItemIcon
            style={{
              color: indigo[300]
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      )
    );
  }

  getDrawer() {
    return (
      <div>
        <Toolbar>
          <AccountCircleIcon />
          <Typography style={{ marginLeft: "5px", fontSize: "1.5rem" }}>
            {this.props.user}
          </Typography>
        </Toolbar>

        <Divider />
        <List>
          {this.getMenuItem()}
          <Divider />
          <ListItem
            button
            key="logout"
            onClick={() => {
              this.setState({ isExist: true });
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout"></ListItemText>
          </ListItem>
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
              {this.props.title}
            </Typography>
            {this.getNewTaskButton()}
            {this.getTagArea()}
            <Box marginLeft="5px">{this.props.buttons}</Box>
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
              PaperProps={{ style: { width: drawerWidth } }}
            >
              {this.getDrawer()}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              variant="permanent"
              open
              PaperProps={{ style: { width: drawerWidth } }}
            >
              {this.getDrawer()}
            </Drawer>
          </Hidden>
          <Dialog open={this.state.isExist}>
            <DialogTitle>Are you sure you want to logout?</DialogTitle>
            <DialogActions>
              <Button color="secondary" href="/sessions/logout">
                Yes
              </Button>
              <Button onClick={this.handleCancel} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </StyledBox>
      </React.Fragment>
    );
  }
}

export default Nav;
