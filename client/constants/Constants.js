import keyMirror from 'keymirror';

module.exports = keyMirror({
  // Action dispatches
  LOADING_VISUAL_INSIGHTS: null,
  VISUAL_INSIGHTS: null,
  // states of the insight data
  INSIGHT_STATE_NO_DATA: null,
  INSIGHT_STATE_LOADING: null,
  INSIGHT_STATE_HAS_DATA: null
});
