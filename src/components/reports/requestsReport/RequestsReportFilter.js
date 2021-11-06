import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Styles from './RequestsReport.module.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Checkbox, InputAdornment } from '@material-ui/core';
import esLocale from 'date-fns/locale/es';
import { DateRangePicker, LocalizationProvider } from '@material-ui/pickers';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { documentsValidations } from '../../../constants/catalogs';


const RequestsReportFilter = props => {
	const { companies } = props;
	const [companyFilter, setCompanyFilter] = useState([]);
	const [statusFilter, setStatusFilter] = useState([]);
	const [selectedDate, setSelectedDate] = useState([null, null]);
	const [rfc, setRfc] = useState('');
	const [name, setName] = useState('');
	const [requestedMount, setRequestedMount] = useState('');
	const [requestedMaxMount, setRequestedMaxMount] = useState('');
	//varables de validacion
	const [validName, setValidName] = useState(false);

	//functions
	const filter = () => {
		console.log('Filtrando...');
	}
	const clearFilter = () => {
		setCompanyFilter([]);
		setStatusFilter([]);
		setSelectedDate([null, null]);
		setName('');
	}
	const validateName = (e) => {
		setName(e.target.value);
		const pattern = new RegExp('[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]');
		if(pattern.test(name)){
			console.log('Valido');
			setValidName(true)
		} else {
			setValidName(false)
			console.log('no valido');
		}
	}

	//template
	return (
		<Grid container spacing={1} className={Styles.Filters}>
			{/* Fila superior */}
			<Grid item xs={12} sm={3}>
				<Autocomplete
					multiple
					options={companies}
					disableCloseOnSelect
					getOptionLabel={(option => option.businessName)}
					className={Styles.Filters_Input_MulElement}
					onChange={(e, data) => {
						setCompanyFilter(data);
					}}
					value={companyFilter}
					renderOption={(option, { selected }) => (
						<React.Fragment>
							<Checkbox
								color='primary'
								checked={selected}
							/>
							{option.businessName}
						</React.Fragment>
					)}
					renderInput={(params) => (
						<TextField
							{...params}
							label='Seleccione empresa...'
							variant='outlined'
							placeholder='Seleccione empresa...'
						/>
					)}
				/>
			</Grid>
			<Grid item xs={12} sm={3}>
				<Autocomplete
					options={documentsValidations}
					getOptionLabel={(option => option.name)}
					onChange={(e, data) => {
						setStatusFilter(data);
					}}
					className={Styles.Filters_Input_Element}
					value={statusFilter}
					size='small'
					renderInput={params =>
						<TextField
							{...params}
							label='Seleccione estatus...'
							variant='outlined'
						/>
					}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<LocalizationProvider dateAdapter={DateFnsUtils} locale={esLocale}>
					<DateRangePicker
						startText='Registro desde...'
						endText='Registro hasta...'
						value={selectedDate}
						onChange={date => setSelectedDate(date)}
						calendars={1}
						renderInput={(startProps, endProps) => (
							<React.Fragment>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<TextField
											className={Styles.Form_Control}
											InputProps={{
												endAdornment: (
													<InputAdornment position='end'>
														<DateRangeIcon />
													</InputAdornment>
												),
											}}
											{...{ ...startProps, helperText: '' }}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											className={Styles.Form_Control}
											InputProps={{
												endAdornment: (
													<InputAdornment position='end'>
														<DateRangeIcon />
													</InputAdornment>
												),
											}}
											{...{ ...endProps, helperText: '' }}
										/>
									</Grid>
								</Grid>
							</React.Fragment>
						)}
					/>
				</LocalizationProvider>
			</Grid>
			{/* Fila inferior */}
			<Grid item xs={12} sm={2}>
				<TextField
					error={validName}
					label={'Nombre'}
					variant='outlined'
					className={Styles.Form_Control}
					value={name}
					onChange={validateName}
				/>
			</Grid>
			<Grid item xs={12} sm={2}>
				<TextField label={'RFC/CEDULA'} variant='outlined' className={Styles.Form_Control} />
			</Grid>
			<Grid item xs={12} sm={2}>
				<TextField label={'Monto solicitado'} variant='outlined' className={Styles.Form_Control} />
			</Grid>
			<Grid item xs={12} sm={2}>
				<TextField label={'Monto Maximo solicitado'} variant='outlined' className={Styles.Form_Control} />
			</Grid>
			<Grid item xs={12} sm={2}>
				<Button className={Styles.Form_Control} color={'primary'} variant={'outlined'} onClick={clearFilter}>Limpiar Filtros</Button>
			</Grid>
			<Grid item xs={12} sm={2}>
				<Button className={Styles.Form_Control} color={'primary'} variant={'contained'} onClick={filter}>Filtrar</Button>
			</Grid>
		</Grid>
	);
};

export default RequestsReportFilter;