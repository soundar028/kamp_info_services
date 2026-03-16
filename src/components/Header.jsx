import React from 'react';
import HeaderTop from './HeaderTop';
import MainMenu from './MainMenu';

const Header = (props) => {
    const { parentMenu } = props;

    return (
        <>
            <HeaderTop />
            <MainMenu parentMenu={parentMenu} />
        </>
    );
};

export default Header;