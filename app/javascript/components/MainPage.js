import React from "react";
import SearchBar from "./SearchBar";
import Tasks from "./Tasks";
import TagForm from "./TagForm";
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTags: props.tags,
      allTasks: props.tasks,
      tagsChosen: [],
      tagsNotChosen: props.tags
    };
    this.handleNewTag = this.handleNewTag.bind(this);
    this.handleMoveTag = this.handleMoveTag.bind(this);
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

  handleSearch() {
    
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar
          tagsChosen={this.state.tagsChosen}
          tagsNotChosen={this.state.tagsNotChosen}
          handleMoveTag={this.handleMoveTag}
        ></SearchBar>
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
