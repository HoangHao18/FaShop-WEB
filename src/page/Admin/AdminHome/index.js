

import '../../../assets/Admin/boxicons-2.0.7/css/boxicons.min.css';
import '../../../assets/Admin/css/grid.css';
import '../../../assets/Admin/css/index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Layout from "../../../components/Admin/Layout/Layout"

export default function AdminHome(){
    return(
        <div>
            <Layout/>

            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}
