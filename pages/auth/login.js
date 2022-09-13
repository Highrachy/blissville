import AuthPage from '@/components/common/AuthPage';
import Input from '@/components/forms/Input';
import { contactUsSchema } from '@/components/forms/schemas/page-schema';
import Link from 'next/link';

const Login = () => {
  return (
    <AuthPage name="login" schema={contactUsSchema}>
      <h3 className="form-tab-title">
        <span>Login</span>
        {/* <Link href="/auth/register">
          <a>Sign up</a>
        </Link> */}
      </h3>
      <Input name="email" type="email" label="Email Address" />
      <Input
        label="Password"
        name="password"
        placeholder="Password"
        type="password"
      />
      <Link href="/app/user/dashboard">Forgot Password</Link>
      <br />
    </AuthPage>
  );
};

export default Login;
