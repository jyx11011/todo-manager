import React from "react";
import DeletedTask from "./DeletedTask";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
class DeletedTasks extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRecover = this.handleRecover.bind(this);
  }

  handleDelete(id) {
    this.props.handleDelete(id);
  }

  handleRecover(id) {
    this.props.handleRecover(id);
  }

  renderTasks() {
    var items = [];
    for (var i = 0; i < this.props.tasks.length; i++) {
      items.push(
        <DeletedTask
          task={this.props.tasks[i]}
          handleDelete={this.handleDelete}
          handleRecover={this.handleRecover}
          key={this.props.tasks[i].id}
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

  render() {
    return this.renderTasks();
  }
}

export default DeletedTasks;
