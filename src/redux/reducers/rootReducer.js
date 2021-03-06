import { combineReducers } from 'redux';

import userReducers from './userReducer';
import categoryReducers from './categoryReducer';
import manufactureReducers from './manufactureReducer';
import productReducers from './productReducer';
import authReducers from './authReducer';
import orderReducers from './orderReducer';

const rootReducer = combineReducers({
        users: userReducers,
        auth: authReducers,
        categories: categoryReducers,
        manufactures: manufactureReducers,
        products: productReducers,
        orders: orderReducers
    })

export default rootReducer;
  




// const reducers = combineReducers({
//     users: userReducers,
//     //categories: categoryReducer,
// });
//export default reducers;