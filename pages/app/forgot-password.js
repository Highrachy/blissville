import AuthPage from '@/components/common/AuthPage';
import FormikButton from '@/components/forms/FormikButton';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import { forgotPasswordSchema } from '@/components/forms/schemas/page-schema';
import Alert from '@/components/utils/Alert';
import { ROLE_NAME, USER_ROLES } from '@/utils/constants';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import { getPermissionFromStore } from '@/utils/localStorage';
import axios from 'axios';
import { UserContext } from 'context/user';
import Link from 'next/link';
import Router from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const [error, setError] = React.useState(false);

  const handleSubmit = async ({ email }, actions) => {
    setError(false);
    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/administrative/forgot-password`,
        data: { email },
      })
        .then(function (response) {
          const { data, status } = response;
          if (statusIsSuccessful(status) && data?.success) {
            toast.success('Password reset successfully');
            actions.resetForm({});
            actions.setSubmitting(false);
          } else {
            setError(true);
            toast.error('Invalid Email Address');
          }
        })
        .catch(function (error) {
          actions.setSubmitting(false);
          toast.error(getError(error));
        });
    } catch (error) {
      toast.error(getError(error));
      actions.setSubmitting(false);
    }
  };

  return (
    <AuthPage
      page="Forgot Password"
      title="Forgot Password"
      canonical="forgot-password"
    >
      <FormikForm
        schema={forgotPasswordSchema}
        handleSubmit={handleSubmit}
        name="sign-in-form"
      >
        {error && (
          <div className="mb-3">
            <Alert handleClose={() => setError(false)}>
              Invalid Email Address
            </Alert>
          </div>
        )}
        <Input name="email" type="email" label="Email Address" />

        <FormikButton color="success">Reset Password</FormikButton>
        <div className="my-5">
          <Link href="/login">
            <a className="text-sm text-gray-800">
              Gotten your Password?
              <span className="text-primary">Login Now</span>
            </a>
          </Link>
        </div>
      </FormikForm>
    </AuthPage>
  );
};

export default Login;
