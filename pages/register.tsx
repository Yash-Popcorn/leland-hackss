import { Button, Card, Input, Text } from "@nextui-org/react";
import { NextPage } from "next";
import { useState } from "react";
import HomeStyles from '../styles/Home.module.css'

export const Register: NextPage = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")

    return <div className={`${HomeStyles['center']}`}>
        <Card variant="bordered" css={{ maxWidth: "400px" }}>
        <Card.Header>
        <img
          alt="nextui logo"
<<<<<<< HEAD
          src="/logo.png"
=======
          src="https://cdn.discordapp.com/attachments/859660582281936916/1021158764931453028/unknown.png"
>>>>>>> 80c191603457b8fc4e49332bca58b60965e3b36a
          width="34px"
          height="24px"
        />
            <Text b>
                Sign Up
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
            <Text b>
                Confirm Password
            </Text>
        </Card.Header>
        <Input.Password placeholder="Confirm Password..." css={{ color: "$blue300" }}
            onChange={(text) => {
                setConfirmPassword(text.target.value)
            }}
        >
        </Input.Password>
        <Card.Header>
        <Button shadow css={{marginBottom: "60px"}}
            onClick={() => {
                console.log(password, confirm_password, username)
                fetch('/api/register', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(result => {
                    return result.json()
                }).then(json => {

                })
            }}
        >
            Sign Up
        </Button>
        </Card.Header>
        </Card>
    </div>
}

export default Register
