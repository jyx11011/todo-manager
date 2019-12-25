import React from "react";
import getTaskParams from "./util";
import DoneCheckCircle from "./DoneCheckCircle";
import TaskForm from "./TaskForm";
import TaskButtons from "./TaskButtons";
import Tag from "./Tag";
import Box from "@material-ui/core/Box";

import { Typography } from "@material-ui/core";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.task.description,
      isDone: props.task.isDone,
      tags: props.task.tags,
      isEdit: false
    };
    this.toggleIsDone = this.toggleIsDone.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getEditForm = this.getEditForm.bind(this);
    this.getTask = this.getTask.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.handleDeleteTag = this.handleDeleteTag.bind(this);
    this.renderTags = this.renderTags.bind(this);
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
      this.onEditSubmit({ isDone: !isDone });
    }
  }

  handleDeleteTag(tag) {
    var newTags = this.state.tags.slice();
    newTags.splice(newTags.indexOf(tag), 1);
    this.setState({
      tags: newTags
    });
    this.onEditSubmit({ tags: newTags });
  }

  onEditSubmit(task) {
    var id = this.props.task.id;
    fetch("/tasks/" + id + getTaskParams(task), {
      method: "put"
    })
      .then(response => response.json())
      .then(newTask => {
        if (this.state.isEdit) {
          var newState = task;
          newState["isEdit"] = false;
          this.setState(newState);
        }
        this.props.handleEdit(newTask);
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

  getEditForm() {
    return (
      <Box display="flex">
        <TaskForm
          description={this.state.description}
          isDone={this.state.isDone}
          tags={this.state.tags}
          cancel={this.handleCancel}
          onSubmit={this.onEditSubmit}
          allTags={this.props.allTags}
        ></TaskForm>
      </Box>
    );
  }

  renderTags() {
    return this.state.tags.map((tag, index) => {
      return (
        <Tag
          key={tag.id}
          tag={tag}
          handleDelete={this.handleDeleteTag}
          deletable={2}
        />
      );
    });
  }

  getTask() {
    return (
      <Box display="flex">
        <Box>
          <DoneCheckCircle
            checked={this.state.isDone}
            toggle={this.toggleIsDone}
          />
        </Box>
        <Box width="100%" paddingTop="10px" marginBottom="5px">
          <Typography>
            {this.state.description}
            {this.renderTags()}
          </Typography>
        </Box>
        <Box>
          <TaskButtons
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
          />
        </Box>
      </Box>
    );
  }
  render() {
    return this.state.isEdit ? this.getEditForm() : this.getTask();
  }
}

export default Task;
