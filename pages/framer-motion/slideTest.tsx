import React from "react";
import styled from "@emotion/styled";
import {
  motion,
  animate,
  MotionValue,
  PanInfo,
  useAnimation,
  useMotionValue,
  PanHandlers,
} from "framer-motion";
import _, { values } from "lodash";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #cccccc;
`;
const SlideWrapper = styled(motion.div)`
  width: 400px;
  height: 400px;
  overflow-x: hidden;
`;
const SlideDrag = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  /* border-radius: 6px; */
`;
const SlideItem = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 6px;
  margin-right: 16px;
  font-size: 30px;

  :last-of-type {
    margin-right: 0;
  }
`;

const range = [-1, 0, 1];

const Slide = () => {
  const items = Array(8).fill(0);
  const prevValue = React.useRef<number>(null!);
  const [positiveValue, setPositiveValue] = React.useState(0);
  const [index, setIndex] = React.useState(0);
  const slideDragRef = React.useRef<HTMLDivElement>(null!);
  const x = useMotionValue(0);

  const calculateNewX = () => -index * slideDragRef.current.clientWidth;

  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { clientWidth } = slideDragRef.current;
    const { offset } = info;

    // if (offset.x > clientWidth / 4) {
    //   setIndex(index - 1);
    // } else if (offset.x < -clientWidth / 4) {
    //   setIndex(index + 1);
    // } else {
    //   animate(x, calculateNewX(), { type: "spring", bounce: 0 });
    // }
    animate(x, calculateNewX(), {
      type: "spring",
      bounce: -1,
      onComplete: () => setPositiveValue(0),
    });
    console.log("call");
    prevValue.current = 0;
  };

  const onDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { clientWidth } = slideDragRef.current;
    const {
      offset: { x },
    } = info;
    const isPositiveNum = x / clientWidth > 0 ? 1 : -1;
    const value =
      isPositiveNum === 1
        ? Math.floor(x / clientWidth) / 1
        : Math.ceil(x / clientWidth) / 1;
    // const value = Math.round(x / clientWidth) / 1;

    if (prevValue.current === value && positiveValue === isPositiveNum) return;

    if (prevValue.current < value) {
      setIndex(index - 1);
    } else if (prevValue.current > value) {
      setIndex(index + 1);
    }

    setPositiveValue(isPositiveNum);
    prevValue.current = value;
  };

  // React.useEffect(() => {
  //   animate(x, calculateNewX(), {
  //     type: "spring",
  //     bounce: 0,
  //   });
  // }, [index]);

  const RenderItem = ({ index }: { index: number }) => {
    return (
      <motion.div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: `${index * 100}%`,
          // right: `${index * 100}%`,
        }}
      >
        <SlideItem>hello / {index}</SlideItem>
      </motion.div>
    );
  };

  return (
    <Container>
      <SlideWrapper>
        <SlideDrag
          ref={slideDragRef}
          style={{ x }}
          drag="x"
          dragElastic={1}
          dragMomentum={false}
          onDragEnd={onDragEnd}
          onDrag={onDrag}
        >
          {positiveValue === 1 && <RenderItem index={index - 1} />}
          <RenderItem index={index} />
          {positiveValue === -1 && <RenderItem index={index + 1} />}
        </SlideDrag>
      </SlideWrapper>
    </Container>
  );
};

export default Slide;
