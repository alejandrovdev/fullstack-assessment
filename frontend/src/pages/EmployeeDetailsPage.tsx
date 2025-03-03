import { Avatar, Button, Card, Splitter, Typography } from 'antd';
import { useAxios } from '../shared/hooks/useAxios';
import IEmployee from '../shared/interfaces/employee.interface';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import getFormattedDate from '../shared/utils/getFormattedDate';
import { EditOutlined } from '@ant-design/icons';
import EmployeeModal from '../components/EmployeeModal';
import dayjs from 'dayjs';

const EmployeeDetailsPage: FC = () => {
  const {
    data: employee,
    loading: loadingEmployee,
    fetch: fetchEmployee,
  } = useAxios<IEmployee>({ defaultLoading: true });

  const { id } = useParams();

  const [updateEmployeeModalOpen, setUpdateEmployeeModalOpen] = useState(false);

  const { departments, countries } = useContext(AppContext);

  const getDepartmentNameById = useCallback(
    (id: number) => {
      const department = departments?.find((item) => item.id === id);

      return department?.name;
    },
    [departments],
  );

  const getCountryById = useCallback(
    (id: number) => {
      const country = countries?.find((item) => item.id === id);

      return `${country!.emoji} ${country!.name}`;
    },
    [countries],
  );

  useEffect(() => {
    fetchEmployee({ url: `/employees/${id}` });
  }, [fetchEmployee, id]);

  if (loadingEmployee) {
    return <Typography.Title level={5}>Loading...</Typography.Title>;
  }

  if (!loadingEmployee && !employee) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography.Title>Employee Details</Typography.Title>

        <Button
          size="large"
          type="primary"
          icon={<EditOutlined />}
          onClick={() => setUpdateEmployeeModalOpen(true)}
        >
          Update
        </Button>
      </div>

      <Card>
        <Splitter>
          <Splitter.Panel style={{ padding: '20px' }}>
            <Avatar size="large" style={{ marginBottom: '20px' }}>
              {`${employee!.firstName.charAt(0)}${employee!.lastName.charAt(0)}`}
            </Avatar>

            <Typography.Paragraph>
              <Typography.Text strong>First Name: </Typography.Text>
              <Typography.Text>{employee!.firstName}</Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
              <Typography.Text strong>Last Name: </Typography.Text>
              <Typography.Text>{employee!.lastName}</Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
              <Typography.Text strong>Phone: </Typography.Text>
              <Typography.Text>{employee!.phone}</Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
              <Typography.Text strong>Hire Date: </Typography.Text>
              <Typography.Text>
                {getFormattedDate(new Date(employee!.hireDate))}
              </Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
              <Typography.Text strong>Department: </Typography.Text>
              <Typography.Text>
                {getDepartmentNameById(employee!.departmentId)}
              </Typography.Text>
            </Typography.Paragraph>
          </Splitter.Panel>

          <Splitter.Panel style={{ padding: '20px' }}>
            <Typography.Title level={5}>Address</Typography.Title>

            <Typography.Paragraph>
              <Typography.Text strong>Street Name: </Typography.Text>
              <Typography.Text>{employee!.address.streetName}</Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
              <Typography.Text strong>Street Number 1: </Typography.Text>
              <Typography.Text>
                {employee!.address.streetNumber1}
              </Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
              <Typography.Text strong>Street Number2: </Typography.Text>
              <Typography.Text>
                {employee!.address.streetNumber2}
              </Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
              <Typography.Text strong>State: </Typography.Text>
              <Typography.Text>{employee!.address.state}</Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
              <Typography.Text strong>City: </Typography.Text>
              <Typography.Text>{employee!.address.city}</Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
              <Typography.Text strong>Postcode: </Typography.Text>
              <Typography.Text>{employee!.address.postcode}</Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
              <Typography.Text strong>Country: </Typography.Text>
              <Typography.Text>
                {getCountryById(employee!.address.countryId)}
              </Typography.Text>
            </Typography.Paragraph>
          </Splitter.Panel>
        </Splitter>
      </Card>

      {employee ? (
        <EmployeeModal
          modalProps={{
            open: updateEmployeeModalOpen,
            onCancel: () => setUpdateEmployeeModalOpen(false),
          }}
          formProps={{
            initialValues: {
              ...employee,
              hireDate: dayjs(employee.hireDate),
            },
          }}
          onCancel={() => setUpdateEmployeeModalOpen(false)}
          onSuccess={() => {
            setUpdateEmployeeModalOpen(false);
            fetchEmployee({ url: `/employees/${id}` });
          }}
          onError={() => setUpdateEmployeeModalOpen(false)}
        />
      ) : null}
    </>
  );
};

export default EmployeeDetailsPage;
