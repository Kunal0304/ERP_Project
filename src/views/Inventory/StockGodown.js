import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import axiosInstance from 'axiosInstance'
import { useFormik } from 'formik'
import CustomForm from 'components/CustomForm'

export default function StockGodown({ setGodowns, closeModal }) {

    const fetchAllGodowns = () => {
        axiosInstance.get('/inventory/stock-godown/').then((response) => {
            setGodowns(response.data.sort((a, b) => a.name.localeCompare(b.name)))
        })
    }


    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            show_address: true
        },

        onSubmit: async (values, { setErrors }) => {
            const request_data = values

            try {
                await axiosInstance.post('/inventory/stock-godown/', request_data)
                fetchAllGodowns()
                closeModal()
                alert('Godown created successfully');
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

    const addGodownForm = {
        formik: formik,
        // md: 12,
        sections: [
            [
                {
                    id: 'name',
                    type: 'text',
                    label: 'Godown Name',
                    params: {
                        autoFocus: true,
                        required: true,
                    }
                }
            ],
        ]
    }
    return (
        <MainCard>
            <CustomForm form={addGodownForm} />
        </MainCard>
    )
}
