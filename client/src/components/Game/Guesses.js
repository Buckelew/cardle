import "./Guesses.css";
import Guess from './Guess';

function Guesses({ guesses }) {
    return (
        <div className="Guesses">
            {guesses.map((guess, i) => (
                <Guess key={i} guess={guess} />
            ))}
        </div>
    );
}

export default Guesses;
