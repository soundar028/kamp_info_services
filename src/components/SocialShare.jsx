import React from 'react';

const SocialShare = () => {
    return (
        <>
            <ul>
                <li><a href="https://www.facebook.com/" target='_blank' className='facebook' rel="noreferrer"><i className="icofont-facebook"></i></a></li>
                <li><a href="https://www.twitter.com/" target='_blank' className='twitter' rel="noreferrer"><i className="icofont-twitter"></i></a></li>
                <li><a href="https://www.linkedin.com/" target='_blank' className='linkedin' rel="noreferrer"><i className="icofont-linkedin"></i></a></li>
                <li><a href="https://www.skype.com/" target='_blank' className='skype' rel="noreferrer"><i className="icofont-skype"></i></a></li>
                <li><a href="https://www.pinterest.com/" target='_blank' className='pinterest' rel="noreferrer"><i className="icofont-pinterest"></i></a></li>
            </ul>
        </>
    );
};

export default SocialShare;