import "./Won.css";
import { useState, useEffect, useRef } from "react";

function Won({ car }) {
  const [countdown, setCountdown] = useState(``);
  const [carImage, setCarImage] = useState();
  const [loading, setLoading] = useState(true);
  const wonRef = useRef(null);

  useEffect(() => {
    setTimeout(
      () => {
        const date = new Date(
          new Date().toLocaleString("en-US", {
            timeZone: "America/Los_Angeles",
          })
        );

        setCountdown(
          `${(24 - date.getHours()).toLocaleString("en-us", {
            minimumIntegerDigits: 2,
          })}:${(60 - date.getMinutes()).toLocaleString("en-us", {
            minimumIntegerDigits: 2,
          })}:${(60 - date.getSeconds()).toLocaleString("en-us", {
            minimumIntegerDigits: 2,
          })}`
        );
      },
      // remove timer if no countdown active
      countdown ? 1000 : 0
    );
  });

  useEffect(() => {
    // get car details
    fetch(`/cardetails?make=${car.make}&model=${car.model}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.image && res.image.thumbnail) {
          setLoading(false);
          setCarImage(res.image.thumbnail);
        } else {
          // error getting image
          console.log("error getting image", res);
        }
      })
      .catch((err) => {
        console.log("unknown error getting image", err);
      });
  }, []);

  // scroll into view
  useEffect(() => {
    if (!loading && wonRef && wonRef.current) {
      console.log("winreg");
      setTimeout(() => {
        wonRef.current.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
  }, [loading]);

  // if (wonRef && wonRef.current)
  //   wonRef.current.scrollIntoView({ behavior: "smooth" });

  return !loading ? (
    <div className="Won" ref={wonRef}>
      <h3 className="animate-charcter">You got it!</h3>
      <div className="user-guess">
        <img src={carImage} alt="car" />
        <p>
          You guessed
          <br />
          <span className="bold">{`${car.make} ${car.model}`}</span>
        </p>
      </div>
      {/* <br /> */}
      <div className="next">
        <p>
          Next car in
          <br />
          <span className="bold">{countdown}</span>
        </p>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Won;
