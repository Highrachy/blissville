import Overlay from '@/components/common/Overlay';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import Image from 'next/image';
import Router from 'next/router';
import React from 'react';

const Login = () => {
  const handleSubmit = async (values, actions) => {
    Router.push('/admin/dashboard');
    // const fetchOptions = {
    //   /**
    //    * The default method for a request with fetch is GET,
    //    * so we must tell it to use the POST HTTP method.
    //    */
    //   method: 'POST',
    //   /**
    //    * These headers will be added to the request and tell
    //    * the API that the request body is JSON and that we can
    //    * accept JSON responses.
    //    */
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   },
    //   /**
    //    * The body of our POST request is the JSON string that
    //    * we created above.
    //    */
    //   body: JSON.stringify({ data: values }),
    // };
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/api/contacts`,
    //   fetchOptions
    // );
    // if (!response.ok) {
    //   const errorMessage = await response.text();
    //   toast.error(errorMessage);
    // } else {
    //   toast.success('Information sent successfully');
    // }
    // actions.setSubmitting(false);
    // actions.resetForm();
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
                src="/logo.png"
                alt="Highrachy"
                width={'142'}
                height={'42'}
              />
            </div>
            {/* title*/}
            <h4 className="mt-6 mb-3">Sign In</h4>

            <FormikForm
              schema={{}}
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
