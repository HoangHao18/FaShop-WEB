import React from 'react';

import { Route, Switch } from 'react-router';

import User from '../../page/Admin/User';
import Product from '../../page/Admin/Product';
import Category from '../../page/Admin/Category'
import AddCategory from './AddNew/Category/AddCategory';
import EditCategory from './Edit/Category/EditCategory';

import AddUser from './AddNew/User/AddUser';
import EditUser from './Edit/User/EditUser';
import Manufacture from '../../page/Admin/Manufacture';
import AddManufacture from './AddNew/Manufacture/AddManufacture';
import EditManufacture from './Edit/Manufacture/EditManufacture';

export default function Routes(){
    return(
        <Switch>
            <Route  exact path='/admin' component={User}/>
            <Route path='/admin/addUser' component={AddUser}/>
            <Route path='/admin/editUser/:id' component={EditUser}/>
           
            <Route path='/admin/products' component={Product}/>

            <Route exact path='/admin/categories' component={Category}/>
            <Route path='/admin/categories/addCategory' component={AddCategory}/>
            <Route path='/admin/categories/editCategory/:id' component={EditCategory}/>

            <Route exact path='/admin/manufactures' component={Manufacture}/>
            <Route path='/admin/manufactures/addManufacture' component={AddManufacture}/>
            <Route path='/admin/manufactures/editManufacture/:id' component={EditManufacture}/>
       
        </Switch>
    )
}

