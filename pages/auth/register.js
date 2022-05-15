import Input from '@/components/forms/Input';
import { contactUsSchema } from '@/components/forms/schemas/page-schema';

import React from 'react';
import AuthPage from '@/components/common/AuthPage';
import Link from 'next/link';

const Register = () => {
  return (
    <AuthPage name="register" schema={contactUsSchema}>
      <h3 className="form-tab-title">
        <Link href="/auth/login">
          <a>Login</a>
        </Link>{' '}
        <span>Sign up</span>
      </h3>
      <div className="row">
        <Input
          name="firstName"
          formGroupClassName="col-sm-6"
          label="First Name"
        />
        <Input
          name="lastName"
          formGroupClassName="col-sm-6"
          label="Last Name"
        />
      </div>
      <div className="row">
        <Input
          name="email"
          formGroupClassName="col-sm-6"
          type="email"
          label="Email Address"
        />
        <Input
          formGroupClassName="col-sm-6"
          name="phone"
          label="Phone Number"
          optional
        />
      </div>
      <div className="row">
        <Input
          formGroupClassName="col-md-6"
          isValidMessage="Password seems good"
          label="Password"
          name="password"
          placeholder="Password"
          type="password"
        />
        <Input
          formGroupClassName="col-md-6"
          isValidMessage="Awesome. Password matches"
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
        />
      </div>
    </AuthPage>
  );
};

export default Register;
