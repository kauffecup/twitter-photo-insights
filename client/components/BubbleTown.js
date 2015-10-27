import React from 'react';
import ReactBubbleChart from 'react-bubble-chart';

export default class BubbleTown extends React.Component {
  render() {
    return <ReactBubbleChart data={this.props.data} />
  }
}