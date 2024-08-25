import { useRoutes } from 'react-router-dom';

// routes
import AdminRoutes from './AdminRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function AdminThemeRoutes() {
  return useRoutes([AdminRoutes]);
}
