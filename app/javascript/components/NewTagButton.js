import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

class NewTagButton extends React.Component {
  render() {
    return (
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        size="small"
        onClick={this.props.onClick}
      >
        Create new tag
      </Button>
    );
  }
}

export default NewTagButton;
