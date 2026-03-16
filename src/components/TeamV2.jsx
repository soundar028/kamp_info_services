import React from 'react';
import TeamHeaderV2 from './TeamHeaderV2';
import TeamData from '../jsonData/TeamData.json'
import SingleTeam from './SingleTeam';

const TeamV2 = () => {
    return (
        <>
            <TeamHeaderV2 />
            <section className="team-sec pb-70">
                <div className="container">
                    <div className="row">
                        {TeamData.map(team =>
                            < div className="col-lg-3 col-md-6" key={team.id} >
                                < SingleTeam team={team} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default TeamV2;