import "./Guess.css";
import Square from './Square'
import bmw from '../../assets/makes/bmw.png';
import nissan from '../../assets/makes/nissan.png';
import audi from '../../assets/makes/audi.png';
import ford from '../../assets/makes/ford.png';
import germany from '../../assets/origins/germany.jpg';
import japan from '../../assets/origins/japan.png';
import usa from '../../assets/origins/usa.webp';
import black from '../../assets/black.jpg';
import engine from '../../assets/engine.png';

function Guess({ guess }) {
    // GUESS : 
    // { bodyStyles: {value: 'Compact Cars, Sport Utility Vehicles, SUV', style: 'incorrect'}
    // engine: {value: 'Inline 4', style: 'correct'}
    // engineCyl: "4"
    // engineType: "Inline"
    // make: "Audi"
    // model: "Q3"
    // origin: "Germany"
    // seats: ['5']
    // years: {value: '2012 - 2022\n ', style: 'partial'} }

    let originImg = '';
    switch (guess.origin.value) {
        case 'Germany':
            originImg = germany;
            break;
        case 'Japan':
            originImg = japan;
            break;
        case 'USA':
            originImg = usa;
            break;
        default:
            originImg = black;
            break;
    }

    let makeImg = '';
    switch (guess.make.value) {
        case 'BMW':
            makeImg = bmw;
            break;
        case 'Ford':
            makeImg = ford;
            break;
        case 'Nissan':
            makeImg = nissan;
            break;
        case 'Audi':
            makeImg = audi;
            break;
        default:
            makeImg = black;
            break;

    }
    console.log(guess);
    return (
        <div className="Guess">
            <Square title="Make" image={makeImg} style={guess.make.style} />
            <Square title="Model" text={guess.model.value} style={guess.model.style} />
            <Square title="Origin" image={originImg} style={guess.origin.style + ' origin'} />
            <Square title="Production Dates" text={guess.years.value} style={guess.years.style} />
            <Square title="Body Style(s)" text={guess.bodyStyles.value} style={guess.bodyStyles.style} />
            <Square title="Engine Type" text={guess.engine.value} style={guess.engine.style + ' engine'} image={engine} />
        </div>
    );
}

export default Guess;
