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
`;
const SlideDrag = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
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
  const [index, setIndex] = React.useState(0);
  const slideDragRef = React.useRef<HTMLDivElement>(null!);
  const x = useMotionValue(0);

  const calculateNewX = () => -index * slideDragRef.current.clientWidth;

  const onPanEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { clientWidth } = slideDragRef.current;
    const { offset } = info;

    if (offset.x > clientWidth / 4) {
      setIndex(index - 1);
    } else if (offset.x < -clientWidth / 4) {
      setIndex(index + 1);
    } else {
      animate(x, calculateNewX(), { type: "spring", bounce: 0 });
    }
  };

  React.useEffect(() => {
    animate(x, calculateNewX(), {
      type: "spring",
      bounce: 0,
    });
  }, [index]);

  const RenderItem = ({
    index,
    data,
    x,
    onPanEnd,
    renderPage,
  }: {
    index: number;
    data: number[];
    x: MotionValue;
    onPanEnd: (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => void;
    renderPage: (props: { data: number; index: number }) => JSX.Element;
  }) => {
    const modulo = index % data.length;
    const realIndex = modulo < 0 ? data.length + modulo : modulo;

    const child = React.useMemo(
      () => renderPage({ data: data[realIndex], index: realIndex }),
      [data, realIndex, renderPage]
    );

    return (
      <motion.div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          x,
          left: `${index * 100}%`,
          right: `${index * 100}%`,
        }}
        drag="x"
        dragElastic={1}
        dragMomentum={false}
        draggable
        onPanEnd={onPanEnd}
      >
        {child}
      </motion.div>
    );
  };

  return (
    <Container>
      <SlideWrapper>
        <SlideDrag ref={slideDragRef}>
          {range.map((value) => {
            return (
              <RenderItem
                key={value + index}
                index={value + index}
                x={x}
                onPanEnd={onPanEnd}
                data={items}
                renderPage={({ data, index }) => {
                  return (
                    <SlideItem draggable={false}>
                      {index} / {data}
                    </SlideItem>
                  );
                }}
              />
            );
          })}
        </SlideDrag>
      </SlideWrapper>
    </Container>
  );
};

export default Slide;
