import React    from 'react';
import ReactDOM from 'react-dom';
import Searcher from './components/Searcher';

class TwitterPhotoInsights extends React.Component {
  render () {
    return (
      <div className="twitter-photo-insights">
        <Searcher />
      </div>
    );
  }
};

ReactDOM.render(<TwitterPhotoInsights />, document.body);
