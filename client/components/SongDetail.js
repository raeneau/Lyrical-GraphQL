import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";

import fetchSong from "../queries/fetchSong";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

// -----------------------------------------------------------------------------

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    if (!song) {
      // Or can check for `loading`
      return <div>Loading...</div>; // Can be empty if load times are fast.
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

// -----------------------------------------------------------------------------

export default graphql(fetchSong, {
  options: (props) => ({
    variables: {
      id: props.params.id,
    },
  }),
})(SongDetail);
