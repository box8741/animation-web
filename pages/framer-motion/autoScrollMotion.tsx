import React from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import useInterval from "../../hooks/useInterval";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  list-style: none;
  padding: 0;
`;

const AutoScrollMotion = () => {
  const [target, setTarget] = React.useState(0);
  const list = [
    "코로나바이러스",
    "조이 크러쉬 열애",
    "대한민국",
    "아무거나적어",
  ];

  useInterval(() => {
    setTarget(target >= list.length - 1 ? 0 : target + 1);
  }, 3000);

  return (
    <Container>
      <ListWrapper>
        <AnimatePresence exitBeforeEnter>
          {list.map((item, index) => {
            const isShow = target === index;
            return (
              isShow && (
                <motion.li
                  key={item}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  exit={{ y: -20 }}
                  transition={{ duration: 0.7 }}
                >
                  {index + 1}. {item}
                </motion.li>
              )
            );
          })}
        </AnimatePresence>
      </ListWrapper>
    </Container>
  );
};

export default AutoScrollMotion;
