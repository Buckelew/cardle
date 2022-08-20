import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion, faCircleInfo, faChartSimple, faGear } from '@fortawesome/free-solid-svg-icons'

function Header() {
    return (
        <div className="Header">
            <div className="Header-left">
                <FontAwesomeIcon icon={faCircleInfo} />
            </div>
            <h2>Cardle</h2>
            <div className="Header-right">
                <FontAwesomeIcon icon={faCircleQuestion} />
                <FontAwesomeIcon icon={faChartSimple} />
                <FontAwesomeIcon icon={faGear} />
            </div>
        </div>
    );
}

export default Header;
