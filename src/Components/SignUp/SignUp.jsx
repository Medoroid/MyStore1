import axios from 'axios';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('This field is required')
      .min(4, 'Name must be 4-30 characters')
      .max(30, 'Name must be 4-30 characters'),
    email: Yup.string()
      .required('This field is required')
      .email('Enter a valid email that includes @'),
    password: Yup.string()
      .required('This field is required')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Password must include uppercase, lowercase, number, and special character'
      ),
    rePassword: Yup.string()
      .required('This field is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    phone: Yup.string()
      .required('This field is required')
      .matches(/^01[0125][0-9]{8}$/, 'Enter a valid Egyptian phone number'),
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          rePassword: '',
          phone: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
        
            const data = await response.json();
        
            if (response.ok && data.message === 'success') {
              setApiSuccess('Signup successful!');
              setApiError(null);
              resetForm();
              console.log('Signup successful:', data);
              navigate('/signIn')
            } else {
              setApiError(data.message || 'Signup failed.');
              setApiSuccess(null);
            }
          } catch (error) {
            setApiError('Signup failed. Please try again.');
            setApiSuccess(null);
          } finally {
            setSubmitting(false);
          }
        }}
        
      >
        {({ isSubmitting }) => (
          <Form>
            {['name', 'email', 'password', 'rePassword', 'phone'].map((field) => (
              <div key={field} className="mb-4">
                <label htmlFor={field} className="block text-sm font-medium mb-1 capitalize">
                  {field === 'rePassword' ? 'Confirm Password' : field}
                </label>
                <Field
                  type={field.includes('password') ? 'password' : 'text'}
                  name={field}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name={field}
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            ))}

            {apiError && (
              <div className="text-red-600 bg-red-100 p-2 rounded mb-3">
                ❌ {apiError}
              </div>
            )}
            {apiSuccess && (
              <div className="text-green-600 bg-green-100 p-2 rounded mb-3">
                ✅ {apiSuccess}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              {isSubmitting ? 'Submitting...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
