import AuthPage from '@/components/common/AuthPage';
import FormikButton from '@/components/forms/FormikButton';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import { loginSchema } from '@/components/forms/schemas/page-schema';
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
  const { loginUser } = useContext(UserContext);
  const permission = getPermissionFromStore();

  React.useEffect(() => {
    if (permission || permission === USER_ROLES.USER)
      Router.push(`app/${ROLE_NAME[permission]}/dashboard`);
  }, [permission]);

  const handleSubmit = async ({ email: identifier, password }, actions) => {
    setError(false);
    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
        data: { identifier, password },
      })
        .then(function (response) {
          const { data, status } = response;
          if (statusIsSuccessful(status)) {
            loginUser(data.user, data.jwt);
            Router.push(`app/${ROLE_NAME[data.user.permission]}/dashboard`);
          }
        })
        .catch(function (error) {
          const { status } = error.request;
          if (status === 400) {
            setError(true);
            toast.error('Invalid Email or Password');
          } else {
            toast.error(getError(error));
          }
        });
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <AuthPage page="Login" title="Sign In">
      <FormikForm
        schema={loginSchema}
        handleSubmit={handleSubmit}
        name="sign-in-form"
      >
        {error && (
          <div className="mb-3">
            <Alert handleClose={() => setError(false)}>
              Invalid Email or Password
            </Alert>
          </div>
        )}
        <Input name="email" type="email" label="Email Address" />
        <Input name="password" type="password" label="Password" />

        <FormikButton color="success">Login</FormikButton>
        <div className="my-5">
          <Link href="/register">
            <a className="text-sm text-gray-800">
              Don&apos;t have an account?{' '}
              <span className="text-primary-700">Register Now</span>
            </a>
          </Link>
        </div>
      </FormikForm>
    </AuthPage>
  );
};

export default Login;
