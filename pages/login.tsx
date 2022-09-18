import { Button, Card, Input, Text } from "@nextui-org/react";
import { NextPage } from "next";
import { useState } from "react";
import HomeStyles from '../styles/Home.module.css'

export const Login: NextPage = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
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
                Email
            </Text>
        </Card.Header>
        <Input placeholder="Enter email..." css={{ color: "$blue300" }}
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
            onClick={() => {
                console.log(password, username)
                
            }}
        >
            Login
        </Button>
        </Card.Header>
        </Card>
    </div>
}

export default Login