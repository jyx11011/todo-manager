import React from "react";
import Tag from "./Tag";
import getTaskParams from "./util";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";

import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOpened: false
    };
    this.handleFilterButtonClick = this.handleFilterButtonClick.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
    this.handleTagDeleteClick = this.handleTagDeleteClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleFilterButtonClick() {
    this.setState({
      filterOpened: !this.state.filterOpened
    });
  }

  handleTagClick(tag) {
    this.props.handleMoveTag(tag);
  }

  handleTagDeleteClick(tag) {
    this.props.handleMoveTag(tag);
  }

  handleSearch() {
    var params = getTaskParams({ tags: this.props.tagsChosen });
    fetch("./tasks" + params, {
      method: "get"
    })
      .then(response => response.json())
      .then(tasks => this.props.handleSearch(tasks));
  }

  render() {
    return (
      <Box>
        <Box width="100%" display="flex" flexWrap="wrap">
          <IconButton
            onClick={this.handleFilterButtonClick}
            size="small"
            disableRipple
          >
            <FilterListIcon fontSize="small" />
          </IconButton>
          {this.props.tagsChosen.map((tag, index) => {
            return (
              <Tag
                key={tag.id}
                tag={tag}
                deletable={1}
                handleDelete={this.handleTagDeleteClick}
              />
            );
          })}
        </Box>
        <Collapse in={this.state.filterOpened}>
          <Box display="flex" flexWrap="wrap">
            {this.props.tagsNotChosen.map((tag, index) => {
              return (
                <Tag
                  key={tag.id}
                  tag={tag}
                  deletable={0}
                  handleClick={this.handleTagClick}
                />
              );
            })}
          </Box>
        </Collapse>
        <Button variant="contained" onClick={this.handleSearch} size="small">
          Search
        </Button>
      </Box>
    );
  }
}

export default SearchBar;
