import React from 'react';
import SocialShare from './SocialShare';

const SingleTeam = ({ team }) => {
    const { image, name, title } = team;

    return (
        <>
            <div className="team-member">
                <div className="team-member-thumb">
                    <img src={`img/team/${image}`} alt="teamMember" />
                </div>
                <h2>{name}</h2>
                <h3>{title}</h3>
                <div className="team-social-profile">
                    <SocialShare />
                </div>
            </div>
        </>
    );
};

export default SingleTeam;