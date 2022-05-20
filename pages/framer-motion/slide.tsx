import React from "react";
import styled from "@emotion/styled";
import { motion, PanInfo, useAnimation } from "framer-motion";
import { useMeasure, useScrollbarWidth } from "react-use";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #cccccc;
`;
const SlideWrapper = styled(motion.div)`
  position: relative;
  width: 848px;
  height: 300px;
  overflow: hidden;
  border-radius: 6px;
`;
const SlideDrag = styled(motion.div)`
  display: flex;
  position: absolute;
  height: 100%;
`;
const SlideItem = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  background: white;
  border-radius: 6px;
  margin-right: 16px;
  font-size: 30px;

  :last-of-type {
    margin-right: 0;
  }
`;

const Slide = () => {
  const [target, setTarget] = React.useState(0);
  const slideWrapRef = React.useRef<HTMLDivElement>(null!);
  const control = useAnimation();
  const items = Array(8).fill(0);

  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    console.log(info.point.x);
    control.start({ x: 0 });
  };

  return (
    <Container>
      <SlideWrapper ref={slideWrapRef}>
        <SlideDrag
          drag="x"
          dragConstraints={slideWrapRef}
          dragElastic={0.3}
          dragMomentum={false}
          animate={control}
          transition={{ bounceDamping: 0 }}
          onDragEnd={onDragEnd}
        >
          {items.map((item, index) => {
            const isTarget = target === index;
            //  animate={{ scale: isTarget ? 1.1 : 1 }}
            return <SlideItem key={index}>{index}</SlideItem>;
          })}
        </SlideDrag>
      </SlideWrapper>
    </Container>
  );
};

export default Slide;
