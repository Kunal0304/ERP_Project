import { useFormik } from 'formik';
import React from 'react'
import MainCard from 'ui-component/cards/MainCard'

export default function TestPage() {
    const formik = useFormik({
        initialValues: {
            outerObject: {
                innerObject: {
                    field1: '',
                    field2: '',
                },
            },
            otherField: '',
        },
        onSubmit: (values) => {
            // Handle form submission
            console.log(values);
        },
    });

    return (
        <MainCard title={'Test Page'}>
            <form onSubmit={formik.handleSubmit}>
                {/* Outer Object */}
                <div>
                    {/* Inner Object */}
                    <div>
                        <label htmlFor="outerObject.innerObject.field1">Field 1</label>
                        <input
                            type="text"
                            id="outerObject.innerObject.field1"
                            name="outerObject.innerObject.field1"
                            onChange={formik.handleChange}
                            value={formik.values.outerObject.innerObject.field1}
                        />
                    </div>
                    <div>
                        <label htmlFor="outerObject.innerObject.field2">Field 2</label>
                        <input
                            type="text"
                            id="outerObject.innerObject.field2"
                            name="outerObject.innerObject.field2"
                            onChange={formik.handleChange}
                            value={formik.values.outerObject.innerObject.field2}
                        />
                    </div>
                </div>

                {/* Other Field */}
                <div>
                    <label htmlFor="otherField">Other Field</label>
                    <input
                        type="text"
                        id="otherField"
                        name="otherField"
                        onChange={formik.handleChange}
                        value={formik.values.otherField}
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </MainCard>
    )
}
