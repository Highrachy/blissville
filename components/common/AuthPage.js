import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import { contactUsSchema } from '@/components/forms/schemas/page-schema';

import React from 'react';
import { toast } from 'react-toastify';
import Footer from '@/components/common/Footer';
import Parallax from '@/components/common/Parallax';
import LogoImage from '@/components/common/LogoImage';

const AuthPage = ({ name, schema, children }) => {
  return (
    <>
      <section className="row">
        <div className="col-md-7">
          <div className="row h-100 no-gutters justify-content-center">
            <div className="col-md-10 col-sm-11 col-xl-9">
              <div className="py-6">
                <LogoImage />
                <Form Form={children} name={name} schema={schema} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 min-vh-100">
          <Parallax
            className="h-100"
            bgColor="rgba(68, 108, 178, 0.5)"
            bgImage="/assets/img/bg/auth.jpeg"
          >
            <div className="vh-100">&nbsp;</div>
          </Parallax>
        </div>
      </section>
      <Footer />
    </>
  );
};

const Form = ({ buttonText, Form, name, schema }) => {
  const handleSubmit = async (values, actions) => {
    const fetchOptions = {
      /**
       * The default method for a request with fetch is GET,
       * so we must tell it to use the POST HTTP method.
       */
      method: 'POST',
      /**
       * These headers will be added to the request and tell
       * the API that the request body is JSON and that we can
       * accept JSON responses.
       */
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      /**
       * The body of our POST request is the JSON string that
       * we created above.
       */
      body: JSON.stringify({ data: values }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contacts`,
      fetchOptions
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      toast.error(errorMessage);
    } else {
      toast.success('Information sent successfully');
    }
    actions.setSubmitting(false);
  };

  return (
    <Section>
      <FormikForm
        schema={schema}
        handleSubmit={handleSubmit}
        name={`${name}-form`}
        butttonText={buttonText}
      >
        {Form}
      </FormikForm>
    </Section>
  );
};

Form.defaultProps = {
  buttonText: 'Submit',
};

export default AuthPage;
