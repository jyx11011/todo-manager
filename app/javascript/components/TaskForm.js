import React from "react";
import Rails from "@rails/ujs";
import DoneCheckCircle from "./DoneCheckCircle";
import getTaskParams from "./util";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import AddTagForm from "./AddTagForm";
import Box from "@material-ui/core/Box";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.description == null && props.isDone == null) {
      this.state = {
        isDone: false,
        description: "",
        isEdit: false,
        error: false,
        helperText: null,
        tags: []
      };
    } else {
      this.state = {
        isDone: props.isDone,
        description: props.description,
        isEdit: true,
        error: false,
        helperText: null,
        tags: props.tags
      };
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleIsDone = this.toggleIsDone.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
  }

  toggleIsDone() {
    this.setState({
      isDone: !this.state.isDone
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: false,
      helperText: null
    });
  }

  handleTagChange(tags) {
    this.setState({
      tags: tags
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.description.trim()) {
      this.setState({
        error: true,
        helperText: "task cannot be empty"
      });
      return;
    }
    if (this.state.isEdit) {
      this.props.onSubmit({
        isDone: this.state.isDone,
        description: this.state.description,
        tags: this.state.tags
      });
      return;
    }
    var params = getTaskParams({
      isDone: this.state.isDone,
      description: this.state.description,
      tags: this.state.tags
    });
    fetch("/tasks" + params, {
      method: "post",
      headers: {
        "X-CSRF-Token": Rails.csrfToken()
      },
      credentials: "same-origin"
    })
      .then(response => {
        return response.json();
      })
      .then(task => {
        this.props.handleNewTask(task);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Box>
          <DoneCheckCircle
            checked={this.state.isDone}
            toggle={this.toggleIsDone}
          />
        </Box>
        <Box width="100%" margin="0 10px 8px 0">
          <form action="/tasks" method="post" onSubmit={this.handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  value={this.state.description}
                  name="description"
                  onChange={this.handleChange}
                  multiline
                  fullWidth
                  autoFocus
                  error={this.state.error}
                  placeholder={this.state.helperText}
                  variant="outlined"
                  margin="dense"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <AddTagForm
                  tags={this.state.tags}
                  allTags={this.props.allTags}
                  onChange={this.handleTagChange}
                />
              </Grid>
              <Grid container direction="row" justify="flex-end" spacing={1}>
                <Grid item>
                  <Button type="submit" size="small" variant="outlined">
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={this.props.cancel}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </React.Fragment>
    );
  }
}

export default TaskForm;
