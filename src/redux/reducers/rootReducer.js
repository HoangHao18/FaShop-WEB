import { combineReducers } from 'redux';

import userReducers from './userReducer';
import categoryReducers from './categoryReducer';
import manufactureReducers from './manufactureReducer';
import productReducers from './productReducer';

const rootReducer = combineReducers({
        users: userReducers,
        categories: categoryReducers,
        manufactures: manufactureReducers,
        products: productReducers
    })

export default rootReducer;
  




// const reducers = combineReducers({
//     users: userReducers,
//     //categories: categoryReducer,
// });
//export default reducers;