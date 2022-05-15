import AuthPage from '@/components/common/AuthPage';
import Input from '@/components/forms/Input';
import { contactUsSchema } from '@/components/forms/schemas/page-schema';
import Link from 'next/link';

const ForgotPassword = () => {
  return (
    <AuthPage name="login" schema={contactUsSchema}>
      <h3 className="form-tab-title">
        <span>Forgot Password</span>
        <Link href="/auth/login">
          <a>Login</a>
        </Link>
      </h3>
      <Input name="email" type="email" label="Email Address" />
    </AuthPage>
  );
};

export default ForgotPassword;
