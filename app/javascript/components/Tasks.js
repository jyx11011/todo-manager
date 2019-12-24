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
    this.state = {
      tasks: props.data,
      newTaskArea: null,
      newTaskButton: <NewTaskButton onClick={this.handleClick} />,
      allTags:props.allTags
    };
  }

  handleCancel() {
    this.setState({
      newTaskArea: null,
      newTaskButton: this.getNewTaskButton()
    });
  }

  handleClick() {
    this.setState({
      newTaskArea: (
        <Box display="flex">
          <TaskForm
            task={null}
            cancel={this.handleCancel}
            handleNewTask={this.handleNewTask}
            allTags={this.state.allTags}
          />
        </Box>
      ),
      newTaskButton: null
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
      newTaskArea: null,
      newTaskButton: this.getNewTaskButton()
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

  render() {
    return (
      <Box>
        {this.renderTasks()}
        {this.state.newTaskButton}
        {this.state.newTaskArea}
        <TagForm />
      </Box>
    );
  }
}

export default Tasks;
