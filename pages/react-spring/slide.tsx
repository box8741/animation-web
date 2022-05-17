import React from "react";
import { a, useSpring, config } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { useDrag } from "@use-gesture/react";
import styled from "@emotion/styled";
import _ from "lodash";

type SlideProps = {
  children?: React.ReactNode;
  addFn?: () => void;
  deleteFn?: () => void;
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  align-items: center;
  justify-content: center;
`;
const SlideContainer = styled.div`
  position: relative;
  margin-bottom: 8px;
`;
const BackgroundSection = styled(a.div)`
  display: flex;
  position: absolute;
  align-items: center;
  padding: 16px;
  width: 250px;
  height: 80px;
  border-radius: 8px;
  font-weight: bold;
  color: white;
`;
const ShowSection = styled(a.div)`
  display: flex;
  position: absolute;
  width: 250px;
  height: 80px;
  border-radius: 8px;
  touch-action: none;
  background: #444444;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  color: white;
`;

const Slide = ({ children, addFn, deleteFn }: SlideProps) => {
  const [ref, { width, height }] = useMeasure();

  const [{ x, scale, bg, location }, api] = useSpring(() => ({
    x: 0,
    scale: 1,
    bg: "#ef5350",
    location: "flex-start",
    config: config.default,
  }));

  const bind = useDrag(({ dragging, movement: [x], active }) => {
    if (x >= width / 1.5 && !dragging) deleteFn && deleteFn();
    if (x <= -width / 1.5 && !dragging) addFn && addFn();

    api.start({
      x: active ? _.clamp(x, -width, width) : 0,
      scale: active ? 1.1 : 1,
      bg: x > 0 ? "#ef5350" : "#66bb6a",
      location: x > 0 ? "flex-start" : "flex-end",
      immediate: (name) => active && name === "x",
    });
  });

  const fontSize = x.to({
    map: Math.abs,
    range: [0, 100],
    output: ["12px", "22px"],
    extrapolate: "clamp",
  });

  return (
    <SlideContainer style={{ width, height }}>
      <BackgroundSection
        style={{
          fontSize,
          background: bg,
          justifyContent: location,
        }}
      >
        {x.to((x) => (x > 0 ? "삭제" : "추가"))}
      </BackgroundSection>
      <ShowSection ref={ref} style={{ x, scale }} {...bind()}>
        {children}
      </ShowSection>
    </SlideContainer>
  );
};

const Test = () => {
  const createData = (id: number, name: string) => {
    return { id, name };
  };
  const dummyData = [
    createData(0, "Cow"),
    createData(1, "Cat"),
    createData(2, "Dog"),
    createData(3, "Rabbit"),
  ];

  return (
    <Container style={{}}>
      {dummyData.map(({ id, name }, index) => {
        return (
          <Slide
            key={id}
            addFn={() => console.log("추가 : " + name, index)}
            deleteFn={() => console.log("삭제 : " + name, index)}
          >
            {name}
          </Slide>
        );
      })}
    </Container>
  );
};

export default Test;
