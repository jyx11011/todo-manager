import React from "react";
import DoneCheckCircle from "./DoneCheckCircle";
import TaskForm from "./TaskForm";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from "@material-ui/core";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.task.description,
      isDone: props.task.isDone,
      isEdit: false
    };
    this.toggleIsDone = this.toggleIsDone.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getEditFormListItem = this.getEditFormListItem.bind(this);
    this.getTaskListItem = this.getTaskListItem.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  handleDelete() {
    var id = this.props.task.id;
    fetch("/tasks/" + id, {
      method: "delete"
    }).then(_response => {
      this.props.handleDelete(id);
    });
  }

  toggleIsDone() {
    var isDone = this.state.isDone;
    this.setState({ isDone: !isDone });
    if (!this.state.isEdit) {
      this.onEditSubmit(!isDone, this.state.description);
    }
  }

  onEditSubmit(isDone, description) {
    var params = new URLSearchParams();
    params.set("task[description]", description);
    params.set("task[isDone]", isDone);
    var id = this.props.task.id;
    fetch("/tasks/" + id, {
      method: "put",
      body: params,
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(_response => {
      if (this.state.isEdit) {
        this.setState({
          description: description,
          isDone: isDone,
          isEdit: false
        });
      }
    });
  }

  handleEdit() {
    this.setState({
      isEdit: true
    });
  }

  handleCancel() {
    this.setState({
      isEdit: false
    });
  }

  getEditFormListItem() {
    return (
      <ListItem alignItems="flex-start">
        <TaskForm
          description={this.state.description}
          isDone={this.state.isDone}
          cancel={this.handleCancel}
          onSubmit={this.onEditSubmit}
        ></TaskForm>
      </ListItem>
    );
  }

  getTaskListItem() {
    return (
      <ListItem alignItems="flex-start">
        <ListItemIcon>
          <DoneCheckCircle
            checked={this.state.isDone}
            toggle={this.toggleIsDone}
          />
        </ListItemIcon>
        <ListItemText primary={this.state.description}></ListItemText>
        <ListItemSecondaryAction>
          <IconButton onClick={this.handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={this.handleDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
  render() {
    return this.state.isEdit
      ? this.getEditFormListItem()
      : this.getTaskListItem();
  }
}

export default Task;
