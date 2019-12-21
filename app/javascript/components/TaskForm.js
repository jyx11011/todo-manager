import React from "react";
import DoneCheckCircle from "./DoneCheckCircle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Container, TextField } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.description == null && props.isDone == null) {
      this.state = {
        isDone: false,
        description: "",
        isEdit: false,
        error: false,
        helperText: " "
      };
    } else {
      this.state = {
        isDone: props.isDone,
        description: props.description,
        isEdit: true,
        error: false,
        helperText: " "
      };
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleIsDone = this.toggleIsDone.bind(this);
  }

  toggleIsDone() {
    this.setState({
      isDone: !this.state.isDone
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error:false,
      helperText:" "
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.description) {
      this.setState({
        error: true,
        helperText: "task cannot be empty"
      });
      return;
    }
    if (this.state.isEdit) {
      this.props.onSubmit(this.state.isDone, this.state.description);
      return;
    }
    var params = new URLSearchParams();
    params.set("task[description]", this.state.description);
    params.set("task[isDone]", this.state.isDone);
    fetch("/tasks", {
      method: "post",
      body: params,
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(_response => {
      location.reload();
    });
  }

  render() {
    return (
      <React.Fragment>
        <ListItemIcon>
          <DoneCheckCircle
            checked={this.state.isDone}
            toggle={this.toggleIsDone}
          />
        </ListItemIcon>

        <Container style={{ padding: 0 }}>
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
                  helperText={this.state.helperText}
                  variant="outlined"
                  margin="dense"
                ></TextField>
              </Grid>
              <Grid container direction="row" justify="flex-end" spacing={1}>
                <Grid item>
                  <Button type="submit" size="small" variant="contained">
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={this.props.cancel}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}

export default TaskForm;
