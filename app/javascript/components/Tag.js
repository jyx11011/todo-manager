import React from "react";
import Chip from "@material-ui/core/Chip";

class Tag extends React.Component {
  constructor(props) {
    super(props);
    if(props.deletable==1) {
      this.state = {
        onDelete: () => {
          this.props.handleDelete(this.props.tag);
        },
        isDelete: true
      };
    } else {
      this.state = {
        onDelete: null,
        isDelete: false
      };
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if(this.props.deletable!=2) return;
    if (this.state.isDelete) {
      this.setState({
        onDelete: null,
        isDelete: false
      });
    } else {
      this.setState({
        onDelete: () => {
          this.props.handleDelete(this.props.tag);
        },
        isDelete: true
      });
    }
  }

  render() {
    return (
      <Chip
        size="small"
        variant="outlined"
        label={this.props.tag.name}
        onDelete={this.state.onDelete}
        style={{ margin: 1 }}
        onClick={this.handleClick}
        component="span"
      />
    );
  }
}

export default Tag;
