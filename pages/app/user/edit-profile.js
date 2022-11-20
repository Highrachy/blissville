import Backend from '@/components/admin/Backend';
import FormikButton from '@/components/forms/FormikButton';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import {
  changePasswordSchema,
  profileSchema,
} from '@/components/forms/schemas/page-schema';
import Upload from '@/components/forms/Upload';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import { getTokenFromStore } from '@/utils/localStorage';
import axios from 'axios';
import { UserContext } from 'context/user';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

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
  const { user } = useContext(UserContext);
  const handleSubmit = async (values, actions) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}`, values, {
        headers: { Authorization: getTokenFromStore() },
      })
      .then((response) => {
        const { status, data } = response;
        if (statusIsSuccessful(status)) {
          actions.setSubmitting(false);
          toast.success('Your profile has been successfully updated');
        }
      })
      .catch((error) => {
        toast.error(getError(error));
      });
  };

  return (
    <>
      <h5>Personal Information</h5>
      <hr className="dotted-border" />

      <FormikForm
        schema={profileSchema}
        handleSubmit={handleSubmit}
        name="profile-form"
        buttonText="Edit Profile"
        initialValues={user}
        persistForm
      >
        <Upload
          label="Upload your image"
          changeText="Update Picture"
          defaultImage="/assets/img/placeholder/image.png"
          imgOptions={{
            className: 'mb-3 img-xxl',
            width: 200,
            height: 300,
          }}
          name="profileImage"
          uploadText={`Upload Picture`}
          folder={'profile'}
        />
        <Input name="firstName" label="First Name" />
        <Input name="lastName" label="Last Name" />
        <Input name="phone" label="Phone Number" optional />
        <FormikButton color="info" className="mt-3 text-white btn-wide">
          Update
        </FormikButton>
      </FormikForm>
    </>
  );
};

const ChangePasswordForm = () => {
  const handleSubmit = async (
    { currentPassword, password, confirmPassword: passwordConfirmation },
    actions
  ) => {
    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`,
        data: { currentPassword, password, passwordConfirmation },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { data, status } = response;
          if (statusIsSuccessful(status)) {
            actions.resetForm();
            toast.success('Your password has been successfully updated');
            actions.setSubmitting(false);
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
    <>
      <h5>Change Password</h5>
      <hr className="dotted-border" />

      <FormikForm
        schema={changePasswordSchema}
        handleSubmit={handleSubmit}
        name="change-password-form"
        buttonText="Change Password"
        persistForm
      >
        <Input name="currentPassword" label="Old Password" type="password" />
        <Input name="password" label="New Password" type="password" />
        <Input name="confirmPassword" label="Retype Password" type="password" />
        <FormikButton color="success" className="mt-3">
          Change Password
        </FormikButton>
      </FormikForm>
    </>
  );
};

export default EditProfile;
