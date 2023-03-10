/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteSummaryGroupPopup = React.memo(props => {
  const closePopup = () => {
    props.onClose();
  };

  return (
    <Modal isOpen={props.open} toggle={closePopup}>
      <ModalHeader toggle={closePopup}>Delete</ModalHeader>
      <ModalBody>
        <p>
          Are you sure you want to delete the summaryGroup with name "
          <strong>{props.selectedSummaryGroupName}</strong>"? This action cannot be undone.
        </p>

        <p>Switch this team to "Inactive" if you'd like to keep it in the system.</p>
      </ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          onClick={() => {
            props.onDeleteClick(props.selectedSummaryGroupId);
          }}
        >
          Confirm
        </Button>
        <Button
          color="warning"
          onClick={() => {
            props.onSetInactiveClick(
              props.selectedSummaryGroupName,
              props.selectedSummaryGroupId,
              false,
            );
          }}
        >
          Set Inactive
        </Button>
        <Button color="primary" onClick={closePopup}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
});
export default DeleteSummaryGroupPopup;
