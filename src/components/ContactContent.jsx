import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactContent = () => {
    return (
        <>
            <section className="contact-page-sec pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <ContactForm />
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <ContactInfo />
                        </div>
                    </div>
                    <div className="contact-page-map mt-5">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d503103.25504622894!2d-118.94592338887756!3d34.065964560335836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2z4Kay4Ka4IOCmj-CmnuCnjeCmnOCnh-CmsuCnh-CmuCwg4KaV4KeN4Kav4Ka-4Kay4Ka_4Kar4KeL4Kaw4KeN4Kao4Ka_4Kav4Ka84Ka-LCDgpq7gpr7gprDgp43gppXgpr_gpqgg4Kav4KeB4KaV4KeN4Kak4Kaw4Ka-4Ka34KeN4Kaf4KeN4Kaw!5e0!3m2!1sbn!2sbd!4v1497798250780" width="100%" height="450" allowFullScreen></iframe>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactContent;