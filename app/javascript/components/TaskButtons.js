import React from "react";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

class TaskButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(e) {
    this.setState({
      open: !this.state.open,
      anchorEl: e.currentTarget
    });
  }

  handleClose() {
    this.setState({
      open: !this.state.open,
      anchorEl: null
    });
  }
  render() {
    return (
      <React.Fragment>
        <IconButton onClick={this.handleClick} disableRipple>
          <MoreHorizIcon />
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "right"
          }}
        >
          <IconButton onClick={this.props.handleEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={this.props.handleDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Popover>
      </React.Fragment>
    );
  }
}

export default TaskButtons;
