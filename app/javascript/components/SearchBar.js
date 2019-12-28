import React from "react";
import Tag from "./Tag";
import getTaskParams from "./util";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import { Divider } from "@material-ui/core";

const filterBoxStyle = {
  display: "flex",
  padding: "1px 5px"
};

const tagsBoxStyle = {
  display: "flex",
  flexWrap: "wrap",
  margin: "0 8px 0 8px",
  padding: "2px"
};

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
    this.getTagsIcon = this.getTagsIcon.bind(this);
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
    var params = this.props.tagsChosen.length
      ? getTaskParams({ tags: this.props.tagsChosen })
      : "?task[tag_ids]=all";
    fetch("./tasks" + params, {
      method: "get"
    })
      .then(response => response.json())
      .then(tasks => this.props.handleSearch(tasks));
  }

  getTagsIcon() {
    if (!this.state.filterOpened && this.props.tagsNotChosen.length) {
      return (
        <IconButton
          size="small"
          disableRipple
          onClick={this.handleFilterButtonClick}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      );
    }
  }

  render() {
    return (
      <Box>
        <Box
          style={filterBoxStyle}
          border={1}
          borderColor="grey.300"
          borderRadius="2em"
          display="flex"
        >
          <Box display="flex">
            <IconButton
              size="small"
              onClick={this.handleFilterButtonClick}
              disableRipple
            >
              <FilterListIcon fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" />
          </Box>
          <Box width="100%" display="flex" flexWrap="wrap">
            {this.props.tagsChosen.map(tag => {
              return (
                <Tag
                  key={tag.id}
                  tag={tag}
                  deletable={1}
                  handleDelete={this.handleTagDeleteClick}
                />
              );
            })}
            {this.getTagsIcon()}
          </Box>
          <Box display="flex">
            {this.props.tagsChosen.length ? (
              <IconButton
                size="small"
                disableRipple
                onClick={this.props.handleClearAllTags}
              >
                <HighlightOffIcon fontSize="small" />
              </IconButton>
            ) : null}
            <Divider orientation="vertical" />
            <IconButton size="small" disableRipple onClick={this.handleSearch}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
        <Collapse in={this.state.filterOpened}>
          <Box style={tagsBoxStyle}>
            {this.props.tagsNotChosen.length ? (
              this.props.tagsNotChosen.map(tag => {
                return (
                  <Tag
                    key={tag.id}
                    tag={tag}
                    deletable={0}
                    handleClick={this.handleTagClick}
                  />
                );
              })
            ) : (
              <em>No more tags...</em>
            )}
            <IconButton onClick={this.handleFilterButtonClick} size="small">
              <CancelPresentationIcon fontSize="small" />
            </IconButton>
          </Box>
        </Collapse>
      </Box>
    );
  }
}

export default SearchBar;
