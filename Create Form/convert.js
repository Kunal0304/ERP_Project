// form = {
//     'title': 'this is title'
// }

// component = '''
// export default function App(){
//     retutn (
//         +form['title']+
//     )
// }
// '''
// print(component)

const fs = require('fs')
const form = {
    title: 'Add Company',
    sections: [
        [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {
                id: 'financial_year_beginning',
                type: 'date',
                options: [
                    {
                        id: 'cr',
                        name: 'CR (Credit)'
                    },
                    {
                        id: 'dr',
                        name: 'DR (Debit)'
                    },
                ],
                label: 'Financial Year Beginning',
                params: {
                    required: true,
                }
            },
        ]
    ]
}

sections = form.sections.map((section, section_index) => {
    return [section.map((field, index) => {
        return `
            <Grid key={'${section_index}-${index}'} item md={${field.md ? field.md : 6}} >
                <FormControl fullWidth >
                    <InputLabel htmlFor={'outlined-label-${field.id}'}>${field.label}</InputLabel>
                    ${field.type === 'select' ?
                `<Select
                        labelId={'outlined-label-${field.id}'}
                        id={'outlined-${field.id}'}
                        value={formik.values.${field.id}}
                        name={'${field.id}'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'${field.label}'}
                        ${field.params ? Object.entries(field.params).map(([key, value]) => `${key}={${JSON.stringify(value)}}`).join('\n') + '\n' : ''}>
                        {
                            ${field.options}.map((option, index) => (
                                <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                            ))
                        }
                    </Select>`
                :
                `<OutlinedInput
                        id={'outlined-${field.id}'}
                        type={'${field.type}'}
                        value={formik.values.${field.id}}
                        name={'${field.id}'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={'${field.label}'}
                        ${field.params ? Object.entries(field.params).map(([key, value]) => `${key}={${JSON.stringify(value)}}`).join('\n') + '\n' : ''}/> `
            }
                    {
                        formik.touched.${field.id} && formik.errors.${field.id} && (
                            <FormHelperText error id={'standard-weight-helper-text-${field.id}'}>
                                {formik.errors.${field.id}}
                            </FormHelperText>
                        )
                    }
                </FormControl>
            </Grid>`
    })]
})

x = `form.sections && form.sections[currentSection]?.map((field, index) => (
                    <Grid key={\`\${currentSection} -\${index} \`} item md={field.md ? field.md : 6} >
        <FormControl fullWidth >
            <InputLabel htmlFor={\`outlined - label - \${field.id} \`}>{field.label}</InputLabel>
            {
                field.type === 'select' ?
                    <Select
                        labelId={\`outlined - label - \${field.id} \`}
                        id={\`outlined - \${field.id} \`}
                        value={form.formik.values[field.id]}
                        name={field.id}
                        onBlur={form.formik.handleBlur}
                        onChange={form.formik.handleChange}
                        label={field.label}
                        {...field.params}
                    >
                        {
                            field.options.map((option, index) => (
                                <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                            ))
                        }
                    </Select>

                    :
                    <OutlinedInput
                        id={\`outlined - \${field.id} \`}
                        type={field.type}
                        value={form.formik.values[field.id]}
                        name={field.id}
                        onBlur={form.formik.handleBlur}
                        onChange={form.formik.handleChange}
                        label={field.label}
                        {...field.params}
                    />
            }
            {
                form.formik.touched[field.id] && form.formik.errors[field.id] && (
                    <FormHelperText error id={\`standard - weight - helper - text - \${field.id} \`}>
                        {form.formik.errors[field.id]}
                    </FormHelperText>
                )
            }
            {/* {touched.phoneNumber && errors.phoneNumber && (
                    <FormHelperText error id="standard-weight-helper-text-phoneNumber-login">
                        {errors.phoneNumber}
                    </FormHelperText>
                )} */}
        </FormControl>
    </Grid>
))`

// const sections = [\n${sections.map(item => `\t\t${item},`).join('\n')}\n\t]
formComponent = `import { Avatar, Box, Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import { IconSquareRoundedX } from '@tabler/icons'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { useFormik } from 'formik'

export default function FormDialog() {
    const theme = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const [currentSection, setCurrentSection] = useState(0)
    const sections = [${sections.map(field => `[${field}]`)}]

return (
    <>
        <Dialog open={isOpen} maxWidth="md" fullWidth>
            <DialogTitle borderBottom={\`1px solid \${theme.palette.secondary[800]} \`}>
            <Box display="flex" justifyContent="space-between" alignItems="center" fontSize='1.3rem' fontWeight='bold'>
                <span>${form.title}</span>
                <ButtonBase sx={{ borderRadius: '12px', marginX: 1 }}>
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
                        }}
                        onClick={() => {
                            setIsOpen(false)
                            // setCurrentSection(0)
                        }}
                        color="inherit"
                    >
                        <IconSquareRoundedX stroke={1.5} size='1.3rem' />
                    </Avatar>
                </ButtonBase>
            </Box>
        </DialogTitle>

        <form onSubmit={formik.handleSubmit}>
            <DialogContent style={{ borderBottom: \`1px solid \$theme.palette.secondary[800] \` }}>
            <Grid container spacing={2} my={2}>
                {/* Sections */}
                {
                    sections[currentSection]
                }
            </Grid>
        </DialogContent>
        <DialogActions>
            <DialogTitle>
                <Grid container spacing={2}>
                    {
                        currentSection > 0 &&
                        <Grid item>
                            <Button variant='outlined' onClick={() => { setCurrentSection(currentSection - 1) }} type='button'>Prev</Button>
                        </Grid>
                    }
                    {
                        sections && currentSection + 1 != sections?.length &&
                        <Grid item>
                            <Button variant='outlined' onClick={() => { setCurrentSection(currentSection + 1) }} type='button'>Next</Button>
                        </Grid>
                    }
                    {
                        <Grid item>
                            <Button variant='outlined' type='submit' style={{ display: sections && currentSection + 1 != sections?.length ? 'none' : '' }} disabled={formik.isSubmitting}>Save</Button>
                        </Grid>
                    }
                </Grid>
            </DialogTitle>
        </DialogActions>
    </form >
            </Dialog >
        </>
    )
}
`

fs.writeFile('Component.js', formComponent, (err) => {
    if (err) {
        console.error('Error writing to file:', err)
    } else {
        console.log('File written successfully!')
    }
})