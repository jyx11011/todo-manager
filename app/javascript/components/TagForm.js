import React from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@material-ui/core";
class TagForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var params = new URLSearchParams();
    params.set("tag[name]", this.state.name);
    fetch("/tags", {
      method: "post",
      body: params,
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(_response=>{
      this.setState({
        name:''
      });
    });
  }
  render() {
    return (
      <form action="/tags" method="post" onSubmit={this.handleSubmit}>
        <TextField
        name="[tag]name"
        value={this.state.name}
        onChange={this.handleChange}>
        </TextField>
        <Button type="submit" variant="contained" size="small">create</Button>
      </form>
    );
  }
}

export default TagForm;
