import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Input, Typography, Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box"
import Tag from "./Tag";
class AddTagForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: props.allTags.filter(tag => props.tags.some(t => t.id == tag.id)),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(e) {
    var options = e.target.value;
    this.setState({
      tags: options
    });
    this.props.onChange(options);
  }

  handleDelete(tag) {
    var options = this.state.tags.slice();
    options.splice(options.indexOf(tag), 1);
    this.setState({
      tags: options
    });
    this.props.onChange(options);
  }

  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <Box>
        <FormControl>
          <Select
            multiple
            displayEmpty
            value={this.state.tags}
            onChange={this.handleChange}
            input={<Input/>}
            MenuProps={{PaperProps:{style:{maxHeight: 240}}}}
            renderValue={selected => {
              if (selected.length == 0) {
                return <Typography style={{fontSize: '0.8em'}}>Click to select tags</Typography>;
              } else {
                return (
                  <div style={{display:'flex',flexWrap:"wrap"}}>
                    {selected.map(value => (
                      <Tag key={value.id} tag={value} deletable={0} />
                    ))}
                  </div>
                );
              }
            }}
          >
            {this.props.allTags.map((tag) => {
              return (
                <MenuItem value={tag} key={tag.id}>
                  {tag.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }
}

export default AddTagForm;
