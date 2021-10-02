import React from 'react';
import {Button, Modal} from 'native-base';
import CustomButton from '../CustomButton';

const ConfirmModal = ({
  showModal,
  headerText,
  onClose,
  onCancel,
  onConfirm,
}: {
  showModal: boolean;
  headerText: string;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}) => (
  <Modal isOpen={showModal} onClose={onClose}>
    <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>{headerText}</Modal.Header>
      <Modal.Footer>
        <Button.Group space={2}>
          <CustomButton iconName="check" onPress={onConfirm} />
          <CustomButton iconName="window-close" onPress={onCancel} />
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
);

export default ConfirmModal;
