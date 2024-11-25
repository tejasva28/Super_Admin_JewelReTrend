import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';
import AppraisedDetails from './views/admin/products/AppraisedDetails';
import SellerDetails from 'views/admin/marketplace/sellerDetails';
import AppraiserDetails from './views/admin/team/AppraiserDetails';
import PhotographerDetails from './views/admin/team/PhotographerDetails';
import CalendarPage from 'views/admin/calendar';
import SessionsPage from 'views/admin/sessions/index';
import DisbursedDetails from 'views/insurance/DisbursedDetails';
import TransitDetails from 'views/insurance/TransitDetails';
import { OrderProvider } from './views/orders/components/OrdersContext';
import OrderDetails from './views/orders/OrderDetails';


export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  
  return (
    <ChakraProvider theme={currentTheme}>
      <OrderProvider>
        <Routes>
          <Route path="/auth/*" element={<AuthLayout />} />
          <Route path="admin/*" element={<AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />} />
          <Route path="products/*" element={<AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />} />
          <Route path="rtl/*" element={<RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />} />
          <Route path="/appraised/:id" element={<AppraisedDetails />} />
          <Route path="/seller/:id" element={<SellerDetails theme={currentTheme} setTheme={setCurrentTheme} />} />
          <Route path="/appraiser/:id" element={<AppraiserDetails />} />
          <Route path="/photographer/:id" element={<PhotographerDetails />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/disbursed-details/:id" element={<DisbursedDetails />} />
          <Route path="/transit-details/:transitID" element={<TransitDetails />} />
          <Route path="/order-details/:orderId" element={<OrderDetails />} />
          <Route path="/sessions" element={<SessionsPage theme={currentTheme} setTheme={setCurrentTheme} />} />
          <Route path="/team*" element={<AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />} />
          <Route path="/" element={<Navigate to="/admin" replace />} />
        </Routes>
      </OrderProvider>
    </ChakraProvider>
  );
}
