import React from "react";
import { Container, Text, Flex } from "@chakra-ui/react";

import Header from "components/header";
import Footer from "components/footer";
import Collapse from "components/collapse";

const content = [
  {
    question: "What is BugBounty?",
    answer: (
      <Text>
        A bug bounty is an overgrowing trend in which security enthusiasts
        participate from all around the world crowdsourcing to find (a) bug's in
        a particular program or engagement called as a Bug Bounty Program. The
        "bounty" ensures that a researcher gets paid either in Cash or in swags
        as a compensation for their efforts in keeping the organization secure.
      </Text>
    ),
  },
  {
    question: "Basic Technical things to know before getting started?",
    answer: (
      <Text>
        There are a few basic technical things you should know before getting
        started. Before learning how to find security vulnerabilities in a
        website one should know how a website works and how it’s built. Here is
        a small list of resources to learn about them.
        <br />
        <br />
        HTTP methods:
        <br />
        It’s important to know how a website communicate. The Hypertext Transfer
        Protocol (HTTP) is designed to enable communications between
        clients(eg:- browser) and the server:{" "}
        <a href=" https://www.tutorialspoint.com/http/http_methods.htm">
          https://www.tutorialspoint.com/http/http_methods.htm
        </a>
        <br />
        <br />
        TCP IP model: <br />
        <a href="https://www.geeksforgeeks.org/tcp-ip-model/">
          https://www.geeksforgeeks.org/tcp-ip-model/
        </a>
        <br />
        <br /> Basic Linux Commands: <br />
        <a href="https://www.codecademy.com/learn/learn-the-command-line">
          https://www.codecademy.com/learn/learn-the-command-line
        </a>
        <br />
        <a href="https://www.tutorialspoint.com/operating_system/os_linux.htm">
          https://www.tutorialspoint.com/operating_system/os_linux.htm
        </a>
        <br />
        <br /> Basic server and network concepts: <br />
        <a href="https://nceas.github.io/oss-lessons/servers-networks-command-line/1-servers-net.html">
          https://nceas.github.io/oss-lessons/servers-networks-command-line/1-servers-net.html
        </a>
        <br />
        <a href="https://commotionwireless.net/docs/cck/networking/learn-networking-basics/">
          https://commotionwireless.net/docs/cck/networking/learn-networking-basics/
        </a>
        <br />
        <br />
        Basic to advance Web Application programming. (Check the other FAQ){" "}
      </Text>
    ),
  },
];
export default function FAQPage() {
  return (
    <>
      <Header />
      <Container maxW="80vw" color="black">
        <Flex flexDirection="column" alignItems="center" pt={5} px={4}>
          <Text
            fontSize="3xl"
            fontWeight="600"
            my={1}
            textAlign="center"
            lineHeight="title"
          >
            FAQ
          </Text>
          <Text
            width={["100%", "50%"]}
            lineHeight="title"
            textAlign="center"
            fontSize="sm"
            fontWeight={2}
            my={3}
          >
            Transparent, no-frills and no-hidden, standard pricing for all.
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          pt={5}
          px={[2, 4]}
          minH="60vh"
        >
          {content.map(({ question, answer }) => (
            <Collapse key={question} my={2} width={[1, 4 / 5]} title={question}>
              {answer}
            </Collapse>
          ))}
        </Flex>
      </Container>
      <Footer />
    </>
  );
}
