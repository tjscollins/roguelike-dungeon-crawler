import * as redux from 'redux';
import reducer from 'reducers';

export var configure = () => {
  return redux.createStore(reducer, redux.compose(window.devToolsExtension
    ? window.devToolsExtension()
    : f => f));
};

export default configure;
