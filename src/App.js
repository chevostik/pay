import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cabinet from './components/Cabinet/Cabinet';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Tariffs from './components/Tariffs/Tariffs';
import Products from './components/Products/Products';
import SuccessfulPayment from './components/SuccessfulPayment/SuccessfulPayment';
import Loading from './components/Loading/Loading';
import GuestRoute from './components/GuestRoute/GuestRoute';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import style from './App.styl';

function App() {
  const [isLoading, setLoading] = useState(false);

  return (
    <div className={style.app}>
      <Routes>
        <Route path="/" element={
          <GuestRoute>
            <Login />
          </GuestRoute>}
        />
        <Route path="/register/" element={
          <GuestRoute>
            <Register />
          </GuestRoute>}
        />
        <Route path="/forgot-password/" element={
          <GuestRoute>
            <ForgotPassword />
          </GuestRoute>}
        />
        <Route path="/cabinet/" element={
          <ProtectedRoute>
            <Cabinet onLoadingData={(status) => setLoading(status)} />
          </ProtectedRoute>}
        />
        <Route path="/cabinet/tariffs/" element={
          <ProtectedRoute>
            <Tariffs onLoadingData={(status) => setLoading(status)} />
          </ProtectedRoute>}
        />
        <Route path="/cabinet/products/" element={
          <ProtectedRoute>
            <Products onLoadingData={(status) => setLoading(status)} />
          </ProtectedRoute>}
        />
        <Route path="/successful-payment/" element={<SuccessfulPayment />} />
        <Route path="*" status={404} element={<ErrorPage />} />
      </Routes>
      <Loading isLoading={isLoading} />
    </div>
  );
}

export default App;
