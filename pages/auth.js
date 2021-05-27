import AuthForm from '../components/auth/auth-form';

import { getSession } from 'next-auth/client';

function AuthPage() {
  return <AuthForm />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default AuthPage;
