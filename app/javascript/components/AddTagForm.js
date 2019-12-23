import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from "prop-types";
import { Input } from "@material-ui/core";
class AddTagForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      allTags: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    var options = e.target.value;
    this.setState({
      tags: options
    })
    this.props.onChange(options);
  }

  componentDidMount() {
    fetch("./tags", {
      method: "get"
    })
      .then(response => response.json())
      .then(tags => {
        this.setState({
          allTags: tags.map((tag, index) => {
            return (
              <MenuItem value={tag.id} key={tag.id}>
                {tag.name}
              </MenuItem>
            );
          })
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <React.Fragment>
        <FormControl>
          <Select
            multiple
            value={this.state.tags}
            onChange={this.handleChange}
            input={<Input/>}
          >
            {this.state.allTags}
          </Select>
        </FormControl>
      </React.Fragment>
    );
  }
}

export default AddTagForm;
