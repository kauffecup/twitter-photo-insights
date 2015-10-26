import React from 'react';
import {
  searchVisualInsights
} from '../Actions';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {handle: ''};
  }

  handleSubmit(e) {
    e.preventDefault();
    searchVisualInsights(this.state.handle)
    return false;
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input type="text"
          value={this.state.handle}
          onChange={e => this.setState({handle: e.target.value})}
        />
        <input type="submit" value="search"></input>
      </form>
    );
  }
}
