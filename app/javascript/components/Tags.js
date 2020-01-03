import React from "react";
import Rails from "@rails/ujs";
import TagForm from "./TagForm";
import List from "@material-ui/core/List";
import { ListItem, Button, IconButton, Divider } from "@material-ui/core";
import TagListItem from "./TagListItem";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import LabelIcon from "@material-ui/icons/Label";

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreate: false
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNewTag = this.handleNewTag.bind(this);
    this.getNewTagArea = this.getNewTagArea.bind(this);
    this.handleNewTagButtonClick = this.handleNewTagButtonClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.renderTags = this.renderTags.bind(this);
  }

  handleEdit(tag) {
    this.props.handleEdit(tag);
  }

  handleDelete(id) {
    fetch("./tags/" + id, {
      method: "delete",
      headers: {
        "X-CSRF-Token": Rails.csrfToken()
      },
      credentials: "same-origin"
    }).then(response => {
      this.props.handleDelete(id);
    });
  }

  handleNewTag(tag) {
    this.props.handleNewTag(tag);
    this.setState({
      isCreate: false
    });
  }

  handleCancel() {
    this.setState({
      isCreate: false
    });
  }

  getNewTagArea() {
    if (this.state.isCreate) {
      return (
        <React.Fragment>
          <TagForm onSubmit={this.handleNewTag} />
          <IconButton size="small" onClick={this.handleCancel}>
            <HighlightOffIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {this.props.tags.length == 0 ? "You have no tags yet..." : null}
          {this.getNewTagButton()}
        </React.Fragment>
      );
    }
  }

  handleNewTagButtonClick() {
    this.setState({
      isCreate: true
    });
  }

  getNewTagButton() {
    return (
      <Button
        startIcon={<LabelIcon />}
        onClick={this.handleNewTagButtonClick}
        size="small"
        variant="contained"
        color="primary"
      >
        Create new tag
      </Button>
    );
  }

  renderTags() {
    var list = [];
    for (var i = 0; i < this.props.tags.length; i++) {
      var tag = this.props.tags[i];
      list.push(
        <ListItem key={tag.id}>
          <TagListItem
            tag={tag}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
          />
        </ListItem>
      );
      list.push(<Divider variant="middle" key={"d" + tag.id} />);
    }
    return list;
  }

  render() {
    return (
      <List>
        {this.renderTags()}
        <ListItem key="#new">{this.getNewTagArea()}</ListItem>
      </List>
    );
  }
}

export default Tags;
