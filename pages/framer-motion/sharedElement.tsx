import React from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
`;
const GridContainer = styled.div`
  display: grid;
  width: 600px;
  grid-gap: 40px;
  grid-template-columns: repeat(2, 1fr);
  margin: 40px 0;
`;
const ItemContainer = styled(motion.div)`
  box-shadow: 4px 4px 12px #cccccc;
  border-radius: 16px;
  padding: 20px;
  overflow: hidden;
`;
const ItemImage = styled(motion.img)`
  width: 100%;
  margin-bottom: 20px;
  -webkit-user-drag: none;
`;
const ItemText = styled(motion.span)`
  font-size: 18px;
  user-select: none;
`;

const ModalContainer = styled(motion.div)`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
`;
const ModalContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  width: 90vw;
  height: 80vh;
  border-radius: 24px;
  box-shadow: 4px 4px 16px #444444;
  padding: 20px 40px;
  user-select: none;
`;
const ModalImage = styled(motion.img)`
  width: 50%;
  object-fit: contain;
  margin-bottom: 60px;
  -webkit-user-drag: none;
`;
const ModalText = styled(motion.span)`
  font-size: 24px;
  user-select: none;
`;

const TempModal = ({
  onClose,
  index,
}: {
  onClose: () => void;
  index?: number;
}) => {
  return (
    <ModalContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent layoutId={`card-container-${index}`}>
        <ModalImage
          layoutId={`card-image-${index}`}
          src="https://media.istockphoto.com/vectors/sample-sign-sample-square-speech-bubble-sample-vector-id1161352480?k=20&m=1161352480&s=612x612&w=0&h=uVaVErtcluXjUNbOuvGF2_sSib9dZejwh4w8CwJPc48="
        />
        <ModalText>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
          possimus blanditiis rem dicta enim! Nobis possimus quisquam quas
          necessitatibus nemo eius est illum sunt. Nostrum quis optio omnis
          delectus voluptas. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Natus possimus blanditiis rem dicta enim! Nobis possimus
          quisquam quas necessitatibus nemo eius est illum sunt. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Natus possimus blanditiis
          rem dicta enim! Nobis possimus quisquam quas necessitatibus nemo eius
          est illum sunt. Nostrum quis optio omnis delectus voluptas. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Natus possimus
          blanditiis rem dicta enim! Nobis possimus quisquam quas necessitatibus
          nemo eius est illum sunt.
        </ModalText>
      </ModalContent>
    </ModalContainer>
  );
};

const SharedElement = () => {
  const [target, setTarget] = React.useState(-1);
  const images = [
    "https://media.istockphoto.com/vectors/sample-sign-sample-square-speech-bubble-sample-vector-id1161352480?k=20&m=1161352480&s=612x612&w=0&h=uVaVErtcluXjUNbOuvGF2_sSib9dZejwh4w8CwJPc48=",
    "https://media.istockphoto.com/vectors/sample-sign-sample-square-speech-bubble-sample-vector-id1161352480?k=20&m=1161352480&s=612x612&w=0&h=uVaVErtcluXjUNbOuvGF2_sSib9dZejwh4w8CwJPc48=",
    "https://media.istockphoto.com/vectors/sample-sign-sample-square-speech-bubble-sample-vector-id1161352480?k=20&m=1161352480&s=612x612&w=0&h=uVaVErtcluXjUNbOuvGF2_sSib9dZejwh4w8CwJPc48=",
    "https://media.istockphoto.com/vectors/sample-sign-sample-square-speech-bubble-sample-vector-id1161352480?k=20&m=1161352480&s=612x612&w=0&h=uVaVErtcluXjUNbOuvGF2_sSib9dZejwh4w8CwJPc48=",
    "https://media.istockphoto.com/vectors/sample-sign-sample-square-speech-bubble-sample-vector-id1161352480?k=20&m=1161352480&s=612x612&w=0&h=uVaVErtcluXjUNbOuvGF2_sSib9dZejwh4w8CwJPc48=",
  ];
  return (
    <Container>
      <GridContainer>
        {images.map((img, index) => {
          return (
            <motion.div
              layout
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ItemContainer
                layoutId={`card-container-${index}`}
                onClick={() => setTarget(index)}
              >
                <ItemImage layoutId={`card-image-${index}`} src={img} />
                <ItemText>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                  possimus blanditiis rem dicta enim! Nobis possimus quisquam
                  quas necessitatibus nemo eius est illum sunt. Nostrum quis
                  optio omnis delectus voluptas.
                </ItemText>
              </ItemContainer>
            </motion.div>
          );
        })}
        <AnimatePresence>
          {target >= 0 && (
            <TempModal
              //   key={"modal"}
              onClose={() => setTarget(-1)}
              index={target}
            />
          )}
        </AnimatePresence>
      </GridContainer>
    </Container>
  );
};

export default SharedElement;
