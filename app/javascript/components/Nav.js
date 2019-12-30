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
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import TagForm from "./TagForm";
import { Tooltip } from "@material-ui/core";

const drawerWidth = 240;

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
    href: "/tasks"
  },
  {
    text: "Tags",
    href: "/tags"
  },
  {
    text: "Trash",
    href: "/trash"
  }
];

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isEditTag: false
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.getDrawer = this.getDrawer.bind(this);
    this.handleAddTaskButtonClick = this.handleAddTaskButtonClick.bind(this);
    this.handleAddTagButtonClick = this.handleAddTagButtonClick.bind(this);
    this.getTagArea = this.getTagArea.bind(this);
    this.handleCloseTagForm = this.handleCloseTagForm.bind(this);
    this.handleNewTag = this.handleNewTag.bind(this);
    this.getNewTaskButton = this.getNewTaskButton.bind(this);
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
          <IconButton size="small" onClick={this.handleCloseTagForm}>
            <HighlightOffIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    } else {
      return (
        <Tooltip title="Create new tag" style={{ marginLeft: "4px" }}>
          <IconButton onClick={this.handleAddTagButtonClick} disableRipple>
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
          style={{ marginLeft: "4px" }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    );
  }
  getDrawer() {
    return (
      <div>
        <Toolbar />
        <Divider />
        <List>
          {drawerList.map(item => (
            <ListItem button key={item.text} component="a" href={item.href}>
              <ListItemText primary={item.text} />
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
              {this.props.title}
            </Typography>
            {this.getNewTaskButton()}
            {this.getTagArea()}
            {this.props.buttons}
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
        </StyledBox>
      </React.Fragment>
    );
  }
}

export default Nav;
