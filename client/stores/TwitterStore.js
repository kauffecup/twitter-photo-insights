import _Store     from './_Store';
import Dispatcher from '../Dispatcher';
import Constants  from '../constants/Constants';
import assign     from 'object-assign';

// either Constants.INSIGHT_STATE_NO_DATA, INSIGHT_STATE_LOADING,
// or INSIGHT_STATE_HAS_DATA
var _state = Constants.INSIGHT_STATE_NO_DATA;
// the JSON data we get when we request visual insights
var _data = {};

var TwitterStore = assign({}, _Store, {
  getInsightState: function () {
    return _state;
  },

  getInsightData: function () {
    return _data;
  }
});

Dispatcher.register(action => {
  switch(action.actionType) {
    case Constants.LOADING_VISUAL_INSIGHTS:
      _state = Constants.INSIGHT_STATE_LOADING;
      TwitterStore.emitChange();
      break;

    case Constants.VISUAL_INSIGHTS:
      _data = action.data;
      _state = Constants.INSIGHT_STATE_HAS_DATA;
      TwitterStore.emitChange();
      break;
  }
});

export default TwitterStore;
