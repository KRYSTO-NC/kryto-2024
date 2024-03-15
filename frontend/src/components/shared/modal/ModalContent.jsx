import { FaTimes } from 'react-icons/fa'
import './modal.css'

const ModalContent = ({closeModal, children}) => {
  return (
    <div   onClick={closeModal} className='overlay'>
        <div onClick={e => e.stopPropagation()} className="modal">
            <button onClick={closeModal} className="btn-close"><FaTimes/></button>
            
            <div>
                
            </div>
            {children}
        </div>
    </div>
  )
}

export default ModalContent