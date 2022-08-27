import { useState, useEffect } from "react";
import "./Square.css";

function Square({ title, image, images, text, style }) {
  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(false);

  let splitText = text ? text.split(", ") : [];
  useEffect(() => {
    // handle cycle
    if (splitText.length > 1) {
      setTimeout(() => {
        setFade(true);
      }, 4500);
      const interval = setInterval(() => {
        if (textIndex + 1 < splitText.length) {
          setTextIndex(textIndex + 1);
        } else {
          setTextIndex(0);
        }
        setFade(false);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [textIndex]);

  return (
    <div className={`Square ${style}`}>
      {/* <h1>{title}</h1> */}
      {image ? <img src={image} /> : ""}
      {images
        ? images.map((image, i) => (
            <img
              key={i}
              className={`${fade ? "fade" : ""} ${
                textIndex == i ? "show" : "hide"
              }`}
              src={textIndex == i ? image : ""}
            />
          ))
        : ""}
      {splitText.map((text, i) => (
        <span
          key={i}
          className={`${fade ? "fade" : ""} ${
            textIndex == i ? "show" : "hide"
          }`}
        >
          {textIndex == i ? text : ""}
        </span>
      ))}
    </div>
  );
}

export default Square;
