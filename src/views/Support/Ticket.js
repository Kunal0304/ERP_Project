import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
// import axiosInstance from 'axiosInstance';
// import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {
	Avatar,
	Button,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Input,
	InputLabel,
	Box,
	Tooltip
} from '@mui/material';
// ImageList, ImageListItem,
import GridInput from 'components/GridInput';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import { useTheme } from '@mui/material/styles';
import { IconSquareRoundedX } from '@tabler/icons';
const Ticket = () => {
	const [formStatus, setFormStatus] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const theme = useTheme();

	const formikDefaultValues = {
		id: null,
		name: '',
		email: '',
		phone_number: '',
		title: '',
		discription: '',
		image: ''
	};

	const formik = useFormik({
		initialValues: formikDefaultValues,
		onSubmit: async (values) => {
			const request_data = values;
			console.log(request_data);
			//call api
		}
	});

	useEffect(() => {
		formStatus === 0 && formik.setValues(formikDefaultValues);
	}, [formStatus]);

	const isValidImage = (file) => {
		return /^image\/(png|jpeg|jpg)/i.test(file.type);
	};

	const handleDrop = (event) => {
		event.preventDefault();
		setIsDragging(false);

		const droppedFiles = event.dataTransfer.files;

		if (droppedFiles.length === 0) {
			return;
		}

		// Filter out invalid files
		const validFiles = Array.from(droppedFiles).filter((file) => isValidImage(file));
		const invalidFiles = Array.from(droppedFiles).filter((file) => !isValidImage(file));

		if (invalidFiles.length > 0) {
			toast.error('Some dropped files are not valid image files (JPG, JPEG, or PNG).');
		}

		if (validFiles.length != 0) {
			const remainingSlots = 10 - formik.values.image.length;
			const updatedImages = [...formik.values.image, ...validFiles.slice(0, remainingSlots)];

			formik.setFieldValue('image', updatedImages);

			if (validFiles.length + formik.values.image.length > 10) {
				toast.error('You can only select up to 10 images.');
			}
		}
	};

	const handleImageChange = (event) => {
		const selectedFiles = event.target.files;

		if (selectedFiles.length === 0) {
			return;
		}

		const validFiles = Array.from(selectedFiles).filter((file) => isValidImage(file));
		const invalidFiles = Array.from(selectedFiles).filter((file) => !isValidImage(file));
		if (invalidFiles.length > 0) {
			toast.error('Some selected files are not valid image files (JPG, JPEG, or PNG).');
		}
		if (validFiles.length != 0) {
			const remainingSlots = 10 - formik.values.image.length;
			const updatedImages = [...formik.values.image, ...validFiles.slice(0, remainingSlots)];
			formik.setFieldValue('image', updatedImages);

			if (validFiles.length + formik.values.image.length > 10) {
				toast.error('You can only select up to 10 images.');
			}
		}
	};
	const handlePaste = (event) => {
		const clipboardData = event.clipboardData || window.clipboardData;

		if (clipboardData.length === 0) {
			return;
		}
		const validFiles = Array.from(clipboardData.items)
			.filter((file) => isValidImage(file))
			.map((file) => file.getAsFile());
		const invalidFiles = Array.from(clipboardData.items)
			.filter((file) => !isValidImage(file))
			.map((file) => file.getAsFile());
		// console.log(validFiles)
		// console.log(invalidFiles)
		if (invalidFiles.length > 0) {
			toast.error('Some selected files are not valid image files (JPG, JPEG, or PNG).');
		}
		if (validFiles.length != 0) {
			const remainingSlots = 10 - formik.values.image.length;
			const updatedImages = [...formik.values.image, ...validFiles.slice(0, remainingSlots)];
			formik.setFieldValue('image', updatedImages);

			if (validFiles.length + formik.values.image.length > 10) {
				toast.error('You can only select up to 10 images.');
			}
		}
	};

	const handleClearImage = (index) => {
		const updatedImages = [...formik.values.image];
		updatedImages.splice(index, 1);
		formik.setFieldValue('image', updatedImages);
	};

	return (
		<MainCard title={(formStatus && 'Add Ticket') || 'Tickets'} formStatus={formStatus} setFormStatus={setFormStatus}>
			{formStatus ? (
				<>
					<form
						onSubmit={formik.handleSubmit}
						onPaste={handlePaste}
						onDrop={handleDrop}
						onDragOver={(e) => {
							e.preventDefault();
							setIsDragging(true);
						}}
						onDragLeave={(e) => {
							e.preventDefault();
							setIsDragging(false);
						}}
					>
						{/* <Grid container spacing={2}>
							
						</Grid> */}
						<Grid container spacing={2} mt={2}>
							<GridInput formik={formik} md={4} name={'name'} required />
							<GridInput formik={formik} md={4} name={'email'} type={'email'} required />
							<GridInput formik={formik} md={4} name={'phone_number'} type={'number'} required />
							<GridInput formik={formik} md={4} name={'title'} required />
							<GridInput
								md={4}
								formik={formik}
								name={'discription'}
								params={{
									multiline: true,
									rows: 3
								}}
								required
							/>
						</Grid>
						<Grid container spacing={2}>
							<Grid item>
								<Input
									inputProps={{
										accept: '.png, .jpg, .jpeg',
										multiple: true
									}}
									style={{ display: 'none' }}
									id="image-upload-input"
									type="file"
									name="image"
									onChange={handleImageChange}
								/>
								<InputLabel htmlFor="image-upload-input" style={{ margin: '0' }}>
									<Tooltip title="Add Attachments" arrow>
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
												},
												marginTop: '15px',
												marginRight: '4px',
												cursor: 'pointer',
												border: isDragging ? '2px dashed #2196F3' : ''
											}}
											color="inherit"
										>
											<AttachmentOutlinedIcon />
										</Avatar>
									</Tooltip>
								</InputLabel>
							</Grid>
							{formik.values.image && formik.values.image.length > 0 ? (
								<>
									<Typography
										style={{
											marginTop: '37px',
											marginLeft: '10px'
										}}
									>
										Selected Attachments
									</Typography>
									<Grid container sx={{ display: 'block' }}>
										<Box
											sx={{
												display: 'flex',
												flexWrap: 'wrap'
											}}
											ml={2}
											mt={2}
										>
											{formik.values.image.map((file, index) => (
												<Box
													key={index}
													m={1.5}
													sx={{
														display: 'flex',
														flexDirection: 'column',
														maxWidth: '130px'
													}}
												>
													<Box
														sx={{
															display: 'flex',
															alignItems: 'center'
														}}
													>
														<Typography
															style={{
																marginBottom: '8px',
																overflow: 'hidden',
																textOverflow: 'ellipsis',
																whiteSpace: 'nowrap',
																flex: '1'
															}}
															mr={2}
														>
															{file.name}
														</Typography>
														<Tooltip title="Remove Attachment" arrow>
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
																	},
																	fontWeight: 'normal',
																	cursor: 'pointer'
																}}
																color="inherit"
																onClick={() => handleClearImage(index)}
															>
																<IconSquareRoundedX />
															</Avatar>
														</Tooltip>
													</Box>
													<img
														src={URL.createObjectURL(file)}
														alt={`selected-img-${index}`}
														style={{ height: '130px', objectFit: 'cover' }}
													/>
												</Box>
											))}
										</Box>
									</Grid>
								</>
							) : (
								<Typography
									style={{
										marginTop: '37px',
										marginLeft: '10px'
									}}
								>
									Attachments
								</Typography>
							)}
						</Grid>
						{/* <ImageList cols={7} rowHeight={185} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 0 }}>
												{formik.values.image.map((file, index) => (
													<ImageListItem key={index} sx={{ textAlign: 'center' }}>
														<Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
															<Typography style={{ marginBottom: '8px' }}>{file.name}</Typography>
															<AttachmentOutlinedIcon />
														</Box>
														<img src={URL.createObjectURL(file)} alt={`selected-img-${index}`} style={{ maxWidth: '130px', maxHeight: '130px' }} />
													</ImageListItem>
												))}
											</ImageList> */}
						<Grid container spacing={2} mt={2}>
							<Grid item>
								<Button variant="contained" color="primary" type="submit">
									{formStatus == 1 ? 'Save' : 'Update'}
								</Button>
							</Grid>
							<Grid item>
								<Button variant="outlined" color="secondary" onClick={() => setFormStatus(0)}>
									Cancel
								</Button>
							</Grid>
						</Grid>
					</form>
				</>
			) : (
				<>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Ticket No</TableCell>
									<TableCell>Title</TableCell>
									<TableCell>Discription</TableCell>
									<TableCell>Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{/* {vouchers.map((voucher, index) => (
									<TableRow key={voucher.id}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{new Date(voucher.date).toLocaleDateString('en-GB')}</TableCell>
										<TableCell>{voucher.account.name}</TableCell>
										<TableCell>{voucher.from_party.name}</TableCell>
										<TableCell>{voucher.amount}</TableCell>
										<TableCell sx={{ display: 'flex' }}>
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
													},
													marginLeft: '4px',
													marginRight: '4px'
												}}
												onClick={() => {
													formik.setValues(voucher);
													setFormStatus(2);
												}}
												color="inherit"
											>
												<EditOutlined />
											</Avatar>

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
													},
													marginLeft: '4px',
													marginRight: '4px'
												}}
												onClick={() => {
													if (confirm('Are you sure?')) {
														(async () => {
															try {
																await axiosInstance.delete(`/voucher/receipt-voucher/${voucher.id}/`);

																toast.success(`Voucher deleted successfully`);

																fetchAllVouchers();
															} catch (error) {
																toast.error(`Error while deleting a voucher`);
															}
														})();
													}
												}}
												color="inherit"
											>
												<DeleteOutlineOutlined />
											</Avatar>
										</TableCell>
									</TableRow>
								))} */}
							</TableBody>
						</Table>
					</TableContainer>
				</>
			)}
		</MainCard>
	);
};

export default Ticket;
