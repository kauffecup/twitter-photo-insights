import Dispatcher from './Dispatcher';
import Constants  from './constants/Constants';
import {
  getVisualInsights
} from './requester';

export function searchVisualInsights(screenName) {
  Dispatcher.dispatch({actionType: Constants.LOADING_VISUAL_INSIGHTS});
  getVisualInsights(screenName).then(data => {
    Dispatcher.dispatch({actionType: Constants.VISUAL_INSIGHTS, data: data});
  });
}
