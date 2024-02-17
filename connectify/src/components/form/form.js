import './form.css'

function contactForm () {

    return (

        <div className="contactForm">
            <form>
                <div className="formContent email">
                    <label>Email : </label>
                    <input type="email" placeholder="please enter your email ..."/>
                </div>
                <div className="formContent subject">
                    <label>Subject : </label>
                    <input type="text" placeholder="enter the subject ..."/>
                </div>
                <div className="formContent message">
                    <label>Message : </label>
                    <input type="text" rows = "10" placeholder="please enter your message ..." />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )

}

export default contactForm;