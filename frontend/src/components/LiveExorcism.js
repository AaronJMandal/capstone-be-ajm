import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaCameraRetro } from "react-icons/fa6";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

const reigenNerv = require("../imgs/reigennerv.gif");

const LiveExorcism = () => {
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <Wrapper>
        <GridBox
          clicked={isClicked}
          onClick={() => {
            setIsClicked(true);
          }}
        >
          Need an live graphical live exocism? I'm the man for you!
          <CustomArrow />
        </GridBox>
        <GridBoxButton
          as="button"
          onClick={() => {
            navigate("/joe");
          }}
        >
          Upload image here!
          <CustomCamera />
        </GridBoxButton>
        <img alt="gif" src={reigenNerv} style={{ width: "150px" }}></img>
      </Wrapper>
    </>
  );
};

export default LiveExorcism;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3em;
`;

const GridBox = styled.div`
  position: absolute;
  transition: left 1s ease-out, transform 1s ease-out;
  left: ${({ clicked }) => (clicked ? "-1000px" : "50%")};
  transform: ${({ clicked }) => (clicked ? "none" : "translateX(-50%)")};
  padding: 1.8em;
  color: #a7ff42;
  background: #9a42ff;
  font-weight: 500;
  font-size: 1.5em;
  max-width: 30ch;
  border-radius: 3px;
  line-height: 110%;
  text-align: center;
  z-index: 10;
  cursor: pointer;
`;

const GridBoxButton = styled.div`
  position: relative;
  transition: all 0.2s ease-out;
  padding: 1.8em;
  color: #50e51a;
  background: #af1ae5;
  font-weight: 500;
  font-size: 1.5em;
  border-radius: 3px;
  cursor: pointer;
  border: solid teal;
  text-decoration: none;
  z-index: 5;
`;

const CustomCamera = styled(FaCameraRetro)`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const CustomArrow = styled(MdArrowOutward)`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 1.5em;
`;
