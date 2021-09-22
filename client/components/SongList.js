import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import gql from "graphql-tag";

import query from "../queries/fetchSongs";

// -----------------------------------------------------------------------------

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          {/* "delete" is from the material icon set named icon */}
          <i className="material-icons" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;

// -----------------------------------------------------------------------------

// graphql(query) returns a function and it is immediately called by the second set of parenthesis
export default graphql(mutation)(graphql(query)(SongList));
