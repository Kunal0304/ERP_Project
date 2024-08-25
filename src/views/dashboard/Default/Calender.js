import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function Calender() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar sx={{
                border: '1px solid #ed5c26',
                borderRadius: '10px',
                boxShadow: "2px 2px 3px #ed5c26"
            }} />
        </LocalizationProvider>
    );
}
