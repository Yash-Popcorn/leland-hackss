import { Button, Card, Dropdown, Input, Modal, Text, useModal } from '@nextui-org/react';
import { getCookie } from 'cookies-next';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GoogleMaps from '../components/GoogleMaps';

interface dashboard_props {
  id: string;
}

export const Dashboard: NextPage<dashboard_props> = ({ id }) => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState("Provide Location")

    const menuItems = [
        { key: "1", name: "Basketball" },
        { key: "2", name: "Soccer" },
        { key: "3", name: "Tennis" },
        { key: "4", name: "Football" },
        { key: "5", name: "Golf" },
        { key: "6", name: "Lacross" },
        { key: "7", name: "Rugby" },
        { key: "8", name: "Baseball" },
        { key: "9", name: "Fortnite" },
      ];
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
    
    /**
     *   return <div>Hello, {email}!</div>;
     */
    return (
        <>
        <h1 id="first">
            <p>
            Hello, {email}
            </p>
        </h1>
        <Button shadow color="success" css={{minWidth: "30px", scale: 3, marginLeft: "10%"}} onClick={() => {
            setVisible(true)
        }}>
            +
        </Button>
        <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => {
            setVisible(false)
        }}
        >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {'Create an'}  
            <Text b size={18}>
              {` ENTRY`}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Header>
            Location
        </Modal.Header>
        <Input bordered css={{scale: 0.9}} placeholder={"Provide a location..."}>

        </Input>
        <Modal.Header>
            Sports
        </Modal.Header>
        <Dropdown>
            <Dropdown.Button flat>{name}</Dropdown.Button>
            <Dropdown.Menu items={menuItems} onSelectionChange={(name) => {
                setName(name['currentKey'])
            }} selectionMode={"single"}>
                {(item) => {
                    const info = item as {name: string}
                    return (
                    <Dropdown.Item
                        key={info.name}
                    >
                    {info.name}
                  </Dropdown.Item>
                  )
                }}
            </Dropdown.Menu>
        </Dropdown>
      </Modal>
      <GoogleMaps />
        </>
    )
};

export const getServerSideProps: GetServerSideProps = async function ({ req, res }) {
  return {
    props: {
      id: getCookie('rid', { req, res }),
    },
  };
};

export default Dashboard;
