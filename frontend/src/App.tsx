import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeDetailsPage from './pages/EmployeeDetailsPage';
import MainLayout from './layout/MainLayout';
import AppProvider from './providers/AppProvider';

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<EmployeeListPage />} />
            <Route path="/:id" element={<EmployeeDetailsPage />} />
            <Route path="*" element={<EmployeeListPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
