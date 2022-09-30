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

const ImagesZoom = ({ images, onClose }) => {
  const [currentState, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseButton onClick={onClose}>X</CloseButton>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((image) => (
              <ImgWrapper key={image.src}>
                <img src={image.src} alt={image.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentState + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: propTypes.arrayOf(propTypes.object).isRequired,
  onClose: propTypes.func.isRequired,
};
export default ImagesZoom;
