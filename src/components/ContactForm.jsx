import React from 'react';
import { toast } from 'react-toastify';

const ContactForm = () => {

    const handleMessage = (event) => {
        event.preventDefault()
        event.target.reset()
        toast.success("Thanks for Your Message")
    }

    return (
        <>
            <div className="contact-page-form">
                <h2>Get in Touch</h2>
                <form onSubmit={handleMessage}>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="single-input-field">
                                <input type="text" placeholder="Your Name*" name="name" autoComplete='off' required />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="single-input-field">
                                <input type="email" placeholder="E-mail*" name="email" autoComplete='off' required />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="single-input-field">
                                <input type="number" placeholder="Phone Number*" name="phone" autoComplete='off' required />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="single-input-field">
                                <input type="text" placeholder="Subject*" name="subject" autoComplete='off' required />
                            </div>
                        </div>
                        <div className="col-sm-12 message-input">
                            <div className="single-input-field">
                                <textarea placeholder="Write Your Message*" name="message" autoComplete='off' required></textarea>
                            </div>
                        </div>
                        <button type="submit" className='submit-btn'>Send Now</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContactForm;