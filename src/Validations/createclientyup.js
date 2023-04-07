import * as yup from 'yup';
export const clientInfoSchema = yup.object().shape({
    Companyname: yup.string().required('Company Name is required'),
    Address: yup.string().required('Address is required'),
    number: yup.string().matches(/^[0-9]+$/, 'Must be only digits').required('Phone Number is required'),
    Email: yup.string().email('Invalid Email').required('Email is required'),
    Cperson: yup.string().required('Contact Person is required'),
    GST: yup.string().matches(/^[a-zA-Z0-9]+$/, 'Must be alphanumeric').required('GST-IN is required'),
});
