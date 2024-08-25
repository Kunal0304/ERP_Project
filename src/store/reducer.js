import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import customReducer from './customReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  custom: customReducer,
});

export default reducer;
