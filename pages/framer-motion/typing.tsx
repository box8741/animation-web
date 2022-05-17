import React from "react";
import styled from "@emotion/styled";
import { motion, Variants, useAnimation } from "framer-motion";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1``;
const TextWrapper = styled(motion.div)`
  width: 400px;
  height: 200px;
  padding: 14px;
  border-radius: 8px;
  background: #cccccc;
  box-shadow: 4px 4px 12px #cccccc;
`;

const Typing = () => {
  const barControl = useAnimation();
  const temp =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda vel ipsa cumque ut in, maiores eaque vitae aliquam odit qui autem officiis, inventore, suscipit labore quisquam. Sit animi iusto explicabo!";
  const item: Variants = {
    on: { display: "inline" },
    off: { display: "none" },
  };
  return (
    <Container>
      <Title>Memo</Title>
      <TextWrapper
        initial="off"
        animate="on"
        onAnimationComplete={() =>
          barControl.start({
            opacity: [0, 1, 0],
          })
        }
      >
        {temp.split("").map((value, index) => (
          <motion.span
            key={index}
            variants={item}
            transition={{ delay: index / 10 + Math.random() / 7 }}
          >
            {value}
          </motion.span>
        ))}
        <motion.span
          animate={barControl}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          |
        </motion.span>
      </TextWrapper>
    </Container>
  );
};

export default Typing;
