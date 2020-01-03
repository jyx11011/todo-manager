import React from "react";
import TagForm from "./TagForm";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Typography
} from "@material-ui/core";
class TagListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(tag) {
    this.props.handleEdit(tag);
    this.setState({
      isEdit: false
    });
  }

  handleEditClick() {
    this.setState({
      isEdit: true
    });
  }

  handleCancel() {
    this.setState({
      isEdit: false
    });
  }

  handleDelete() {
    this.props.handleDelete(this.props.tag.id);
  }
  getTagName() {
    if (this.state.isEdit) {
      return (
        <React.Fragment>
          <TagForm
            tag={this.props.tag}
            handleEdit={this.handleEdit}
            text="save"
          ></TagForm>
          <IconButton size="small" onClick={this.handleCancel}>
            <HighlightOffIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <ListItemText>
            {this.props.tag.name}
            <IconButton
              size="small"
              onClick={this.handleEditClick}
              style={{ marginLeft: "2px" }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </ListItemText>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.getTagName()}
        <ListItemSecondaryAction>
          <Button
            variant="contained"
            size="small"
            style={{ padding: "5px 0" }}
            onClick={this.handleDelete}
            color="secondary"
          >
            <Typography style={{ fontSize: "0.6rem" }}>Delete</Typography>
          </Button>
        </ListItemSecondaryAction>
      </React.Fragment>
    );
  }
}

export default TagListItem;
