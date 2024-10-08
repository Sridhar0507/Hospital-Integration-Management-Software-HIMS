import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ToastAlert = ({ Message, Type }) => {
    const dispatchvalue=useDispatch()

    useEffect(() => {
        const tostdata = {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            style: { marginTop: "50px" },
        };

        if (Type === 'success') {
            toast.success(Message, tostdata);
        } else if (Type === 'warn') {
            toast.warn(Message, tostdata);
        } else if (Type === 'error'){
            toast.error(Message, tostdata);
        }
        setTimeout(() => {
            const tdata = {
                message: ``,
                type: ''
            }
            dispatchvalue({ type: 'toast', value: tdata });
        }, 500);
    }, [Message, Type,dispatchvalue]);

    return <ToastContainer />;
};

export default ToastAlert;
