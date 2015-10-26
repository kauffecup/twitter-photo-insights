import React        from 'react';
import ReactDOM     from 'react-dom';
import TwitterStore from './stores/TwitterStore';
import Searcher     from './components/Searcher';

class TwitterPhotoInsights extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getStateObj();
    // need to initialize the function this way so that we have a reference
    // to the arrow function. this way we can add/remove it properly
    this._onChange = e => this.setState(this._getStateObj());
  }

  render() {
    return (
      <div className="twitter-photo-insights">
        <Searcher />
      </div>
    );
  }

  componentDidMount() {
    TwitterStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TwitterStore.removeChangeListener(this._onChange);
  }

  _getStateObj() {
    return {
      insightState: TwitterStore.getInsightState(),
      insightData: TwitterStore.getInsightData()
    }
  }
};

ReactDOM.render(<TwitterPhotoInsights />, document.body);
