import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers(reducers),
  {
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false,
    currentSelectionLeftCity: false,
    cityData: null,
    isLoadingCityData: false,
    isDateSelectorVisible: false,
    departDate:Date.now(),
    highSpeed: false,
  },
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

