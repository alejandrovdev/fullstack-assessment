import { FC, useContext, useMemo } from 'react';
import {
  Button,
  DatePicker,
  Divider,
  Select,
  Form,
  Input,
  Typography,
  Space,
  message,
  FormProps,
} from 'antd';
import { AppContext } from '../context/AppContext';
import { useAxios } from '../shared/hooks/useAxios';
import IEmployee from '../shared/interfaces/employee.interface';
import { Dayjs } from 'dayjs';

interface IEmployeeFormProps {
  onSuccess?: (data: IEmployee) => void;
  onError?: (error: unknown) => void;
  onCancel?: () => void;
  formProps?: FormProps;
}

interface ICreateEmployee extends Omit<IEmployee, 'hireDate'> {
  hireDate: Dayjs;
}

const initialValues = {
  firstName: 'John',
  lastName: 'Doe',
  phone: '555-1234',
  departmentId: 1,
  address: {
    streetName: 'Evergreen Terrace',
    streetNumber1: '742',
    streetNumber2: 'A',
    state: 'Springfield',
    city: 'Springfield',
    postcode: '12345',
    countryId: 1,
  },
};

const EmployeeForm: FC<IEmployeeFormProps> = (props) => {
  const { onSuccess, onError, onCancel, formProps } = props;

  const employeeId = formProps?.initialValues?.id;

  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const { departments, countries } = useContext(AppContext);

  const { loading: loadingNewEmployee, fetch: fetchNewEmployee } =
    useAxios<IEmployee>();

  const departmentOptions = useMemo(
    () =>
      departments?.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    [departments],
  );

  const countryOptions = useMemo(
    () =>
      countries?.map((item) => ({
        value: item.id,
        label: `${item.emoji} ${item.name}`,
      })),
    [countries],
  );

  const handleChangePhone = (value: string) => {
    const fixedPhone = value.replace(/[^0-9]/g, '');

    form.setFieldValue('phone', fixedPhone);
  };

  const handleCreate = async (data: ICreateEmployee) => {
    try {
      const newEmployee = await fetchNewEmployee({
        method: 'POST',
        url: '/employees',
        data: {
          ...data,
          hireDate: data.hireDate.format('YYYY-MM-DD'),
        },
      });

      messageApi.success('Employee created successfully');

      if (onSuccess) {
        onSuccess(newEmployee as IEmployee);
      }
    } catch (error) {
      messageApi.error('Error creating employee');

      if (onError) {
        onError(error);
      }
    }
  };

  const handleUpdate = async (data: ICreateEmployee) => {
    try {
      const newEmployee = await fetchNewEmployee({
        method: 'PUT',
        url: `/employees/${employeeId}`,
        data: {
          ...data,
          hireDate: data.hireDate.format('YYYY-MM-DD'),
        },
      });

      messageApi.success('Employee updated successfully');

      if (onSuccess) {
        onSuccess(newEmployee as IEmployee);
      }
    } catch (error) {
      messageApi.error('Error updating employee');

      if (onError) {
        onError(error);
      }
    }
  };

  const handleSubmit = async (data: ICreateEmployee) => {
    if (employeeId) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  };

  return (
    <>
      {contextHolder}

      <Form
        {...formProps}
        form={form}
        name="employeeForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelWrap={true}
        autoComplete="off"
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "'First Name' is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "'Last Name' is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "'Phone' is required" }]}
        >
          <Input onChange={(e) => handleChangePhone(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Hire Date"
          name="hireDate"
          rules={[{ required: true, message: "'Hire Date' is required" }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Department"
          name="departmentId"
          rules={[{ required: true, message: "'Department' is required" }]}
        >
          <Select
            showSearch
            placeholder="Select Department"
            optionFilterProp="label"
            options={departmentOptions}
          />
        </Form.Item>

        <Divider />

        <Typography.Title level={5}>Address</Typography.Title>

        <Form.Item
          label="Street Name"
          name={['address', 'streetName']}
          rules={[{ required: true, message: "'Street Name' is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Street Number 1"
          name={['address', 'streetNumber1']}
          rules={[{ required: true, message: "'Street Number 1' is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Street Number 2" name={['address', 'streetNumber2']}>
          <Input />
        </Form.Item>

        <Form.Item
          label="State"
          name={['address', 'state']}
          rules={[{ required: true, message: "'State' is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="City"
          name={['address', 'city']}
          rules={[{ required: true, message: "'City' is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Postcode"
          name={['address', 'postcode']}
          rules={[{ required: true, message: "'Postcode' is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Country"
          name={['address', 'countryId']}
          rules={[{ required: true, message: "'Country' is required" }]}
        >
          <Select
            showSearch
            placeholder="Select Country"
            optionFilterProp="label"
            options={countryOptions}
          />
        </Form.Item>

        <Divider />

        <Form.Item noStyle>
          <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button disabled={loadingNewEmployee} onClick={onCancel}>
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={loadingNewEmployee}
            >
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default EmployeeForm;
