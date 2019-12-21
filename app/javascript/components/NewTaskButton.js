import React from "react"
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class NewTaskButton extends React.Component {
  render () {
    return (
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        size="small"
        onClick={this.props.onClick}
      >Add new task
      </Button>
    );
  }
}

export default NewTaskButton
