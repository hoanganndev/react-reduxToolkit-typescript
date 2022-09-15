import React from "react";
import "./Modals.scss";
import icon from "../../../assets/images/close_icon.png";
import vector from "../../../assets/images/Vector.png";
import { User } from "../TableUsers";

interface ModalDeleteProps {
  openModal: boolean;
  closeModal: () => void;
  userDel: User;
  confirmDelete: (user: User) => void;
}
const ModalDelelte = (props: ModalDeleteProps) => {
  const { openModal, closeModal, userDel, confirmDelete } = props;

  const handleCloseModal = () => {
    closeModal();
  };

  const handleDeleteUser = () => {
    confirmDelete(userDel);
  };

  if (openModal !== true) {
    return <></>;
  } else {
    return (
      <>
        <div className="modal-delete-container">
          <div className="modal-wrap">
            <div className="modal-close" onClick={() => handleCloseModal()}>
              <img className="modal-vector" src={vector} alt="" />
            </div>
            <div>
              <img className="modal-icon" src={icon} alt="close icon" />
            </div>
            <div className="modal-title">
              <h3>Are you sure ?</h3>
            </div>
            <div className="modal-text">
              <p>
                Do you realldy want to delete this recode, this progress can’t undo again
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="modal-cancel modal-btn"
                onClick={() => handleCloseModal()}
              >
                Close
              </button>
              <button
                className="modal-confirm modal-btn"
                onClick={() => handleDeleteUser()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ModalDelelte;
