// import '../style/contact.css';
import React, { Component } from 'react';
import Form from '../components/form/form';
import formImg from '../ressources/contact/fd_contact.jpg';
import Actualites from '../components/article/article';


class contactForm extends Component {
    render() {
        return (
            <div className="contact-body">
                <Actualites side="left" image={formImg}><Form /></Actualites>
            </div>
        );
    }
}

export default contactForm;