import React from "react";
import Rails from "@rails/ujs";
import Grid from "@material-ui/core/Grid";
import { TextField, Button } from "@material-ui/core";
class TagForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.tag ? props.tag.name : "",
      helperText: null,
      error: false,
      isEdit: props.tag ? true : false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(e) {
    this.setState({
      name: e.target.value,
      helperText: "",
      error: false
    });
  }

  handleEdit() {
    var params = new URLSearchParams();
    params.set("tag[name]", this.state.name.trim());
    var id = this.props.tag.id;
    fetch("/tags/" + id, {
      method: "put",
      body: params,
      headers: {
        "X-CSRF-Token": Rails.csrfToken()
      },
      credentials: "same-origin"
    })
      .then(response => {
        if (response.ok) return response.json();
        else throw Error();
      })
      .then(tag => {
        this.props.handleEdit(tag);
      })
      .catch(error => {
        this.setState({
          helperText: "exists already",
          error: true
        });
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
    if (this.state.isEdit) {
      this.handleEdit();
      return;
    }
    var params = new URLSearchParams();
    params.set("tag[name]", this.state.name.trim());
    fetch("/tags", {
      method: "post",
      body: params,
      headers: {
        "X-CSRF-Token": Rails.csrfToken()
      },
      credentials: "same-origin"
    })
      .then(response => {
        if (response.ok) return response.json();
        else throw Error();
      })
      .then(tag => {
        this.props.onSubmit(tag);
        if (this.props.clear) {
          this.setState({
            name: ""
          });
        }
      })
      .catch(error => {
        this.setState({
          helperText: "exists already",
          error: true
        });
      });
  }
  render() {
    return (
      <form action="/tags" method="post" onSubmit={this.handleSubmit}>
        <TextField
          name="[tag]name"
          value={this.state.name}
          onChange={this.handleChange}
          error={this.state.error}
          helperText={this.state.helperText}
        ></TextField>
        <Button type="submit" variant="contained" size="small">
          {this.props.text ? this.props.text : "create"}
        </Button>
      </form>
    );
  }
}

export default TagForm;
