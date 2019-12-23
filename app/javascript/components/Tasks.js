import React from "react";
import Task from "./Task";
import NewTaskButton from "./NewTaskButton";
import TaskForm from "./TaskForm";
import NewTagButton from "./NewTagButton";
import TagForm from "./TagForm";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { Container } from "@material-ui/core";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.renderTaskListItems = this.renderTaskListItems.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.getNewTaskButton = this.getNewTaskButton.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNewTask=this.handleNewTask.bind(this);
    this.state = {
      tasks: props.data,
      newTaskArea: null,
      newTaskButton: <NewTaskButton onClick={this.handleClick} />
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
        <ListItem alignItems="flex-start">
          <TaskForm task={null} cancel={this.handleCancel} handleNewTask={this.handleNewTask}/>
        </ListItem>
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
    newTasks=newTasks.concat([task]);
    this.setState({
      tasks: newTasks,
      newTaskArea: null,
      newTaskButton: this.getNewTaskButton()
    });
  }

  getNewTaskButton() {
    return <NewTaskButton onClick={this.handleClick} />;
  }

  renderTaskListItems() {
    var listItems = [];
    for (var i = 0; i < this.state.tasks.length; i++) {
      listItems.push(
        <Task
          task={this.state.tasks[i]}
          handleDelete={this.handleDelete}
          key={this.state.tasks[i].id}
        />
      );
      listItems.push(
        <Divider
          variant="middle"
          key={"div" + this.state.tasks[i].id}
          component="li"
        ></Divider>
      );
    }
    return listItems;
  }

  render() {
    return (
      <React.Fragment>
        <List style={{ maxWidth: "100%" }}>
          {this.renderTaskListItems()}
          {this.state.newTaskArea}
        </List>
        {this.state.newTaskButton}
        <TagForm />
      </React.Fragment>
    );
  }
}

export default Tasks;
