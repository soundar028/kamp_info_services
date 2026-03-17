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
                        <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d993.6594364281955!2d76.95824273710969!3d11.084138926242508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s520%2C%20V.K.V%20Nagar%2C%20N.G.G.O%20Colony%2C%20Thudiyalur%2C%20Coimbatore%20641021!5e0!3m2!1sen!2sin!4v1773717462248!5m2!1sen!2sin" width="100%" height="450" allowFullScreen></iframe>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactContent;