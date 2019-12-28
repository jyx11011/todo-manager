import React from "react";
import SearchBar from "./SearchBar";
import Tasks from "./Tasks";
import Nav from "./Nav";
import { Toolbar } from "@material-ui/core";
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTags: props.tags,
      allTasks: props.tasks,
      tagsChosen: [],
      tagsNotChosen: props.tags,
      tasksShown: props.tasks
    };
    this.handleNewTag = this.handleNewTag.bind(this);
    this.handleMoveTag = this.handleMoveTag.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClearAllTags = this.handleClearAllTags.bind(this);
    this.handleAddTaskButtonClick = this.handleAddTaskButtonClick.bind(this);
  }

  handleNewTag(tag) {
    var newAllTags = this.state.allTags.slice();
    newAllTags = newAllTags.concat([tag]);
    var newTagsNotChosen = this.state.tagsNotChosen.slice();
    newTagsNotChosen = newTagsNotChosen.concat([tag]);
    this.setState({
      allTags: newAllTags,
      tagsNotChosen: newTagsNotChosen
    });
  }

  handleMoveTag(tag) {
    var newTagsChosen = this.state.tagsChosen.slice();
    var newTagsNotChosen = this.state.tagsNotChosen.slice();
    if (newTagsChosen.includes(tag)) {
      newTagsChosen.splice(newTagsChosen.indexOf(tag), 1);
      newTagsNotChosen = newTagsNotChosen.concat([tag]);
    } else {
      newTagsNotChosen.splice(newTagsNotChosen.indexOf(tag), 1);
      newTagsChosen = newTagsChosen.concat([tag]);
    }
    this.setState({
      tagsNotChosen: newTagsNotChosen,
      tagsChosen: newTagsChosen
    });
  }

  handleDeleteTask(id) {
    var newTasks = this.state.tasksShown.slice();
    var newAllTasks = this.state.allTasks.slice();
    for (var i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id == id) {
        newTasks.splice(i, 1);
        break;
      }
    }
    for (var i = 0; i < newAllTasks.length; i++) {
      if (newAllTasks[i].id == id) {
        newAllTasks.splice(i, 1);
        break;
      }
    }
    this.setState({
      tasksShown: newTasks,
      allTags: newAllTasks
    });
  }

  handleNewTask(task) {
    var newTasks = this.state.tasksShown.slice();
    var newAllTasks = this.state.allTasks.slice();
    newTasks = newTasks.concat([task]);
    newAllTasks = newAllTasks.concat([task]);
    this.setState({
      tasksShown: newTasks,
      allTasks: newAllTasks
    });
  }

  handleEditTask(task) {
    var newTasks = this.state.allTasks.slice();
    newTasks.map(t => (t.id == task ? task : t));
    this.setState({
      allTasks: newTasks
    });
  }

  handleSearch(result) {
    this.setState({
      tasksShown: result
    });
  }

  handleClearAllTags() {
    this.setState({
      tagsChosen: [],
      tagsNotChosen: this.state.allTags
    });
  }

  handleAddTaskButtonClick() {
    document.getElementById("new-task").scrollIntoView({
      behavior: "smooth"
    });
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <Nav
          handleAddTaskButtonClick={this.handleAddTaskButtonClick}
          handleNewTag={this.handleNewTag}
        />
        <main style={{ flexGrow: 1, padding: "10px 20px 10px 10px" }}>
          <Toolbar />
          <SearchBar
            tagsChosen={this.state.tagsChosen}
            tagsNotChosen={this.state.tagsNotChosen}
            handleMoveTag={this.handleMoveTag}
            handleSearch={this.handleSearch}
            handleClearAllTags={this.handleClearAllTags}
          ></SearchBar>
          <Tasks
            tasks={this.state.tasksShown}
            allTags={this.state.allTags}
            handleDeleteTask={this.handleDeleteTask}
            handleNewTask={this.handleNewTask}
            handleEditTask={this.handleEditTask}
          ></Tasks>
        </main>
      </div>
    );
  }
}

export default MainPage;
