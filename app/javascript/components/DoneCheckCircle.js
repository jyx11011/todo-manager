import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

class DoneCheckCircle extends React.Component {
  render() {
    return (
      <Checkbox
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleOutlineIcon />}
        checked={this.props.checked}
        onChange={this.props.toggle}
        disableRipple
        disabled={this.props.disabled}
      />
    );
  }
}

export default DoneCheckCircle;
