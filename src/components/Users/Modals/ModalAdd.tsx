import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { createNewUser } from "../../../services/userService";
import { toast } from "react-toastify";
import { User } from "../TableUsers";

interface ModalAddProps {
  show: boolean;
  handleClose: () => void;
  handleUpdateTableUsers: (user: User) => void;
}

const ModalAdd = (props: ModalAddProps) => {
  // props
  const { show, handleClose, handleUpdateTableUsers } = props;

  // state
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSave = async () => {
    let res = await createNewUser(name, job);
    if (res && res.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("Create new user success !");
      let user = {
        id: res.id,
        email: `${res.name}@gmail.com`,
        first_name: res.name,
        last_name: `${res.name} Nguyen`,
      };
      handleUpdateTableUsers(user);
    } else {
      //error
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div className="mb-3">
                <label htmlFor="input-name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="input-name"
                  aria-describedby="emailHelp"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="input-job" className="form-label">
                  Job
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="input-job"
                  value={job}
                  onChange={e => setJob(e.target.value)}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAdd;
