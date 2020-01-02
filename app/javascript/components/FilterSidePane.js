import React from "react";
import Tag from "./Tag";
import Rails from "@rails/ujs";
import getTaskParams from "./util";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {
  Typography,
  Divider,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";

const filterWidth = 240;
class FilterSidePane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsOpened: false,
      finishedChecked: false,
      unfinishedChecked: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.toggleTagsOpen = this.toggleTagsOpen.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
    this.handleTagDeleteClick = this.handleTagDeleteClick.bind(this);
    this.getAddIcon = this.getAddIcon.bind(this);
    this.renderTagsArea = this.renderTagsArea.bind(this);
    this.renderIsDoneArea = this.renderIsDoneArea.bind(this);
    this.toggledChecked = this.toggledChecked.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSearch() {
    var filter = this.props.tagsChosen.length
      ? { tags: this.props.tagsChosen }
      : {};
    if (this.state.finishedChecked != this.state.unfinishedChecked) {
      filter["isDone"] = this.state.finishedChecked;
    }
    var params = getTaskParams(filter);
    fetch("./tasks/filter" + params, {
      method: "get",
      headers: {
        "X-CSRF-Token": Rails.csrfToken()
      },
      credentials: "same-origin"
    })
      .then(response => response.json())
      .then(tasks => {
        this.props.handleSearch(tasks);
      });
  }

  toggleTagsOpen() {
    this.setState({
      tagsOpened: !this.state.tagsOpened
    });
  }

  handleTagClick(tag) {
    this.props.handleMoveTag(tag);
  }

  handleTagDeleteClick(tag) {
    this.props.handleMoveTag(tag);
  }

  toggledChecked(e) {
    this.setState({
      [e.target.name]: e.target.checked
    });
  }

  handleReset() {
    this.props.handleClearAllTags();
    this.setState({
      finishedChecked: false,
      unfinishedChecked: false
    });
  }

  getAddIcon() {
    return (
      <IconButton
        size="small"
        onClick={this.toggleTagsOpen}
        disabled={this.state.tagsOpened}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    );
  }

  renderTagsArea() {
    return (
      <React.Fragment>
        <Box display="flex">
          <Typography component="p">Tags</Typography>
          {this.getAddIcon()}
        </Box>
        <Box display="flex" flexWrap="wrap">
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
        </Box>
        <Collapse in={this.state.tagsOpened}>
          <Box>
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
              <em>No tags...</em>
            )}
            <IconButton onClick={this.toggleTagsOpen} size="small">
              <CancelPresentationIcon fontSize="small" />
            </IconButton>
          </Box>
        </Collapse>
      </React.Fragment>
    );
  }

  renderIsDoneArea() {
    return (
      <React.Fragment>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.unfinishedChecked}
              onChange={this.toggledChecked}
              name="unfinishedChecked"
              disableRipple
              size="small"
            />
          }
          label={
            <Typography style={{ fontSize: "1em" }}>Unfinished</Typography>
          }
        ></FormControlLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.finishedChecked}
              onChange={this.toggledChecked}
              name="finishedChecked"
              disableRipple
              size="small"
            />
          }
          label={<Typography style={{ fontSize: "1em" }}>Finished</Typography>}
        ></FormControlLabel>
      </React.Fragment>
    );
  }
  render() {
    return (
      <Drawer
        variant="persistent"
        anchor="right"
        open={this.props.open}
        onClose={this.props.handleDrawerToggle}
        PaperProps={{ style: { width: filterWidth, padding: "10px" } }}
        style={{ width: filterWidth, flexShrink: 0, zIndex: 0 }}
      >
        <Toolbar />
        <Typography style={{ fontSize: "1.5em" }}>Filter</Typography>
        <Box>{this.renderTagsArea()}</Box>
        <Divider />
        <Box>{this.renderIsDoneArea()}</Box>
        <Divider />
        <Box>
          <Button onClick={this.handleSearch} variant="outlined">
            Apply
          </Button>
          <Button onClick={this.handleReset} variant="outlined">
            Reset
          </Button>
        </Box>
      </Drawer>
    );
  }
}

export default FilterSidePane;
