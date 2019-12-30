import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";
class DeleteConfirmation extends React.Component {
  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogActions>
          <Button onClick={this.props.handleDelete} color="secondary">
            Yes
          </Button>
          <Button onClick={this.props.handleCancel} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeleteConfirmation;
