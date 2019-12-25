import React from "react";
import Task from "./Task";
import NewTaskButton from "./NewTaskButton";
import TaskForm from "./TaskForm";
import TagForm from "./TagForm";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.getNewTaskButton = this.getNewTaskButton.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleNewTag = this.handleNewTag.bind(this);
    this.renderNewTaskArea = this.renderNewTaskArea.bind(this);
    this.state = {
      tasks: props.data,
      isEditingNewTask: false,
      allTags: props.allTags
    };
  }

  handleCancel() {
    this.setState({
      isEditingNewTask: false
    });
  }

  handleClick() {
    this.setState({
      isEditingNewTask: true
    });
  }

  handleDelete(id) {
    var newTasks = this.state.tasks.slice();
    for (var i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id == id) {
        newTasks.splice(i, 1);
        break;
      }
    }
    this.setState({
      tasks: newTasks
    });
  }

  handleNewTask(task) {
    var newTasks = this.state.tasks.slice();
    newTasks = newTasks.concat([task]);
    this.setState({
      tasks: newTasks,
      isEditingNewTask: false
    });
  }

  handleNewTag(tag) {
    var newAllTags = this.state.allTags.slice();
    newAllTags = newAllTags.concat([tag]);
    this.setState({
      allTags: newAllTags
    });
  }

  getNewTaskButton() {
    return <NewTaskButton onClick={this.handleClick} />;
  }

  renderTasks() {
    var items = [];
    for (var i = 0; i < this.state.tasks.length; i++) {
      items.push(
        <Task
          task={this.state.tasks[i]}
          handleDelete={this.handleDelete}
          key={this.state.tasks[i].id}
          allTags={this.state.allTags}
        />
      );
      items.push(
        <Divider
          variant="middle"
          key={"div" + this.state.tasks[i].id}
        ></Divider>
      );
    }
    return items;
  }

  renderNewTaskArea() {
    if (this.state.isEditingNewTask) {
      return (
        <Box display="flex">
          <TaskForm
            task={null}
            cancel={this.handleCancel}
            handleNewTask={this.handleNewTask}
            allTags={this.state.allTags}
          />
        </Box>
      );
    } else {
      return this.getNewTaskButton();
    }
  }

  render() {
    return (
      <Box>
        {this.renderTasks()}
        {this.renderNewTaskArea()}
      </Box>
    );
  }
}

export default Tasks;
