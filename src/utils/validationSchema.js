import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('Email is a required field'),
  password: yup
    .string()
    .min(8, 'Password must contain 8 character')
    .required('Password is a required field'),
});
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field'),
  email: yup
    .string()
    .email()
    .required('Email is a required field'),
  password: yup
    .string()
    .min(8, 'Password must contain 8 character')
    .required('Password is a required field'),
  bio: yup
    .string()
    .required('Name is a required field'),
});
