import React from "react";
import LabelIcon from "@material-ui/icons/Label";
import Grid from "@material-ui/core/Grid";
import { TextField, Button } from "@material-ui/core";
class TagForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      helperText: null,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      name: e.target.value,
      helperText: "",
      error: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.name.trim().length == 0) {
      this.setState({
        error: true,
        helperText: "name cannot be empty"
      });
      return;
    }
    var params = new URLSearchParams();
    params.set("tag[name]", this.state.name);
    fetch("/tags", {
      method: "post",
      body: params,
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(tag => {
        this.props.onSubmit(tag);
        this.setState({
          name: ""
        });
      });
  }
  render() {
    return (
      <form action="/tags" method="post" onSubmit={this.handleSubmit}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <LabelIcon fontSize="small" />
          </Grid>
          <Grid item>
            <TextField
              name="[tag]name"
              value={this.state.name}
              onChange={this.handleChange}
              error={this.state.error}
              placeholder={this.state.helperText}
            ></TextField>
            <Button type="submit" variant="contained" size="small">
              create
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default TagForm;
