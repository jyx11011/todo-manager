import React from "react";
import Nav from "./Nav";
import Tags from "./Tags";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";

import PropTypes from "prop-types";
class TagMainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.tags
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNewTag = this.handleNewTag.bind(this);
  }

  handleEdit(tag) {
    var newTags = this.state.tags.map(t => (tag.id == t.id ? tag : t));
    this.setState({
      tags: newTags
    });
  }

  handleDelete(id) {
    var newTags = this.state.tags.slice();
    for (var i = 0; i < newTags.length; i++) {
      if (newTags[i].id == id) {
        newTags.splice(i, 1);
        break;
      }
    }
    this.setState({
      tags: newTags
    });
  }

  handleNewTag(tag) {
    var newTags = this.state.tags.slice();
    newTags = newTags.concat([tag]);
    this.setState({
      tags: newTags
    });
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <Nav title="Tags" createTag={true} handleNewTag={this.handleNewTag} />
        <main style={{ flexGrow: 1, padding: "0px 20px 10px 10px" }}>
          <Toolbar />
          <Box style={{ maxWidth: "600px" }}>
            <Tags
              tags={this.state.tags}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
              handleNewTag={this.handleNewTag}
            />
          </Box>
        </main>
      </div>
    );
  }
}

export default TagMainPage;
