import './footer.css';
import { Link } from 'react-router-dom';

function footer() {
    return (
        <>
            <div className="footer">

                <p>@ Connectify. All rights reserved. | Met with some issues ? Please contact us <Link to="/contact">here !</Link> </p>
            </div>
        </>

    )

}

export default footer;