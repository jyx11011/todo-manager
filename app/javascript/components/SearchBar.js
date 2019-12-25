import React from "react";
import Tag from "./Tag";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
class SearchBar extends React.Component {
  render() {
    return (
      <Box display="flex" flexWrap="wrap">
        {this.props.allTags.map((tag, index) => {
          return <Tag key={tag.id} tag={tag} deletable={0} />;
        })}
      </Box>
    );
  }
}

export default SearchBar;
