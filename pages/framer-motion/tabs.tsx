import React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
  AnimatePresence,
} from "framer-motion";
import styled from "@emotion/styled";

const tabs = [
  { icon: "🍅", label: "Tomato" },
  { icon: "🥬", label: "Lettuce" },
  { icon: "🧀", label: "Cheese" },
  { icon: "🥕", label: "Carrot" },
  { icon: "🍌", label: "Banana" },
  { icon: "🫐", label: "Blueberries" },
  { icon: "🥂", label: "Champers?" },
];

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #eeeeee;
  border-radius: 12px;
  box-shadow: 4px 4px 12px #cccccc;
`;
const ListWrapper = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #dddddd;
`;
const List = styled.li(({ selected }: { selected: boolean }) => ({
  position: "relative",
  padding: "18px",
  marginRight: "12px",
  cursor: "pointer",
  userSelect: "none",
  background: selected ? "#cccccc" : "transperent",
  ":first-of-type": {
    borderTopLeftRadius: "12px",
  },
  ":last-of-type": {
    marginRight: 0,
    borderTopRightRadius: "12px",
  },
}));
const UnderLine = styled(motion.div)`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background: #444444;
`;
const Content = styled(motion.div)`
  display: flex;
  height: 400px;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  user-select: none;
`;

const Tabs = () => {
  const [selectedTab, setSelectedTab] = React.useState(tabs[0]);
  return (
    <Container>
      <Wrapper>
        <ListWrapper>
          {tabs.map((item) => (
            <List
              key={item.label}
              onClick={() => setSelectedTab(item)}
              selected={selectedTab == item}
            >
              {`${item.icon} ${item.label}`}
              {selectedTab == item ? <UnderLine layoutId="underline" /> : null}
            </List>
          ))}
        </ListWrapper>
        <AnimatePresence exitBeforeEnter>
          <Content
            key={selectedTab ? selectedTab.label : "empty"}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -20 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab && `${selectedTab.icon} ${selectedTab.label}`}
          </Content>
        </AnimatePresence>
      </Wrapper>
    </Container>
  );
};

export default Tabs;
