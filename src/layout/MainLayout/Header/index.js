import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
// import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

// assets
import { IconMenu2, IconMaximize, IconMinimize } from '@tabler/icons';
import { useState } from 'react';
import CompanySection from './CompanySection';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
	const theme = useTheme();
	const [isFullScreen, setIsFullScreen] = useState(false)

	return (
		<>
			{/* logo & toggler button */}
			<Box
				sx={{
					width: 228,
					display: 'flex',
					[theme.breakpoints.down('md')]: {
						width: 'auto'
					}
				}}
			>
				<Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
					<LogoSection />
				</Box>
				<ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
					<Avatar
						variant="rounded"
						sx={{
							...theme.typography.commonAvatar,
							...theme.typography.mediumAvatar,
							transition: 'all .2s ease-in-out',
							background: theme.palette.secondary.light,
							color: theme.palette.secondary.dark,
							'&:hover': {
								background: theme.palette.secondary.dark,
								color: theme.palette.secondary.light
							}
						}}
						onClick={handleLeftDrawerToggle}
						color="inherit"
					>
						<IconMenu2 stroke={1.5} size="1.3rem" />
					</Avatar>
				</ButtonBase>
			</Box>

			{/* header search */}
			{/* <SearchSection /> */}

			{/* company */}
			<CompanySection />
			<Box sx={{ flexGrow: 1 }} />
			<Box sx={{ flexGrow: 1 }} />

			{/* Full screen */}
			<Box
				sx={{
					ml: 2,
					mr: 3,
					[theme.breakpoints.down('md')]: {
						mr: 2
					}
				}}
			>
				<ButtonBase sx={{ borderRadius: '12px' }}>
					<Avatar
						variant="rounded"
						sx={{
							...theme.typography.commonAvatar,
							...theme.typography.mediumAvatar,
							transition: 'all .2s ease-in-out',
							background: theme.palette.secondary.light,
							color: theme.palette.secondary.dark,
							'&[aria-controls="menu-list-grow"],&:hover': {
								background: theme.palette.secondary.dark,
								color: theme.palette.secondary.light
							}
						}}
						onClick={() => {
							if (!isFullScreen) {
								if (document.documentElement.requestFullscreen) {
									document.documentElement.requestFullscreen();
								} else if (document.documentElement.mozRequestFullScreen) {
									document.documentElement.mozRequestFullScreen();
								} else if (document.documentElement.webkitRequestFullscreen) {
									document.documentElement.webkitRequestFullscreen();
								} else if (document.documentElement.msRequestFullscreen) {
									document.documentElement.msRequestFullscreen();
								}
								setIsFullScreen(true)



								const handleFullscreenChange = () => {
									var isFullScreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;

									if (!isFullScreen) {
										setIsFullScreen(false)

									}
								}
								document.addEventListener('fullscreenchange', handleFullscreenChange);
								document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
								document.addEventListener('mozfullscreenchange', handleFullscreenChange);
								document.addEventListener('MSFullscreenChange', handleFullscreenChange);
							}
							else {
								if (document.exitFullscreen) {
									document.exitFullscreen();
								} else if (document.mozCancelFullScreen) {
									document.mozCancelFullScreen();
								} else if (document.webkitExitFullscreen) {
									document.webkitExitFullscreen();
								} else if (document.msExitFullscreen) {
									document.msExitFullscreen();
								}
								setIsFullScreen(false)
							}
						}}
						color="inherit"
					>
						{
							isFullScreen ?
								<IconMinimize stroke={1.5} size="1.3rem" />
								:
								<IconMaximize stroke={1.5} size="1.3rem" />
						}
					</Avatar>
				</ButtonBase>
			</Box >

			{/* notification & profile */}
			< NotificationSection />
			<ProfileSection />
		</>
	);
};

Header.propTypes = {
	handleLeftDrawerToggle: PropTypes.func
};

export default Header;
