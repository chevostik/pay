import { Navigate } from 'react-router-dom';
import * as auth from '../../helpers/auth';

function GuestRoute(props) {
  if (auth.isLoginIn()) {
    return <Navigate to="/cabinet/" replace />
  }

  return props.children;
}

export default GuestRoute;
