import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  padding: 16px;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
`;
const SectionTitle = styled.h1``;
const LinkStyle = styled.a`
  border-radius: 6px;
  border: 1px solid #cccccc;
  padding: 12px;
  margin-bottom: 14px;
  cursor: pointer;
  box-shadow: 4px 4px 8px #cccccc;
`;

const Index = () => {
  return (
    <Container>
      <Section>
        <SectionTitle>react-spring</SectionTitle>
        <Link href={"/react-spring/slide"}>
          <LinkStyle>slide</LinkStyle>
        </Link>
      </Section>
      <Section>
        <SectionTitle>framer-motion</SectionTitle>
        <Link href={"/framer-motion/tabs"}>
          <LinkStyle>tabs</LinkStyle>
        </Link>
        <Link href={"/framer-motion/steps"}>
          <LinkStyle>steps</LinkStyle>
        </Link>
        <Link href={"/framer-motion/typing"}>
          <LinkStyle>typing</LinkStyle>
        </Link>
        <Link href={"/framer-motion/inView"}>
          <LinkStyle>inView</LinkStyle>
        </Link>
        <Link href={"/framer-motion/sharedElement"}>
          <LinkStyle>sharedElement</LinkStyle>
        </Link>
        <Link href={"/framer-motion/autoScrollMotion"}>
          <LinkStyle>autoScrollMotion</LinkStyle>
        </Link>
        <Link href={"/framer-motion/slideBar"}>
          <LinkStyle>slideBar</LinkStyle>
        </Link>
        <Link href={"/framer-motion/dragToReorder"}>
          <LinkStyle>dragToReorder</LinkStyle>
        </Link>
        <Link href={"/framer-motion/slide"}>
          <LinkStyle>slide</LinkStyle>
        </Link>
        <Link href={"/framer-motion/slideTest"}>
          <LinkStyle>slideTest</LinkStyle>
        </Link>
      </Section>
    </Container>
  );
};

export default Index;
