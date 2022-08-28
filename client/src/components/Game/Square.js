import { useState, useEffect } from "react";
import "./Square.css";

function Square({ title, image, images, text, style }) {
  const [textIndex, setTextIndex] = useState(0);

  let splitText = text ? text.split(", ") : [];
  useEffect(() => {
    // handle cycle
    if (splitText.length > 1) {
      const interval = setInterval(() => {
        if (textIndex + 1 < splitText.length) {
          setTextIndex(textIndex + 1);
        } else {
          setTextIndex(0);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [textIndex]);

  const textElement = splitText[textIndex];
  image = images ? images[textIndex] : image;

  return (
    <div className={`Square ${style}`}>
      {/* <h1>{title}</h1> */}
      {image ? <img src={image} /> : ""}
      {text ? <span>{textElement}</span> : ""}
    </div>
  );
}

export default Square;
