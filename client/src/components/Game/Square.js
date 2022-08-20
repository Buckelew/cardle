import "./Square.css";

function Square({ title, image, text, style }) {
    return (
        <div className={`Square ${style}`}>
            {/* <h1>{title}</h1> */}
            {image ? <img src={image} /> : ''}
            {text ? <span>{text}</span> : ''}
        </div>
    );
}

export default Square;
