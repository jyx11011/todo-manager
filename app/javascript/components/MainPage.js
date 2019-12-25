import React from "react";
import SearchBar from "./SearchBar";
import Tasks from "./Tasks";
import TagForm from "./TagForm";
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTags: props.tags,
      allTasks: props.tasks
    };
    this.handleNewTag = this.handleNewTag.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
  }

  handleNewTag(tag) {
    var newAllTags = this.state.allTags.slice();
    newAllTags = newAllTags.concat([tag]);
    this.setState({
      allTags: newAllTags
    });
  }

  handleDeleteTask(id) {
    var newTasks = this.state.allTasks.slice();
    for (var i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id == id) {
        newTasks.splice(i, 1);
        break;
      }
    }
    this.setState({
      allTasks: newTasks
    });
  }

  handleNewTask(task) {
    var newTasks = this.state.allTasks.slice();
    newTasks = newTasks.concat([task]);
    this.setState({
      allTasks: newTasks
    });
  }

  handleEditTask(task) {
    var newTasks = this.state.allTasks.slice();
    newTasks.map(t => (t.id == task ? task : t));
    this.setState({
      allTasks: newTasks
    });
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar allTags={this.state.allTags}></SearchBar>
        <TagForm onSubmit={this.handleNewTag} />
        <Tasks
          tasks={this.state.allTasks}
          allTags={this.state.allTags}
          handleDeleteTask={this.handleDeleteTask}
          handleNewTask={this.handleNewTask}
          handleEditTask={this.handleEditTask}
        ></Tasks>
      </React.Fragment>
    );
  }
}

export default MainPage;
