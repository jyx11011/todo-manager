import React from "react";
import Tasks from "./Tasks";
import Nav from "./Nav";
import { Toolbar, IconButton, Tooltip } from "@material-ui/core";
import FilterSidePane from "./FilterSidePane";
import FilterListIcon from "@material-ui/icons/FilterList";
import Box from "@material-ui/core/Box";
import { indigo } from "@material-ui/core/colors";

const filterWidth = 240;
const mainStyle = {
  flexGrow: 1,
  padding: "10px 20px 10px 10px",
  marginRight: -filterWidth,
  transition: "margin",
  width: "100%",
  zIndex: 1
};

const mainShiftStyle = {
  padding: "10px 20px 10px 10px",
  marginRight: 0,
  transition: "margin",
  width: "100%"
};

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTags: props.tags,
      allTasks: props.tasks,
      tagsChosen: [],
      tagsNotChosen: props.tags,
      tasksShown: props.tasks,
      filterOpen: false
    };
    this.handleNewTag = this.handleNewTag.bind(this);
    this.handleMoveTag = this.handleMoveTag.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClearAllTags = this.handleClearAllTags.bind(this);
    this.handleAddTaskButtonClick = this.handleAddTaskButtonClick.bind(this);
    this.handleFilterToggle = this.handleFilterToggle.bind(this);
    this.getFilterButton = this.getFilterButton.bind(this);
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
    var newTaskEle = document.getElementById("new-task");
    newTaskEle.scrollIntoView({
      behavior: "smooth"
    });
    if (document.getElementById("new-task-button")) {
      document.getElementById("new-task-button").click();
    }
  }

  handleFilterToggle() {
    this.setState({
      filterOpen: !this.state.filterOpen
    });
  }

  getFilterButton() {
    return (
      <Tooltip title="Toggle task filter">
        <IconButton
          disableRipple
          onClick={this.handleFilterToggle}
          style={{ color: indigo[100], marginLeft: "4px" }}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    );
  }
  render() {
    return (
      <div style={{ display: "flex" }}>
        <Nav
          title="Todo list"
          user={this.props.user}
          taskButton={true}
          createTag={true}
          buttons={this.getFilterButton()}
          handleAddTaskButtonClick={this.handleAddTaskButtonClick}
          handleNewTag={this.handleNewTag}
        />
        <main style={this.state.filterOpen ? mainShiftStyle : mainStyle}>
          <Toolbar />
          <Box padding="20px">
            <Tasks
              tasks={this.state.tasksShown}
              allTags={this.state.allTags}
              handleDeleteTask={this.handleDeleteTask}
              handleNewTask={this.handleNewTask}
              handleEditTask={this.handleEditTask}
            ></Tasks>
          </Box>
        </main>
        <FilterSidePane
          open={this.state.filterOpen}
          handelDrawerToggle={this.handleFilterToggle}
          tagsChosen={this.state.tagsChosen}
          tagsNotChosen={this.state.tagsNotChosen}
          handleMoveTag={this.handleMoveTag}
          handleSearch={this.handleSearch}
          handleClearAllTags={this.handleClearAllTags}
        />
      </div>
    );
  }
}

export default MainPage;
