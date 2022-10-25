import Overlay from '@/components/common/Overlay';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import { loginSchema } from '@/components/forms/schemas/page-schema';
import { ROLE_NAME, USER_ROLES } from '@/utils/constants';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import { getPermissionFromStore } from '@/utils/localStorage';
import axios from 'axios';
import { UserContext } from 'context/user';
import Image from 'next/image';
import Router from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const permission = getPermissionFromStore();

  React.useEffect(() => {
    if (permission || permission === USER_ROLES.USER)
      Router.push(`app/${ROLE_NAME[permission]}/dashboard`);
  }, [permission]);

  const handleSubmit = async ({ email: identifier, password }, actions) => {
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
          toast.error(getError(error));
        });
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div className="auth-fluid">
      {/*Auth fluid left content */}
      <div className="auth-fluid-form-box">
        <div className="align-items-center d-flex h-100">
          <div className="card-body">
            {/* Logo */}
            <div className="auth-brand text-center text-lg-start">
              <Image
                src="/assets/img/logo.png"
                alt="blissville logo"
                width={147}
                height={46}
              />
            </div>
            {/* title*/}
            <h4 className="mt-6 mb-3">Sign In</h4>

            <FormikForm
              schema={loginSchema}
              handleSubmit={handleSubmit}
              name="sign-in-form"
              butttonText="Login"
              useSubmitButton
            >
              <Input name="email" type="email" label="Email Address" />
              <Input name="password" type="password" label="Password" />
            </FormikForm>
          </div>
          {/* end .card-body */}
        </div>
      </div>
      <div className="auth-fluid-right text-center">
        <Overlay />
      </div>
    </div>
  );
};

export default Login;
