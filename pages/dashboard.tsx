import { getCookie } from 'cookies-next';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GoogleMaps from '../components/GoogleMaps';

interface dashboard_props {
  id: string;
}

export const Dashboard: NextPage<dashboard_props> = ({ id }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`/api/about`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result: { error: string; email: string }) => {
        if (result.error) {
          alert(result.error);
          router.push(`/`);
        } else {
          setEmail(result.email);
        }
      });
  }, []);

  return (
    <div>
      Hello, {email}!
      <GoogleMaps />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async function ({ req, res }) {
  return {
    props: {
      id: getCookie('rid', { req, res }),
    },
  };
};

export default Dashboard;
