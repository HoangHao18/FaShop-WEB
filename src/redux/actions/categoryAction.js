import * as actionStypes from '../constants/categoryConstant';
import { CategoryService } from '../services/categoryService';
import { toast } from 'react-toastify';

const getListCategories = (categoryList) => ({
    type: actionStypes.CATEGORY_GET_LIST,
    payload: categoryList,

})

export const getListCategoriesAsync = () => (dispatch) => {
        CategoryService.getAllCategories()
        .then(response => {
            console.log("response: ", response);
            dispatch(getListCategories(response.data.reverse()));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//get list category name
const getListCategoriesName = (categoryListName) => ({
    type: actionStypes.CATEGORY_GET_LIST_NAME,
    payload: categoryListName,

})

export const getListCategoriesNameAsync = () => (dispatch) => {
        CategoryService.getAllCategoriesName()
        .then(response => {
            console.log("response: ", response);
            dispatch(getListCategoriesName(response.data.reverse()));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//create category
const createCategory = () => ({
    type: actionStypes.CATEGORY_CREATE_NEW,
})

// export const createCategoryAsync = ({ name, description }) => (dispatch) => {
//         CategoryService.createCategory({ name, description })
//         .then(response => {
//             console.log("response: ", response);
//             console.log("response err: ", response.message.name);
//             dispatch(createCategory());
//             dispatch(getListCategoriesAsync());
//             toast.success("CREATE SUCCESS");
//         })
//         .catch((error) => {
//             console.log("error: ", error.response);
//         });
// }

export const createCategoryAsync = ({ name, description }) => {
    return async function(dispatch) {     
        try{
            let response = (await CategoryService.createCategory({ name, description }) );
            if(response.data.success == true){
                dispatch(createCategory());
                dispatch(getListCategoriesAsync());
                toast.success("CREATE SUCCESS");
            }
            else{//call api not success not run in here
                console.log("response.eror: ", response.error);
                // toast.success(response.error);
            } 
        }catch(error){
            console.log("error.response: ", error.response);
            const errorList = Object.values(error.response.data.message);
            if(errorList.length > 0){
                errorList.map((item) => {
                    toast.error(item);
                })
            }
        }
    }
}

//delete category
const deleteCategory = () => ({
    type: actionStypes.CATEGORY_DELETE_BY_ID,
})

export const deleteCategoryAsync = (categoryId) => (dispatch) => {
        CategoryService.deleteCategory(categoryId)
        .then(response => {
            console.log("response: ", response);
            dispatch(deleteCategory());
            dispatch(getListCategoriesAsync());
            toast.success("DELETE SUCCESS");
        })
        .catch((error) => {
            console.log("error.response: ", error.response);
            const errorList = Object.values(error.response.data.message);
            errorList.map((item) => {
                toast.error(item);
            })
        });
}

//get single category
const getSingleCategory = (categorySingle) => ({
    type: actionStypes.CATEGORY_GET_SINGLE,
    payload: categorySingle,

})

export const getSingleCategoryAsync = (id) => (dispatch) => {
        CategoryService.getSingleCategory(id)
        .then(response => {
            console.log("response: ", response);
            console.log("response dt: ", response.data);
            dispatch(getSingleCategory(response.data.data));
            
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//edit category
const editCategory = () => ({
    type: actionStypes.CATEGORY_EDIT_BY_ID,
})

export const editCategoryAsync = (id,{ name, description }) => (dispatch) => {
        CategoryService.editCategory(id,{ name, description })
        .then(response => {
            console.log("response: ", response);
            dispatch(editCategory());
            dispatch(getListCategoriesAsync());
            toast.success("EDIT SUCCESS");
        })
        .catch((error) => {
            console.log("error.response: ", error.response);
            const errorList = Object.values(error.response.data.message);
            errorList.map((item) => {
                toast.error(item);
            })
        });
}