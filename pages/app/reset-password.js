import AuthPage from '@/components/common/AuthPage';
import FormikButton from '@/components/forms/FormikButton';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import { setPasswordSchema } from '@/components/forms/schemas/page-schema';
import Alert from '@/components/utils/Alert';
import { ROLE_NAME } from '@/utils/constants';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import axios from 'axios';
import { UserContext } from 'context/user';
import Router, { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [error, setError] = React.useState(false);
  const { query } = useRouter();
  const { loginUser } = useContext(UserContext);
  const { id, token } = query;

  const handleSubmit = async ({ password }, actions) => {
    const payload = {
      id,
      password,
      token,
    };
    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/administrative/set-password`,
        data: payload,
      })
        .then(function (response) {
          const { data, status } = response;
          if (statusIsSuccessful(status)) {
            axios({
              method: 'post',
              url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
              data: { identifier: data.userInfo.email, password },
            })
              .then(function (response) {
                const { data, status } = response;
                if (statusIsSuccessful(status)) {
                  toast.success('Your password has been successfully updated');
                  loginUser(data.user, data.jwt);
                  actions.resetForm({});
                  actions.setSubmitting(false);
                  Router.push(
                    `/app/${ROLE_NAME[data.user.permission]}/dashboard`
                  );
                }
              })
              .catch(function (error) {
                toast.error(getError(error));
              });
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
    <AuthPage page="Reset Password" title="Reset Password">
      <FormikForm
        schema={setPasswordSchema}
        handleSubmit={handleSubmit}
        name="sign-in-form"
      >
        {token && id ? (
          <>
            {error && (
              <div className="mb-3">
                <Alert handleClose={() => setError(false)}>
                  Invalid Email or Password
                </Alert>
              </div>
            )}
            <Input name="password" type="password" label="Password" />
            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
            />
            <FormikButton color="success">Set Password</FormikButton>
          </>
        ) : (
          <div className="mb-3">
            <Alert noClose>
              Invalid URL. Please check your email for the correct link.
            </Alert>
          </div>
        )}
      </FormikForm>
    </AuthPage>
  );
};

export default ResetPassword;
