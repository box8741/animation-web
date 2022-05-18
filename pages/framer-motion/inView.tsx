import React from "react";
import styled from "@emotion/styled";
import {
  motion,
  AnimatePresence,
  Reorder,
  useMotionValue,
  useAnimation,
  Variants,
} from "framer-motion";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  /* height: 100vh; */
  /* justify-content: center; */
  align-items: center;
`;
const Temp = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 30vh;
  margin: 40px 0;
  background: #342553;
  border-radius: 18px;
  font-size: 60px;
  color: white;
  box-shadow: 4px 4px 16px #aaaaaa;
`;

const InView = () => {
  const animation: Variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
    hover: { scale: 1.02 },
    tab: { scale: 0.98 },
  };
  return (
    <Container>
      {Array(30)
        .fill(0)
        .map((_, i) => (
          <Temp
            key={i}
            initial="hidden"
            variants={animation}
            // transition={{ duration: 1 }}
            whileInView="visible"
            viewport={{ once: false }} // ture or false
            whileHover="hover"
            whileTap="tab"
          >
            {i}
          </Temp>
        ))}
    </Container>
  );
};

export default InView;
