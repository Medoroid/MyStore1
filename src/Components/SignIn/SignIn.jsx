import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function SignIn() {
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string().email('بريد إلكتروني غير صالح').required('مطلوب'),
    password: Yup.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل').required('مطلوب'),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">تسجيل الدخول</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            })
              .then((res) =>
                res.json().then((data) => ({
                  status: res.status,
                  ok: res.ok,
                  body: data,
                }))
              )
              .then(({ status, ok, body }) => {
                if (ok && body.token) {
                  setApiSuccess('تم تسجيل الدخول بنجاح!');
                  setApiError(null);
                  resetForm();
                  // تخزين التوكن أو التوجيه للصفحة الرئيسية
                  localStorage.setItem('token', body.token);
                } else {
                  setApiError(body.message || `فشل الدخول (رمز: ${status})`);
                  setApiSuccess(null);
                }
              })
              .catch(() => {
                setApiError('فشل تسجيل الدخول. حاول مرة أخرى.');
                setApiSuccess(null);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  البريد الإلكتروني
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  كلمة المرور
                </label>
                <Field
                  name="password"
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              {apiError && <div className="text-red-600 mb-3">{apiError}</div>}
              {apiSuccess && <div className="text-green-600 mb-3">{apiSuccess}</div>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {isSubmitting ? 'جاري التحقق...' : 'تسجيل الدخول'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
