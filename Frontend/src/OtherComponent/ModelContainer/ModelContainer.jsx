// import React from 'react'
// import Modal from 'react-modal';
// import { useDispatch, useSelector } from 'react-redux';
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import Button from "@mui/material/Button";
// import './ModelContainer.css';


// const ModelContainer = () => {
//     const dispatchvalue = useDispatch();
//     const modelcon = useSelector(state => state.userRecord?.modelcon);
//     const yourStyles = {
//         position: 'absolute',
//         inset: '100px',
//         border: '1px solid rgb(204, 204, 204)',
//         background: '#00000063 !important',
//         overflow: 'auto',
//         borderRadius: '4px',
//         outline: 'none',
//         padding: '0px'
//     }
//     const closeModal = () => {
//         const tdata = {
//             Isopen: false,
//             content: null,
//             type: ''
//         };
//         dispatchvalue({ type: 'modelcon', value: tdata });
//     }
//     return (
//         <>
//             <Modal
//                 isOpen={modelcon?.Isopen}
//                 onRequestClose={closeModal}
//                 style={{ content: { ...yourStyles } }}
//                 appElement={document.getElementById('root')} // Adjust the element as needed
//             >
//                 <div className="pdf_img_show">

//                     {
//                         modelcon?.content &&

//                         <embed type={modelcon?.type} src={modelcon?.content} width="80%" height="80%" />

//                     }

//                     <div className="jhuhhjh">
//                         <Button
//                             style={{ color: "white" }}
//                             className="clse_pdf_img"
//                             onClick={closeModal}
//                         >
//                             <HighlightOffIcon
//                                 style={{
//                                     fontSize: "40px",
//                                     backgroundColor: "var(--ProjectColor)",
//                                     borderRadius: "40px",
//                                 }}
//                             />
//                         </Button>
//                     </div>
//                 </div>
//             </Modal>
//         </>
//     )
// }

// export default ModelContainer;





import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Button from "@mui/material/Button";
import './ModelContainer.css';

const ModelContainer = () => {
    const dispatch = useDispatch();
    const modelcon = useSelector(state => state.userRecord?.modelcon);

    const modalStyles = {
        position: 'absolute',
        inset: '100px',
        border: '1px solid rgb(204, 204, 204)',
        background: '#00000063 !important',
        overflow: 'auto',
        borderRadius: '4px',
        outline: 'none',
        padding: '0px',
    };

    const closeModal = () => {
        const modalData = {
            Isopen: false,
            content: null,
            type: ''
        };
        dispatch({ type: 'modelcon', value: modalData });
    };

    return (
        <Modal
            isOpen={modelcon?.Isopen}
            onRequestClose={closeModal}
            style={{ content: modalStyles }}
            appElement={document.getElementById('root')} // Adjust the element based on your app's root
        >
            <div className="pdf_img_show">
                {modelcon?.type === "multiple" && modelcon?.content?.map((file, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        {file.startsWith("data:image") ? (
                            <img src={file} alt={`File ${index + 1}`} width="80%" height="80%" />
                        ) : (
                            <embed type="application/pdf" src={file} width="80%" height="80%" />
                        )}
                    </div>
                ))}

                {modelcon?.type !== "multiple" && modelcon?.content && (
                    <embed type={modelcon?.type} src={modelcon?.content} width="80%" height="80%" />
                )}

                <div className="jhuhhjh">
                    <Button
                        style={{ color: "white" }}
                        className="clse_pdf_img"
                        onClick={closeModal}
                    >
                        <HighlightOffIcon
                            style={{
                                fontSize: "40px",
                                backgroundColor: "var(--ProjectColor)",
                                borderRadius: "40px",
                            }}
                        />
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModelContainer;



