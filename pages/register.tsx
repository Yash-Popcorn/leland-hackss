import { Button, Card, Input, Text } from "@nextui-org/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import HomeStyles from '../styles/Home.module.css'

export const Register: NextPage = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")

    const router = useRouter()

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
                Sign Up
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
            onPress={async () => {
                console.log(password, confirm_password, username)
                if (password !== confirm_password) alert("Password and Confirm Password are not the same!")

                try {
                    const result = await fetch('/api/register', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: username,
                            password: password
                        })
                    })
                    const json_data = await result.json()
                    const value: {error: string} = await json_data

                    if (value.error) {
                        alert(value.error)
                    } else {
                        router.push('/dashboard')
                    }
                } catch (err) {
                    alert(err)
                }
                
                /*
                fetch('/api/register', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: username,
                        password: password
                    })
                }).then(result => {
                    return result.json()
                })
                .then(json => {
                    
                })
                */
            }}
        >
            Sign Up
        </Button>
        </Card.Header>
        </Card>
    </div>
}

export default Register
