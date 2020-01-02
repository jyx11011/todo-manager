import React from "react";
import Button from "@material-ui/core/Button";
import Rails from "@rails/ujs";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  TextField,
  FormLabel,
  FormHelperText,
  Typography
} from "@material-ui/core";

const nameRegex = /^[0-9a-zA-Z]*$/;
const passwordRegex = /^[0-9a-zA-Z_]*$/;
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      passwordConfirm: "",
      nameText: "",
      passwordText: "",
      passwordConfirmText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  validate() {
    var ok = true;
    var nameText = "";
    var passwordText = "";
    var passwordConfirmText = "";
    if (!nameRegex.test(this.state.name)) {
      nameText = "Handle can only contain 0-9, a-z or A-Z";
      ok = false;
    } else if (this.state.name.length > 20) {
      nameText = "Handle cannot be longer than 20 characters";
      ok = false;
    }

    if (!passwordRegex.test(this.state.password)) {
      passwordText =
        "Password can only contain 0-9, a-z, A-Z and _(underscore)";
      ok = false;
    } else if (
      this.state.password.length < 6 ||
      this.state.password.length > 20
    ) {
      passwordText =
        "Password should have at least 6 characters and no more than 20 characters";
      ok = false;
    }
    if (this.state.passwordConfirm != this.state.password) {
      passwordConfirmText = "different password";
      ok = false;
    }
    this.setState({
      nameText: nameText,
      passwordText: passwordText,
      passwordConfirmText: passwordConfirmText
    });
    return ok;
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.validate()) return;
    var params = new URLSearchParams();
    params.set("user[name]", this.state.name);
    params.set("user[password]", this.state.password);
    fetch("/users", {
      method: "post",
      body: params,
      headers: {
        "X-CSRF-Token": Rails.csrfToken()
      },
      credentials: "same-origin"
    })
      .then(response => {
        if (!response.ok) {
          return response.json();
        } else {
          window.location = "/sessions/new";
        }
      })
      .then(error => {
        console.log(error);
        this.setState({
          nameText: error.name[0]
        });
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
                <Button href="/sessions/new">Login</Button>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box marginTop="20%">
          <form action="/users" method="post" onSubmit={this.handleSubmit}>
            <Grid container>
              <Grid item xs={5}></Grid>
              <Grid item xs={7}>
                <Box display="flex">
                  <FormLabel>Handle</FormLabel>
                  <FormHelperText
                    margin="dense"
                    error
                    style={{ marginLeft: "10px" }}
                  >
                    {this.state.nameText}
                  </FormHelperText>
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
              <Grid item xs={5}></Grid>
              <Grid item xs={7}>
                <Box display="flex">
                  <FormLabel>Password</FormLabel>
                  <FormHelperText
                    margin="dense"
                    error
                    style={{ marginLeft: "10px" }}
                  >
                    {this.state.passwordText}
                  </FormHelperText>
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
              <Grid item xs={5}></Grid>
              <Grid item xs={7}>
                <Box display="flex">
                  <FormLabel>Confirm password</FormLabel>
                  <FormHelperText
                    margin="dense"
                    error
                    style={{ marginLeft: "10px" }}
                  >
                    {this.state.passwordConfirmText}
                  </FormHelperText>
                </Box>
                <Box>
                  <TextField
                    type="password"
                    name="passwordConfirm"
                    onChange={this.handleChange}
                    value={this.state.passwordConfirm}
                    variant="outlined"
                    margin="dense"
                    required
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "10px" }}>
              <Grid item xs={5}></Grid>
              <Grid item xs={7}>
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </React.Fragment>
    );
  }
}

export default RegisterPage;
