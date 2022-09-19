import { Button, Card, Input, Text } from "@nextui-org/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import HomeStyles from '../styles/Home.module.css'

export const Login: NextPage = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    //const [confirm_password, setConfirmPassword] = useState("")

    return <div className={`${HomeStyles['center']}`}>
        <Card variant="bordered" css={{ maxWidth: "400px" }}>
        <Card.Header>
        <img
          alt="nextui logo"
          src="/logo.png"
          width="34px"
          height="24px"
        />
            <Text b>
                Login
            </Text>
        </Card.Header>
        <Card.Divider/>
        <Card.Header>
            <Text b>
                Username
            </Text>
        </Card.Header>
        <Input placeholder="Enter username..." css={{ color: "$blue300" }}
            onChange={(text) => {
                setUsername(text.target.value)
            }}
        >
        </Input>
        <Card.Header>
            <Text b>
                Password
            </Text>
        </Card.Header>
        <Input.Password placeholder="Enter Password..." css={{ color: "$blue300" }}
            onChange={(text) => {
                setPassword(text.target.value)
            }}
        >
        </Input.Password>
        <Card.Header>
        <Button shadow css={{marginBottom: "60px"}}
            onPress={async () => {
                console.log(password, username)
                fetch('/api/login', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: username,
                        password: password
                    })
                }).then(response => response.json()).then((json_data) => {
                    if (json_data.error) {
                        alert(json_data.error)
                    } else {
                        router.push('/dashboard')
                    }
                })
            }}
        >
            Login
        </Button>
        </Card.Header>
        </Card>
    </div>
}

export default Login