import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

class NewTaskButton extends React.Component {
  render() {
    return (
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        size="small"
        onClick={this.props.onClick}
        style={{ marginLeft: 10, marginTop: 5 }}
        id="new-task-button"
      >
        Create new task
      </Button>
    );
  }
}

export default NewTaskButton;
