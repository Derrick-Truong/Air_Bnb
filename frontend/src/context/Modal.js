// frontend/src/context/Modal.js
import React, { useRef } from 'react';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();

    const contextValue = {
        modalRef, // reference to modal div
    };

    return (
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}
