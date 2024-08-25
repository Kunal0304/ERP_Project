import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography, IconButton, Avatar } from '@mui/material';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { IconSquareRoundedPlus } from '@tabler/icons';
// constant
const headerSX = {
	'& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
	(
		{
			border = true,
			boxShadow,
			children,
			content = true,
			contentClass = '',
			contentSX = {},
			darkTitle,
			secondary,
			shadow,
			sx = {},
			title,
			setLedgerData,
			formStatus = null,
			selectedGroup,
			fetchLedgerData,
			setFormStatus = () => { },
			...others
		},
		ref
	) => {
		const theme = useTheme();

		return (
			<Card
				ref={ref}
				{...others}
				sx={{
					border: border ? '1px solid' : 'none',
					borderColor: theme.palette.primary[200] + 25,
					':hover': {
						boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
					},
					...sx
				}}
			>
				{/* card header and action */}

				{/* {title && <CardHeader sx={headerSX} title={darkTitle ? <Typography variant="h3">{title}</Typography> : title} action={secondary} />} */}

				<CardHeader
					sx={headerSX}
					title={
						darkTitle ? (
							<Typography variant="h3">{title}</Typography>
						) : (
							title
						)
					}
					action={
						<>
							{secondary}
							{
								formStatus != null && (
									formStatus ?
										<IconButton onClick={() => { setFormStatus(0) }} size="small">
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
														color: theme.palette.secondary.light,
													},
												}}
												color="inherit"
												onClick={() => { setLedgerData(null); fetchLedgerData(selectedGroup) }}
											>
												<ArrowCircleLeftOutlinedIcon stroke={1.5} size="1.3rem" />
											</Avatar>
										</IconButton>
										:
										<IconButton onClick={() => { setFormStatus(1) }} size="small">
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
														color: theme.palette.secondary.light,
													},
												}}
												color="inherit"
											>
												<IconSquareRoundedPlus stroke={1.5} size="1.3rem" />
											</Avatar>
										</IconButton>
								)
							}
						</>
					}
				/>

				{/* content & header divider */}
				{title && <Divider />}

				{/* card content */}
				{content && (
					<CardContent sx={contentSX} className={contentClass}>
						{children}
					</CardContent>
				)}
				{!content && children}
			</Card>
		);
	}
);

MainCard.propTypes = {
	border: PropTypes.bool,
	boxShadow: PropTypes.bool,
	children: PropTypes.node,
	content: PropTypes.bool,
	contentClass: PropTypes.string,
	contentSX: PropTypes.object,
	darkTitle: PropTypes.bool,
	secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
	shadow: PropTypes.string,
	sx: PropTypes.object,
	title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
