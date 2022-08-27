import "./Popup.css";
import x from "../../assets/x.png";

function Popup({ show, setShow, body, title, footer }) {
  console.log("render");
  return (
    <div className="Popup">
      <div class="Popup-content">
        <div class="Popup-header">
          <h3 className="">{title}</h3>
          <img src={x} alt="close" onClick={() => setShow(false)} />
        </div>
        <div className="Popup-body">{body}</div>
        <div className="Popup-footer">{footer}</div>
      </div>
    </div>
  );
}

export default Popup;
