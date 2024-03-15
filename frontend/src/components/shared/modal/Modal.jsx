import './modal.css'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import ModalContent from './ModalContent'

const Modal = ({ modalBtn, children}) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button className='modal-btn' onClick={() => setShowModal(true)} >{modalBtn}</button>
      {showModal &&
        createPortal( <ModalContent children={children} closeModal={() => setShowModal(false)} />,  document.body)}
    </>
  )
}

export default Modal
