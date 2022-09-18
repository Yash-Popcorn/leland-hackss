import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Navbar, Text, Button, styled, Spacer } from "@nextui-org/react";
import Link from 'next/link'

/**
 * <div className={styles.container}>
      <Head>
        <title>SportsHub</title>
        <meta name="description" content="Communicate with athletes through SportsHub!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Your mom is so fat that she ate all the cookies. Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
 * @returns 
 */

const Box = styled("div", {
  boxSizing: "border-box",
});
const Home: NextPage = () => {
  return (
      <>
        <main>
          <Navbar isBordered>
            <Navbar.Brand>
              <Text b color="inherit" hideIn="xs">
                SportsHub
              </Text>
            </Navbar.Brand>
            <Navbar.Content>
          <Navbar.Link color="inherit" href="/login">
            Login
          </Navbar.Link>
          <Navbar.Link color="inherit" href="/register">
            Signup
          </Navbar.Link>
        </Navbar.Content>
          </Navbar>
        </main>
        <Box css={{px: "$12", mt: "$8", "@xsMax": {px: "$10"}}}>
    <Text h2 id="first">
      <p>
      What is the Sports Hub?
      </p>
      </Text>
    <Spacer y={1} />
    <Spacer y={1} />
    <Text size="$lg" id="second">
      The sports hub allows the client to communicate with others who are interested. The purpose of this tool is to provide communication with people of different interest and meet.
    </Text>
    <Spacer y={1} />
    <Text size="$lg">
      
    </Text>
    <Spacer y={1} />
    <Text size="$lg">
      
    </Text>
    <Text size="$lg">
      
    </Text>
    <Spacer y={1} />
    <Text size="$lg">
      
    </Text>
    <Spacer y={1} />
  </Box>
      </>
  )
}

export default Home
