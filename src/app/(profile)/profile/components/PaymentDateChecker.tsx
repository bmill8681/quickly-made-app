
'use client'

import { Box, Card, Typography } from '@mui/material';
import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PickerValue } from '@mui/x-date-pickers/internals';

const MAX_DATE = dayjs().add(1, 'month').endOf('month')

export default function PaymentDateChecker() {
	const [invoiceDate, setInvoiceDate] = useState<PickerValue | null | undefined>()
	const [paymentDate, setPaymentDate] = useState<PickerValue | null | undefined>()

	const [statusText, infoText] = useMemo(() => {
		if (!invoiceDate) return ["Select the next date invoices are due."]
		if (!paymentDate) return ["Select the next date payments will be made."]

		// Check that the payment date is after the invoice date
		let _paymentDate = dayjs(paymentDate);
		if (_paymentDate.isBefore(invoiceDate)) _paymentDate.month(invoiceDate.month()).add(1, 'month')

		// If payment date is the last day of the month, ensure that carries forward regardless
		// of the number of days in the month.
		if (_paymentDate.isSame(dayjs(paymentDate).endOf('month'))) {
			_paymentDate = _paymentDate.date(dayjs().month(_paymentDate.month()).endOf('month').date())
		}

		// If the payment can be made in the same month, make it so.
		if (dayjs(_paymentDate).subtract(1, 'month').isAfter(invoiceDate)) {
			_paymentDate = _paymentDate.subtract(1, 'month')
		}

		const nextPaymentDate = _paymentDate.format("dddd MMMM DD, YYYY")
		const isEndOfMonth = _paymentDate.date() === dayjs(_paymentDate).endOf('month').date()
		const _infoText = isEndOfMonth ? '* Payments will be made at the end of each month.' : `* Payments will be made on the ${_paymentDate.format('DD')} day of each month.`;

		return [`Your invoice pay date will be: ${nextPaymentDate} *`, _infoText]

	}, [invoiceDate, paymentDate])

	return (
		<Card sx={{ padding: '2rem', width: 'fit-content' }}>
			<Box marginBottom={'2rem'}>
				<Typography marginBottom="1rem">
					Payment Schedule
				</Typography>
				<Typography maxWidth={600}>
					Set the cutoff date for invoices to be submitted, and the date payments are made.
					These dates will be used each month as part of your regular payment cycle.
				</Typography>
			</Box>

			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Box display="flex" gap="2rem">
					{/*
					*	These date pickers will display an error in the console when a user makes a selection. 
					* 	This is a fault of the datepicker - it believes it's an uncontrolled component if no default 
					*	date is provided. We do not want a default date in this case as payment dates should be intentionally set.
					*/}
					<DatePicker
						label="Invoices Due"
						value={invoiceDate}
						onChange={value => setInvoiceDate(value)}
						disablePast
						maxDate={MAX_DATE}
					/>
					<DatePicker
						label="Payment Date"
						value={paymentDate}
						onChange={value => setPaymentDate(value)}
						disabled={!invoiceDate}
						minDate={dayjs(invoiceDate)}
						maxDate={MAX_DATE}
					/>
				</Box>
			</LocalizationProvider>
			<Box marginTop="2rem" display="flex" flexDirection="column" gap="1rem">
				<Typography>{statusText}</Typography>
				<Typography color='info' fontSize={"0.8rem"}>{infoText}</Typography>
			</Box>
			{/* 
			*	Note: It's anticipated that these dates would be stored in a database. 
			*	Upcoming invoice and payment dates could be displayed with a link to a detailed view of what
			*	invoices are included on each payment.
			*/}
		</Card>
	)
}