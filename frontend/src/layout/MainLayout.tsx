import { FC, PropsWithChildren, useMemo } from 'react';
import { HomeFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  const menuItems = useMemo(
    (): MenuProps['items'] => [
      {
        key: 'home',
        icon: <HomeFilled />,
        label: `Home`,
        onClick: () => navigate('/'),
      },
    ],
    [navigate],
  );

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
          selectedKeys={['home']}
        />
      </Header>

      <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Layout style={{ padding: '0 50px 50px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
