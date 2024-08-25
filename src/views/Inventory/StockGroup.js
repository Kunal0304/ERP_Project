import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import axiosInstance from 'axiosInstance'
import { useFormik } from 'formik'
import CustomForm from 'components/CustomForm'

export default function StockGroup({ setGroups, closeModal }) {

    const fetchAllGroups = () => {
        axiosInstance.get('/inventory/stock-group/').then((response) => {
            setGroups(response.data.sort((a, b) => a.name.localeCompare(b.name)))
        })
    }


    const formik = useFormik({
        initialValues: {
            name: '',
            is_quantities: false,
            parent: null,
        },

        onSubmit: async (values, { setErrors }) => {
            const request_data = values

            try {
                await axiosInstance.post('/inventory/stock-group/', request_data)
                fetchAllGroups()
                closeModal()
                alert('Group created successfully');
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

    const addGroupForm = {
        formik: formik,
        // md: 12,
        sections: [
            [
                {
                    id: 'name',
                    type: 'text',
                    label: 'Group Name',
                    params: {
                        autoFocus: true,
                        required: true,
                    }
                },
                {
                    id: 'is_quantities',
                    type: 'select',
                    label: 'Quantities',
                    options: [
                        {
                            id: true,
                            name: 'Yes'
                        },
                        {
                            id: false,
                            name: 'No'
                        },
                    ],
                },
            ],
        ]
    }
    return (
        <MainCard>
            <CustomForm form={addGroupForm} />
        </MainCard>
    )
}
