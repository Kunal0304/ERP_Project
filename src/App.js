import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import AdminThemeRoutes from 'routes/admin';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import AuthWrapper from 'components/AuthWrapper';
import { Route, Routes } from 'react-router';
import Login from 'views/auth/Login';
import Register from 'views/auth/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// ==============================|| APP ||============================== //

const App = () => {
	const customization = useSelector((state) => state.customization);

	return (
		<>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={themes(customization)}>
					<CssBaseline />
					<NavigationScroll>
						<Routes>
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
							<Route path='*' element={<AuthWrapper>
								<AdminThemeRoutes />
							</AuthWrapper>} />
						</Routes>
						<ToastContainer autoClose={2000} />
					</NavigationScroll>
				</ThemeProvider>
			</StyledEngineProvider>
		</>
	);
};

export default App;
