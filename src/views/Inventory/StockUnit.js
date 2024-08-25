import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import axiosInstance from 'axiosInstance'
import { useFormik } from 'formik'
import CustomForm from 'components/CustomForm'

export default function StockUnit({ setUnits, closeModal }) {
    const fetchAllUnits = () => {
        axiosInstance.get('/inventory/stock-unit/').then((response) => {
            setUnits(response.data.sort((a, b) => a.formal_name.localeCompare(b.formal_name)).map((item) => ({
                ...item,
                name: `${item.symbol} - ${item.formal_name}`
            })))
        })
    }

    const formik = useFormik({
        initialValues: {
            symbol: '',
            formal_name: '',
            number_of_decimal_places: 2,
        },

        onSubmit: async (values, { setErrors }) => {
            const request_data = values

            try {
                await axiosInstance.post('/inventory/stock-unit/', request_data)
                fetchAllUnits()
                closeModal()
                alert('Unit created successfully');
                formik.resetForm()
            } catch (error) {
                if (error.response && error.response.status == 400) {
                    const response_data = error.response.data
                    const errors = {}

                    Object.keys(response_data).forEach((field) => {
                        errors[field] = response_data[field][0];
                    });
                    setErrors(errors)
                }
            }
        }
    })
    const addUnitForm = {
        formik: formik,
        sections: [
            [
                {
                    id: 'symbol',
                    type: 'text',
                    label: 'Unit Symbol',
                    params: {
                        autoFocus: true,
                        required: true,
                    }
                },
                {
                    id: 'formal_name',
                    type: 'text',
                    label: 'Formal Name',
                    params: {
                        required: true,
                    },
                },
                {
                    id: 'number_of_decimal_places',
                    type: 'number',
                    label: 'Number of Decimal Places',
                    params: {
                        required: true,
                    },
                },
            ],
        ]
    }
    return (
        <MainCard>
            <CustomForm form={addUnitForm} />
        </MainCard>
    )
}
