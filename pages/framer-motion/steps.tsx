import React from "react";
import { motion, Variants } from "framer-motion";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const Text = styled(motion.li)`
  font-size: 26px;
`;

const Steps = () => {
  const temp = [
    "Cow",
    "Cat",
    "Dog",
    "Rabbit",
    "Goat",
    "Sheep",
    "Mouse",
    "Horse",
  ];
  const item: Variants = {
    on: { opacity: 1, x: 0 },
    off: { opacity: 0, x: -50 },
  };
  return (
    <Container>
      <motion.ul initial="off" animate="on">
        {temp.map((value, index) => (
          <Text key={index} variants={item} transition={{ delay: index / 10 }}>
            {value}
          </Text>
        ))}
      </motion.ul>
    </Container>
  );
};

export default Steps;
