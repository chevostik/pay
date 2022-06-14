import { Navigate } from 'react-router-dom';
import * as auth from '../../helpers/auth';

function ProtectedRoute(props) {
  if (!auth.isLoginIn()) {
    return <Navigate to="/" replace />
  }

  return props.children;
}

export default ProtectedRoute;
