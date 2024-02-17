import '../style/errorPage.css';
import boxMusic from '../ressources/home/fd_accueil.mp4';

function errorPage() {
    return (
        <>
            <div className="errPage">
                <video loop autoPlay muted className="videoHome" src={boxMusic} />
                <h1>Ooops you are somewhere you are not supposed to be !</h1>
                <p>Please select one of the available page in the menu</p>
            </div>
        </>
    )
}
export default errorPage;