import Backend from '@/components/admin/Backend';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import { contactUsSchema } from '@/components/forms/schemas/page-schema';
import React from 'react';

const EditProfile = () => {
  return (
    <Backend title="Edit Profile">
      <div className="row">
        <div className="col-md-6">
          <section className="card p-4 mb-4">
            <EditProfileForm />
          </section>
        </div>
        <div className="col-md-6">
          <section className="card p-4 mb-4">
            <ChangePasswordForm />
          </section>
        </div>
      </div>
    </Backend>
  );
};

const EditProfileForm = () => {
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
    <>
      <h5>Personal Information</h5>
      <hr className="dotted-border" />

      <FormikForm
        schema={contactUsSchema}
        handleSubmit={handleSubmit}
        name="profile-form"
        buttonText="Edit Profile"
        persistForm
      >
        <Input name="firstName" label="First Name" />
        <Input name="lastName" label="Last Name" />
        <Input name="phoneNumber" label="Phone Number" />
      </FormikForm>
    </>
  );
};

const ChangePasswordForm = () => {
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
    <>
      <h5>Change Password</h5>
      <hr className="dotted-border" />

      <FormikForm
        schema={contactUsSchema}
        handleSubmit={handleSubmit}
        name="Change-Password-form"
        buttonText="Change Password"
        persistForm
      >
        <Input name="oldPassword" label="Old Password" type="password" />
        <Input name="newPassword" label="New Password" type="password" />
        <Input name="retypePassword" label="Retype Password" type="password" />
      </FormikForm>
    </>
  );
};

export default EditProfile;
