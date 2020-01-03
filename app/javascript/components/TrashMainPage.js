import React from "react";
import Rails from "@rails/ujs";
import DeletedTasks from "./DeletedTasks";
import Nav from "./Nav";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DeleteConfirmation from "./DeleteConfirmation";
import { indigo } from "@material-ui/core/colors";
class TrashMainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      confirmationOpen: false
    };
    this.removeTask = this.removeTask.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRecover = this.handleRecover.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.handleEmptyTrash = this.handleEmptyTrash.bind(this);
    this.handleToggleOpen = this.handleToggleOpen.bind(this);
    this.getEmptyTrashButton = this.getEmptyTrashButton.bind(this);
  }

  removeTask(id) {
    var newTasks = this.state.tasks.slice();
    for (var i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id == id) {
        newTasks.splice(i, 1);
        break;
      }
    }
    return newTasks;
  }

  handleDelete(id) {
    var newTasks = this.removeTask(id);
    this.setState({
      tasks: newTasks
    });
  }

  handleRecover(id) {
    var newTasks = this.removeTask(id);
    this.setState({
      tasks: newTasks
    });
  }

  renderTasks() {
    if (this.state.tasks.length) {
      return (
        <React.Fragment>
          <DeletedTasks
            tasks={this.state.tasks}
            handleDelete={this.handleDelete}
            handleRecover={this.handleRecover}
          />
        </React.Fragment>
      );
    } else {
      return <em>Your trash is empty...</em>;
    }
  }

  handleEmptyTrash() {
    fetch("/deleted_tasks/destroy", {
      method: "post",
      headers: {
        "X-CSRF-Token": Rails.csrfToken()
      },
      credentials: "same-origin"
    }).then(() => {
      this.setState({
        tasks: [],
        confirmationOpen: false
      });
    });
  }

  handleToggleOpen() {
    this.setState({
      confirmationOpen: !this.state.confirmationOpen
    });
  }

  getEmptyTrashButton() {
    return (
      <React.Fragment>
        <Button
          onClick={this.handleToggleOpen}
          disabled={this.state.tasks.length == 0}
          size="small"
          color="primary"
          variant="contained"
        >
          Empty trash
        </Button>
        <DeleteConfirmation
          open={this.state.confirmationOpen}
          handleDelete={this.handleEmptyTrash}
          handleCancel={this.handleToggleOpen}
          title="Are you sure you want to delete all tasks in trash permantly?"
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <Nav title="Trash" user={this.props.user} />
        <main style={{ flexGrow: 1, padding: "0px 20px 10px 10px" }}>
          <Toolbar />
          <Box padding="20px">
            {this.getEmptyTrashButton()}
            {this.renderTasks()}
          </Box>
        </main>
      </div>
    );
  }
}

export default TrashMainPage;
