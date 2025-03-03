import { FC } from 'react';
import type { FormProps, ModalProps } from 'antd';
import { Modal } from 'antd';
import EmployeeForm from './EmployeeForm';
import IEmployee from '../shared/interfaces/employee.interface';

interface IEmployeeModalProps {
  onSuccess?: (data: IEmployee) => void;
  onError?: (error: unknown) => void;
  onCancel?: () => void;
  formProps?: FormProps;
  modalProps?: ModalProps;
}

const EmployeeModal: FC<IEmployeeModalProps> = (props) => {
  const { onSuccess, onError, onCancel, modalProps, formProps } = props;

  return (
    <Modal title="Create Employee" footer={null} {...modalProps}>
      <EmployeeForm
        formProps={formProps}
        onSuccess={onSuccess}
        onError={onError}
        onCancel={onCancel}
      />
    </Modal>
  );
};

export default EmployeeModal;
