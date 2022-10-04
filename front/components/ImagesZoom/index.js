import React, { useState } from "react";
import propTypes from "prop-types";
import Slick from "react-slick";
import {
  Overlay,
  Header,
  CloseButton,
  SlickWrapper,
  ImgWrapper,
  Indicator,
  Global,
} from "./styles";

const ImagesZoom = ({ image, onClose }) => {
  const [currentState, setCurrentSlide] = useState(0);

  // const Slide = <Slick.default></Slick.default>;
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseButton onClick={onClose}>X</CloseButton>
      </Header>
      <SlickWrapper>
        <div>
          {
            <Slick.default
              initialSlide={0}
              afterChange={(slide) => setCurrentSlide(slide)}
              infinite
              arrows={false}
              slidesToShow={1}
              slidesToScroll={1}
            >
              {image.map((image) => (
                <ImgWrapper key={image.src}>
                  <img
                    src={`http://localhost:3065/${image.src}`}
                    alt={image.src}
                  />
                </ImgWrapper>
              ))}
            </Slick.default>
          }
          <Indicator>
            <div>
              {currentState + 1} / {image.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  image: propTypes.arrayOf(propTypes.object),
  onClose: propTypes.func.isRequired,
};
export default ImagesZoom;
