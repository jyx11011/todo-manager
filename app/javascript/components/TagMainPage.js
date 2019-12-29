import React from "react";
import PropTypes from "prop-types";
class TagMainPage extends React.Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <Nav />
        <main style={{ flexGrow: 1, padding: "0px 20px 10px 10px" }}>
          <Toolbar />
        </main>
      </div>
    );
  }
}

export default TagMainPage;
