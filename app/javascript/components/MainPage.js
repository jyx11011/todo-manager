import React from "react";
import SearchBar from "./SearchBar";
import Tasks from "./Tasks";
import Nav from "./Nav";
import { ThemeProvider, useTheme, Toolbar } from "@material-ui/core";
import createMixins from "@material-ui/core/styles/createMixins";
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

  handleSearch(result) {
    this.setState({
      tasksShown: result
    })
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <Nav />
        <main style={{ flexGrow: 1, padding: '10px 20px 10px 10px'}}>
          <Toolbar/>
          <SearchBar
            tagsChosen={this.state.tagsChosen}
            tagsNotChosen={this.state.tagsNotChosen}
            handleMoveTag={this.handleMoveTag}
            handleSearch={this.handleSearch}
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
