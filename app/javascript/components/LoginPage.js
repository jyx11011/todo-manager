import React from "react";
import Rails from "@rails/ujs";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Input, TextField } from "@material-ui/core";
import { FormLabel, FormHelperText } from "@material-ui/core";
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name ? props.name : "",
      password: "",
      helperText: ""
    };
    this.getMessage = this.getMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getMessage() {
    if (this.props.name) {
      return "Congratulation! You have successfully registered! Please login to access your todo manager.";
    } else {
      return (
        <React.Fragment>
          Please login to access your todo manager.
          <em style={{ fontSize: "0.8em" }}>
            Do not have an account yet? <a href="/users/new">Register</a> now!
          </em>
        </React.Fragment>
      );
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var params = new URLSearchParams();
    params.set("user[name]", this.state.name);
    params.set("user[password]", this.state.password);
    fetch("/sessions", {
      method: "post",
      body: params,
      headers: {
        "X-CSRF-Token": Rails.csrfToken()
      },
      credentials: "same-origin"
    }).then(response => {
      if (response.ok) {
        window.location = "/tasks";
      } else {
        this.setState({
          helperText: "wrong handles or password"
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <Box display="flex" width="100%">
              <Box width="100%">
                <Typography variant="h6">Todo manager</Typography>
              </Box>
              <Box>
                <Button href="/users/new">Register</Button>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Box padding="20px">
          <Typography>{this.getMessage()}</Typography>
        </Box>
        <Box marginTop="50px">
          <form onSubmit={this.handleSubmit}>
            <Grid container>
              <Grid item md={5} xs={2}></Grid>
              <Grid item md={7} xs={10}>
                <Box display="flex">
                  <FormLabel>Handle</FormLabel>
                </Box>
                <Box>
                  <TextField
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                    variant="outlined"
                    margin="dense"
                    required
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={5} xs={2}></Grid>
              <Grid item md={7} xs={10}>
                <Box display="flex">
                  <FormLabel>Password</FormLabel>
                </Box>
                <Box>
                  <TextField
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    variant="outlined"
                    margin="dense"
                    required
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={5} xs={2}></Grid>
              <Grid item md={7} xs={10}>
                <FormHelperText error margin="dense">
                  {this.state.helperText}
                </FormHelperText>
              </Grid>
            </Grid>
            <Grid container style={{ margin: "2px" }}>
              <Grid item md={5} xs={2}></Grid>
              <Grid item md={7} xs={10}>
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </React.Fragment>
    );
  }
}

export default LoginPage;
