import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Grid,
  Input,
  Modal,
  Row,
  Text,
  useModal,
} from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import GoogleMaps from "../components/GoogleMaps";
import locations from "../locations.json";

interface dashboard_props {
  id: string;
}

export const Dashboard: NextPage<dashboard_props> = ({ id }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("Provide Sport");
  const [locationName, setLocationName] = useState("Provide Location");
  const [entries, setEntries] = useState([]);
  const [shownEntries, setShownEntries] = useState([]);

  useEffect(() => {
    fetch("/api/entries")
      .then((response) => response.json())
      .then((json) => {
        setEntries(json);
      });
  }, []);

  useEffect(() => {
    setShownEntries(entries);
  }, [entries]);

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
  const locationItems = [
    { key: "1", name: "Palo Alto High School" },
    { key: "2", name: "Wilcox High School" },
    { key: "3", name: "Gun High School" },
    { key: "4", name: "Harker" },
    { key: "5", name: "Stratford High School" },
  ];

  const onClickMarker = useCallback((name) => {
    fetch("/api/entries")
      .then((response) => response.json())
      .then((json) => {
        setShownEntries(json.filter((entry: any) => {
          console.log(json, entry, name)
          return JSON.parse(entry).location === name
        }));
      });
  }, [entries]);

  useEffect(() => {
    fetch(`/api/about`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        <p>Hello, {email}</p>
      </h1>
      <Button
        shadow
        color="success"
        css={{
          minWidth: "90px",
          minHeight: "90px",
          fontSize: "$5xl",
          position: "absolute",
          bottom: "5%",
          right: "5%",
        }}
        onClick={() => {
          setVisible(true);
        }}
      >
        +
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {"Create an"}
            <Text b size={18}>
              {` ENTRY`}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Header>Location</Modal.Header>
        <Dropdown>
          <Dropdown.Button flat>{locationName}</Dropdown.Button>
          <Dropdown.Menu
            items={locationItems}
            onSelectionChange={(name) => {
              setLocationName(name["currentKey"]);
            }}
            selectionMode={"single"}
          >
            {(item) => {
              const info = item as { name: string };
              return <Dropdown.Item key={info.name}>{info.name}</Dropdown.Item>;
            }}
          </Dropdown.Menu>
        </Dropdown>
        <Modal.Header>Sports</Modal.Header>
        <Dropdown>
          <Dropdown.Button flat>{name}</Dropdown.Button>
          <Dropdown.Menu
            items={menuItems}
            onSelectionChange={(name) => {
              setName(name["currentKey"]);
            }}
            selectionMode={"single"}
          >
            {(item) => {
              const info = item as { name: string };
              return <Dropdown.Item key={info.name}>{info.name}</Dropdown.Item>;
            }}
          </Dropdown.Menu>
        </Dropdown>
        <Button
          css={{}}
          onPress={() => {
            fetch("/api/submit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                location: locationName,
                sport: name,
              }),
            })
              .then((result) => {
                return result.json();
              })
              .then((value: { error: string }) => {
                if (value.error) {
                  alert(value.error);
                } else {
                  setVisible(false);
                }
              });
          }}
        >
          Submit
        </Button>
      </Modal>
      <Container css={{ marginTop: "5%" }}>
        <Row>
          <Col>
            <Grid.Container gap={2} justify="center">
              {shownEntries.length > 0 ? shownEntries.map((entry: any) => {
                entry = JSON.parse(entry);
                return (
                  <Grid xs={12}>
                    <Card variant="bordered">
                      <Card.Header>
                        {entry.sport} - {entry.location}
                      </Card.Header>
                      <Card.Body>{entry.user}</Card.Body>
                    </Card>
                  </Grid>
                );
              }) : <>No sports exist on that query</>}
            </Grid.Container>
          </Col>
          <Col>
            <GoogleMaps
              markers={Object.entries(locations)}
              onClickMarker={onClickMarker}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async function ({
  req,
  res,
}) {
  return {
    props: {
      id: getCookie("rid", { req, res }),
    },
  };
};

export default Dashboard;
