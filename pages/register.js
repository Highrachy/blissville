import React from 'react';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import { registerSchema } from '@/components/forms/schemas/page-schema';
import { ROLE_NAME } from '@/utils/constants';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import axios from 'axios';
import Router from 'next/router';
import { toast } from 'react-toastify';
import AuthPage from '@/components/common/AuthPage';
import FormikButton from '@/components/forms/FormikButton';
import Alert from '@/components/utils/Alert';

const Register = () => {
  const [emailAddress, setEmailAddress] = React.useState(null);
  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      username: values.email,
    };
    delete payload.confirmPassword;
    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
        data: payload,
      })
        .then(function (response) {
          const { data, status } = response;
          if (statusIsSuccessful(status)) {
            setEmailAddress(values.email);
            toast.success('Registration successful');
            actions.resetForm({});
            actions.setSubmitting(false);
          }
        })
        .catch(function (error) {
          toast.error(getError(error));
        });
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <AuthPage page="Registration" title="Create a new account" bigForm>
      <FormikForm
        schema={registerSchema}
        handleSubmit={handleSubmit}
        name="register-form"
        showAllFormikState
      >
        {emailAddress && (
          <Alert type="success" handleClose={() => setEmailAddress(null)}>
            Registration successful. Your email confirmation has been sent to{' '}
            <span className="fw-semibold">{emailAddress}</span>. Please check
            your spam folder if email is not found.{' '}
          </Alert>
        )}
        <div className="row">
          <Input
            name="firstName"
            label="First Name"
            formGroupClassName="col-md-6"
          />
          <Input
            name="lastName"
            label="Last Name"
            formGroupClassName="col-md-6"
          />
        </div>
        <div className="row">
          <Input
            name="email"
            type="email"
            label="Email Address"
            formGroupClassName="col-md-6"
          />
          <Input
            name="phone"
            label="Phone"
            optional
            formGroupClassName="col-md-6"
          />
        </div>
        <div className="row">
          <Input
            name="password"
            type="password"
            label="Password"
            formGroupClassName="col-md-6"
          />
          <Input
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            formGroupClassName="col-md-6"
          />
        </div>
        <FormikButton color="success">Register Now</FormikButton>
      </FormikForm>
    </AuthPage>
  );
};

export default Register;