import React from 'react';
import TeamData from '../jsonData/TeamData.json'
import SingleTeam from './SingleTeam';

const Team = () => {
    return (
        <>
            <section className="team-sec pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="team-support-inner">
                                <span>Support Stuff</span>
                                <h1>We have Professional Stuff, 24/7 support service</h1>
                                <p>Lorem ipsum dolor sit amet, choro tamquam vim id, aliquip vivendo repudiare vim te, et his case vidisse tractatos. Nec bonorum iudicabit eloquentiam eu, at reque laboramus quo.</p>
                                <p>Cu mei virtute pericula expetendis, pri nihil laboramus constituto an. No labore possim has, maiorum scribentur sed eu. Sit eu prima perpetua, ex pri magna brute novum. Falli appellantur vis te, atqui moderatius efficiantur ius te, quo dicant ignota disputando ex. Quod impetus has ea, vix ea recteque principes dissentias, mucius labore sanctus ne sea.</p>
                                <ul>
                                    <li><a href="mailto:admin@finixpa.com"><i className="icofont-envelope"></i>Contact Us <i className="icofont-thin-double-right"></i></a></li>
                                    <li><a href="tel:+88 00224564"><i className="icofont-live-support"></i>+88 00224564<i className="icofont-telephone"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="row">
                                {TeamData.map(team =>
                                    < div className="col-md-6 col-sm-12" key={team.id} >
                                        < SingleTeam team={team} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default Team;