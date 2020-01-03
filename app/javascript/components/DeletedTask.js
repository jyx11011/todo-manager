import React from "react";
import DoneCheckCircle from "./DoneCheckCircle";
import DeleteConfirmation from "./DeleteConfirmation";
import Tag from "./Tag";
import Rails from "@rails/ujs";
import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/Delete";
import ReplyIcon from "@material-ui/icons/Reply";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
class DeletedTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationOpen: false
    };
    this.renderTags = this.renderTags.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRecover = this.handleRecover.bind(this);
    this.handleToggleOpen = this.handleToggleOpen.bind(this);
  }

  handleDelete() {
    var id = this.props.task.id;
    fetch("/deleted_tasks/destroy/" + id, {
      method: "post",
      headers: {
        "X-CSRF-Token": Rails.csrfToken()
      },
      credentials: "same-origin"
    }).then(() => {
      this.props.handleDelete(this.props.task.id);
      this.handleToggleOpen();
    });
  }

  handleRecover() {
    var id = this.props.task.id;
    fetch("/deleted_tasks/recover/" + id, {
      method: "post",
      headers: {
        "X-CSRF-Token": Rails.csrfToken()
      },
      credentials: "same-origin"
    }).then(() => {
      this.props.handleRecover(this.props.task.id);
    });
  }

  handleToggleOpen() {
    this.setState({
      confirmationOpen: !this.state.confirmationOpen
    });
  }

  renderButtons() {
    return (
      <React.Fragment>
        <Box marginTop="5px" marginRight="2px">
          <IconButton
            disableRipple
            onClick={this.handleToggleOpen}
            size="small"
            color="secondary"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
          <DeleteConfirmation
            open={this.state.confirmationOpen}
            handleDelete={this.handleDelete}
            handleCancel={this.handleToggleOpen}
            title="Are you sure you want to delete this task permantly?"
          />
        </Box>
        <Box marginTop="5px" marginRight="2px">
          <IconButton disableRipple onClick={this.handleRecover} size="small">
            <ReplyIcon fontSize="small" />
          </IconButton>
        </Box>
      </React.Fragment>
    );
  }
  renderTags() {
    return this.props.task.tags.map(tag => {
      return <Tag key={tag.id} tag={tag} deletable={0} />;
    });
  }

  render() {
    return (
      <Box display="flex">
        <Box>
          <DoneCheckCircle checked={this.props.task.isDone} disabled={true} />
        </Box>
        <Box width="100%" paddingTop="10px" marginBottom="5px">
          <Typography>
            {this.props.task.description}
            {this.renderTags()}
          </Typography>
        </Box>
        <Box display="flex">{this.renderButtons()}</Box>
      </Box>
    );
  }
}

export default DeletedTask;
