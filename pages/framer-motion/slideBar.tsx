import React from "react";
import styled from "@emotion/styled";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  PanInfo,
} from "framer-motion";
import { useMeasure } from "react-use";
import _ from "lodash";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const SlideBarWrapper = styled.div`
  position: relative;
  width: 250px;
  height: 100px;
`;

const SlideBarBackground = styled(motion.div)`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  flex-direction: column;
  background: red;
  border-radius: 8px;
  justify-content: center;
  padding: 12px;
  font-weight: bold;
  color: white;
`;

const SlideBarUnder = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  font-size: 24px;
  font-weight: bold;
  color: white;
  background: #444444;
  border-radius: 8px;
`;

const SlideBar = () => {
  const [wrapperRef, { width }] = useMeasure<HTMLDivElement>();
  const backgroundRef = React.useRef<HTMLDivElement>(null!);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const fontSize = useTransform(
    x,
    [-width, 0, width],
    ["24px", "16px", "24px"]
  );
  const background = useTransform(
    x,
    [-width / 2, width / 2],
    ["#66bb6a", "#ef5350"]
  );

  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    controls.start({ x: 0 });
    const { x } = info.offset;
    if (x >= width / 1.3) console.log("삭제");
    if (x <= -width / 1.3) console.log("수정");
  };

  React.useEffect(() => {
    const unsubscribe = x.onChange((x) => {
      if (x > 0) {
        backgroundRef.current.innerText = "삭제";
        backgroundRef.current.style.alignItems = "flex-start";
      } else {
        backgroundRef.current.innerText = "수정";
        backgroundRef.current.style.alignItems = "flex-end";
      }
    });
    return () => unsubscribe();
  }, [x]);

  return (
    <Container>
      <SlideBarWrapper ref={wrapperRef}>
        <SlideBarBackground
          ref={backgroundRef}
          style={{ fontSize, background }}
        />
        <SlideBarUnder
          drag="x"
          style={{ x }}
          animate={controls}
          transition={{ bounceDamping: 0, duration: 0.3 }}
          dragConstraints={{ left: -width, right: width }}
          dragElastic={0}
          dragMomentum={false}
          dragTransition={{ bounceStiffness: 400 }}
          whileHover={{ scale: 1.05, boxShadow: "2px 2px 8px #cccccc" }}
          whileTap={{ scale: 1.1, boxShadow: "4px 4px 12px #aaaaaa" }}
          onDragEnd={onDragEnd}
        >
          Slide.
        </SlideBarUnder>
      </SlideBarWrapper>
    </Container>
  );
};

export default SlideBar;
