import { getCookie } from 'cookies-next';
import { GetServerSideProps, NextPage } from 'next';

export const Dashboard: NextPage = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async function ({ req, res }) {
  return {
    props: {
      id: getCookie('rid', { req, res }),
    },
  };
};

export default Dashboard;
