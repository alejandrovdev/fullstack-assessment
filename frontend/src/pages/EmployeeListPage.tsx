import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAxios } from '../shared/hooks/useAxios';
import IEmployee from '../shared/interfaces/employee.interface';
import {
  Avatar,
  Button,
  message,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import getFormattedDate from '../shared/utils/getFormattedDate';
import EmployeeModal from '../components/EmployeeModal';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const EmployeeListPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [createEmployeeModalOpen, setCreateEmployeeModalOpen] = useState(false);

  const navigate = useNavigate();

  const { departments } = useContext(AppContext);

  const { loading: loadingDeleteEmployee, fetch: fetchDeleteEmployee } =
    useAxios<void>();

  const {
    data: employeeList,
    loading: loadingEmployeeList,
    fetch: fetchEmployeeList,
  } = useAxios<IEmployee[]>();

  const getDepartmentNameById = useCallback(
    (id: number) => {
      const department = departments?.find((item) => item.id === id);

      return department?.name;
    },
    [departments],
  );

  const handleDeleteEmployee = useCallback(
    async (employeeId: number) => {
      try {
        await fetchDeleteEmployee({
          method: 'DELETE',
          url: `/employees/${employeeId}`,
        });

        await fetchEmployeeList({
          method: 'GET',
          url: '/employees',
        });

        messageApi.success('Employee deleted successfully');
      } catch {
        messageApi.error('Error deleting employee');
      }
    },
    [fetchDeleteEmployee, fetchEmployeeList, messageApi],
  );

  const columns = useMemo(
    () => [
      {
        key: 'avatar',
        title: 'Avatar',
        render: (_: unknown, record: IEmployee) => (
          <Avatar>{`${record.firstName.charAt(0)}${record.lastName.charAt(0)}`}</Avatar>
        ),
      },
      {
        key: 'firstName',
        title: 'First Name',
        dataIndex: 'firstName',
      },
      {
        key: 'lastName',
        title: 'Last Name',
        dataIndex: 'lastName',
      },
      {
        key: 'department',
        title: 'Department',
        render: (_: unknown, record: IEmployee) =>
          getDepartmentNameById(record.departmentId),
      },
      {
        key: 'hireDate',
        title: 'Hire Date',
        dataIndex: 'hireDate',
        render: (item: string) => getFormattedDate(new Date(item)),
      },
      {
        key: 'actions',
        title: 'Actions',
        render: (_: unknown, record: IEmployee) => (
          <Space>
            <Popconfirm
              title="Delete employee"
              description="Are you sure to delete this employee?"
              onConfirm={() => handleDeleteEmployee(record.id)}
              disabled={loadingDeleteEmployee}
            >
              <Tooltip title="Delete Employee">
                <Button icon={<DeleteOutlined />} danger />
              </Tooltip>
            </Popconfirm>

            <Tooltip title="Employee Details">
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={() => navigate(`/${record.id}`)}
                ghost
              />
            </Tooltip>
          </Space>
        ),
      },
    ],
    [
      getDepartmentNameById,
      handleDeleteEmployee,
      loadingDeleteEmployee,
      navigate,
    ],
  );

  useEffect(() => {
    fetchEmployeeList({ url: '/employees' });
  }, [fetchEmployeeList]);

  return (
    <>
      {contextHolder}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography.Title>Employees</Typography.Title>

        <Button
          size="large"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateEmployeeModalOpen(true)}
        >
          Create
        </Button>
      </div>

      <Table
        rowKey="id"
        loading={loadingEmployeeList}
        dataSource={employeeList || []}
        columns={columns}
      />

      <EmployeeModal
        modalProps={{
          open: createEmployeeModalOpen,
          onCancel: () => setCreateEmployeeModalOpen(false),
        }}
        onCancel={() => setCreateEmployeeModalOpen(false)}
        onSuccess={() => setCreateEmployeeModalOpen(false)}
        onError={() => setCreateEmployeeModalOpen(false)}
      />
    </>
  );
};

export default EmployeeListPage;
