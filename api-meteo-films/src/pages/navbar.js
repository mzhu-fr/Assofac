
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/meteo">METEO</Link>
            <Link to="/movie">MOVIE</Link>
        </div>
    )
}