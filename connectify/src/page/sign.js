import '../style/connexion.css';

import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../page/userContext';

import Connect from '../ressources/signin/pexels-budgeron-bach-5158233.jpg';
import Articles from '../components/article/article';

// REGEX PATTERN
function checkPwd(pwd) {
    let validPwd = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/);
    return (validPwd.test(pwd));
}

// SIGN UP FORM
function SignUpForm() {

    const { signUp } = useContext(UserContext);
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
        if ((inputs.current[1].value.length || inputs.current[2].value.length) < 6) {
            if (inputs.current[1].value.length < 6) {
                setValidation("6 characters minimum");
            }
            if (inputs.current[2].value.length < 6) {
                setValidPwd("6 character minimum with 1 uppercase, 1 lowercase, 1 number and 1 symbol");
            }
            return;
        }
        else if (!checkPwd(inputs.current[2].value)) {
            setValidPwd("6 character minimum with 1 uppercase, 1 lowercase, 1 number and 1 symbol");
            return;
        }
        else if (inputs.current[2].value !== inputs.current[3].value) {
            setValidPwd("Password do not match !");
            return;
        }
        try {
            const credentials = await signUp(
                inputs.current[1].value,
                inputs.current[2].value
            )
            formReference.current.reset();
            setValidation("");
            navigate("/profile/profile-wall")
        }
        catch (err) {
            if (err.code === "auth/invalid-email") {
                setValidation("Email format invalid");
            }
            if (err.code === "auth/email-already-in-use") {
                setValidation("Email already used");
            }
        }
    }

    return (
        <>

            <div className="signUpForm">

                <form ref={formReference} onSubmit={handleForm}>

                    {/* USERNAME */}
                    <div className="name">

                        <div className="userName">
                            <label>Username :</label>
                            <input name="username" className="form-inputs" required ref={addInputs} type="text" placeholder='Input an username' onChange={handleOnChange} />
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label>Email :</label>
                        <input name="email" className="form-inputs" required ref={addInputs} type="email" placeholder="Enter your mail" onChange={handleOnChange} />
                        <p className="err-text">{validation}</p>
                    </div>

                    {/* PASSWORD */}
                    <div className="password-box">
                        <label>Password :</label>
                        <input name="input-passwd" className="form-inputs" required ref={addInputs} type="password" onChange={handleOnChange} />
                        <p className="err-text">{validPwd}</p>
                    </div>

                    <div className="password-check">
                        <label>Retype your password :</label>
                        <input name="repeat-paswwd" className="form-inputs" required ref={addInputs} type="password" onChange={handleOnChange} />
                        <p className="err-text">{validPwd}</p>
                    </div>

                    <button>Submit</button>
                </form>

            </div >

        </>
    )
}

function signUp() {

    return (
        <div className="logIn-style">

            <img src={Connect} alt="mobile-ver" className="image-mobile" />

            <Articles image={Connect} side="right" title="Connexion">

                {SignUpForm()}
                <p>Already have an account ? <Link to="/login" className="register-acc">Log In !</Link></p>

            </Articles>

        </div>
    );

}

export default signUp;