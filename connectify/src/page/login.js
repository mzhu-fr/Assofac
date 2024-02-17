import '../style/connexion.css';
import { Link, useNavigate } from 'react-router-dom'

import '../style/connexion.css';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../page/userContext';


import Connect from '../ressources/connection/fd_connexion.jpg';
import Articles from '../components/article/article';


function LogInForm() {

    const { logIn } = useContext(UserContext);
    const navigate = useNavigate();

    // CONST TO GET THE INPUT
    const inputs = useRef([]);
    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el);
        }
    }

    // CONST TO CLEAN THE INPUT OF THE FORM
    const formReference = useRef();

    // CONST TO ADD ERR MESSAGES
    const [validation, setValidation] = useState("");
    const [validPwd, setValidPwd] = useState("");

    const handleOnChange = () => {
        setValidPwd("");
    }

    // VALIDATE THE FORM AND CHECK THE WRONGS
    const handleForm = async e => {
        e.preventDefault();
        try {
            const credentials = await logIn(
                inputs.current[0].value,
                inputs.current[1].value
            )
            formReference.current.reset();
            setValidation("");
            navigate("/profile/profile-wall")
        }
        catch (err) {
            console.log(err);
            setValidPwd("Email and/or password is wrong, try again")
        }
    }

    return (
        <>
            <div className="logInForm">
                <form onSubmit={handleForm} ref={formReference} className="logInForm">
                    <div className="logInForm-content">
                        <label>Email :</label>
                        <input onChange={handleOnChange} ref={addInputs} type="email" placeholder='enter your email' />
                        <p className="err-text">{validation}</p>
                    </div>
                    <div className="logInForm-content">
                        <label>Password :</label>
                        <input onChange={handleOnChange} ref={addInputs} type="password" placeholder='enter your password' />
                        <p className="err-text">{validPwd}</p>
                    </div>
                    <button>Submit</button>
                </form>
            </div>

        </>
    )
}

function LogIn() {
    return (
        <div className="logIn-style">
            <img src={Connect} alt="mobile-ver" className="image-mobile" />
            <Articles image={Connect} side="left" title="Connexion">
                {LogInForm()}
                <p>Don't have an account ? <Link to="/signup" className="register-acc">Sign up !</Link></p>
            </Articles>

        </div>
    );

}

export default LogIn;