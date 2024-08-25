import PropTypes from 'prop-types';
// import { useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
// Avatar,Button,
// third-party
// import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// import ChartDataMonth from './chart-data/total-order-month-line-chart';
// import ChartDataYear from './chart-data/total-order-year-line-chart';

// assets
// import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const CardWrapper = styled(MainCard)(({ theme }) => ({
	// backgroundColor: theme.palette.primary.dark,
	backgroundColor: "#f7b787",
	color: '#fff',
	overflow: 'hidden',
	position: 'relative',
	height: "200px",
	'&:after': {
		content: '""',
		position: 'absolute',
		width: 210,
		height: 210,
		background: theme.palette.secondary[800],
		borderRadius: '50%',
		top: -85,
		right: -95,
		[theme.breakpoints.down('sm')]: {
			top: -105,
			right: -140
		}
	},
	'&:before': {
		content: '""',
		position: 'absolute',
		width: 210,
		height: 210,
		background: theme.palette.secondary[800],
		borderRadius: '50%',
		top: -125,
		right: -15,
		opacity: 0.5,
		[theme.breakpoints.down('sm')]: {
			top: -155,
			right: -70
		}
	}
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading, label, value }) => {

	// const [timeValue, setTimeValue] = useState(false);
	// const handleChangeTime = (event, newValue) => {
	//   setTimeValue(newValue);
	// };

	return (
		<>
			{isLoading ? (
				<SkeletonTotalOrderCard />
			) : (
				<CardWrapper border={false} content={false}>
					<Box sx={{ p: 2.25 }}>
						<Grid container direction="column">
							<Grid item>
								<Grid container justifyContent="space-between">
									<Grid item>
										{/* <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary[800],
                        color: '#fff',
                        mt: 1
                      }}
                    >
                      <LocalMallOutlinedIcon fontSize="inherit" />
                    </Avatar> */}
									</Grid>
									<Grid item>
										{/* <Button
                      disableElevation
                      variant={timeValue ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, true)}
                    >
                      Month
                    </Button>
                    <Button
                      disableElevation
                      variant={!timeValue ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, false)}
                    >
                      Year
                    </Button> */}
									</Grid>
								</Grid>
							</Grid>
							<Grid item sx={{ mb: 0.75 }}>
								<Grid container alignItems="center">
									<Grid item xs={6}>
										<Grid container alignItems="center">
											<Grid item>
												<Typography sx={{ fontSize: '3rem', fontWeight: 900, color: '#364152', mr: 1, mt: 1.75, mb: 0.75 }}>₹ {value}</Typography>
												{/* {timeValue ? (
                          <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>$108</Typography>
                        ) : (
                          <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>$961</Typography>
                        )} */}
											</Grid>
											<Grid item>
												{/* <Avatar
                          sx={{
                            ...theme.typography.smallAvatar,
                            cursor: 'pointer',
                            backgroundColor: theme.palette.primary[200],
                            color: theme.palette.primary.dark
                          }}
                        >
                          <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                        </Avatar> */}
											</Grid>
											<Grid item xs={12}>
												<Typography
													sx={{
														fontSize: '1.3rem',
														fontWeight: 500,
														color: '#364152'
													}}
												>
													{label}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={6}>
										{/* {timeValue ? <Chart {...ChartDataMonth} /> : <Chart {...ChartDataYear} />} */}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</CardWrapper>
			)}
		</>
	);
};

TotalOrderLineChartCard.propTypes = {
	isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
