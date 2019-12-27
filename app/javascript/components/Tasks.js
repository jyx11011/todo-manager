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
    this.handleEditTask = this.handleEditTask.bind(this);
    this.renderNewTaskArea = this.renderNewTaskArea.bind(this);
    this.state = {
      isEditingNewTask: false
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
    this.props.handleDeleteTask(id);
  }

  handleNewTask(task) {
    this.props.handleNewTask(task);
    this.setState({
      isEditingNewTask: false
    });
  }

  handleEditTask(task) {
    this.props.handleEditTask(task);
  }

  getNewTaskButton() {
    return <NewTaskButton onClick={this.handleClick}/>;
  }

  renderTasks() {
    var items = [];
    for (var i = 0; i < this.props.tasks.length; i++) {
      items.push(
        <Task
          task={this.props.tasks[i]}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEditTask}
          key={this.props.tasks[i].id}
          allTags={this.props.allTags}
        />
      );
      items.push(
        <Divider
          variant="middle"
          key={"div" + this.props.tasks[i].id}
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
            allTags={this.props.allTags}
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
