import React from 'react';
import { toast } from 'react-toastify';

const AboutForm = () => {

    const handleMessage = (event) => {
        event.preventDefault()
        event.target.reset()
        toast.success("Thanks for Your Message")
    }

    return (
        <>
            <div className="about-us-contact">
                <div className="about-us-contact-title">
                    <h1>Free Consultation</h1>
                    <div className="contact-title-border"></div>
                </div>
                <form onSubmit={handleMessage}>
                    <div className="contact-field">
                        <div className="single-input-field">
                            <input type="text" placeholder="Name" name="name" autoComplete='off' required />
                        </div>
                        <div className="single-input-field">
                            <input type="email" placeholder="Email" name="email" autoComplete='off' required />
                        </div>
                        <div className="single-input-field">
                            <input type="number" placeholder="Phone No" name="phone" autoComplete='off' required />
                        </div>
                        <div className="single-input-field">
                            <input type="text" placeholder="Subject" name="subject" autoComplete='off' required />
                        </div>
                        <div className="single-input-field mt-3">
                            <textarea placeholder="Message" name="message" autoComplete='off' required></textarea>
                        </div>
                        <div className="single-input-fields-button">
                            <button type="submit" className='submit-btn'>submit now</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AboutForm;