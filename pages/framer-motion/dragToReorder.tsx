import React from "react";
import styled from "@emotion/styled";
import { motion, Reorder, useDragControls } from "framer-motion";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1``;
const DragWrapper = styled(Reorder.Group)`
  list-style: none;
  width: 200px;
  padding: 0;
`;
const DragItem = styled(Reorder.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 8px;
  background: #cccccc;
  padding: 20px;
  user-select: none;
  &:last-of-type {
    margin-bottom: 0;
  }
`;
const ControlButton = styled(motion.div)`
  width: 30px;
  height: 30px;
  background: #66bb6a;
  border-radius: 50%;
  box-shadow: 2px 2px 4px #999999;
`;

const Item = ({ item }: { item: string }) => {
  const control = useDragControls();
  return (
    <DragItem
      value={item}
      dragControls={control}
      dragListener={false}
      whileDrag={{ boxShadow: "4px 4px 8px #aaaaaa" }}
    >
      {item}
      <ControlButton onPointerDown={(e) => control.start(e)} />
    </DragItem>
  );
};

const DragToReorder = () => {
  const [items, setItems] = React.useState([
    "Cow",
    "Dog",
    "Cat",
    "Rabbit",
    "Duck",
  ]);

  return (
    <Container>
      <Title>애니메이션 버그 존재</Title>
      <DragWrapper onReorder={setItems} values={items}>
        {items.map((item, index) => {
          return <Item key={item} item={item} />;
        })}
      </DragWrapper>
    </Container>
  );
};

export default DragToReorder;
