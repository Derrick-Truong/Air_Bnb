// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from './OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import CreateSpot from '../CreateSpot';
import please from '../../assets/images/please.jpeg'


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='nav-wrapper'>
        <div className='navigation-bar'>
            <div className='nav-innerdiv'>
                <div className='left-nav-div'>
                    <a href="/">
                        <img src={please} height="60px" width="80px" alt="DrBnb"/>
                    </a>
                </div>
                <div className='navigation-bar-default'>
                {isLoaded && (
                    <div className='right-nav-div'>
                <div className='right-nav-div'>
                    {sessionUser ? (
                        <span className='create-spot-nav'>
                    <NavLink exact to="/spots/new" className="create-spot-2">
                        Create a New Spot
                    </NavLink>

                        </span>
                    ) : <></>}
                    <div className='profile-button'>
                        <ProfileButton user={sessionUser} />
                    </div>
                </div>
                </div>
            )}
        </div>

            </div>
        </div>
            <div className='footer'>
                <p className="links-footer">
                    <a className="linkedin" href="https://www.linkedin.com/in/derrick-truong-1a092121a/" target="_blank">LinkedIn</a>
                    <a className="github" href="https://github.com/Derrick-Truong" target="_blank">Github</a>
                    {/* <a className="portfolio" href="https://kishaonia.github.io/KishaOnia/" target="_blank">Portfolio</a> */}
                    <a className="email" href="mailto:dtruong169@gmail.com" target="_blank">Email</a>
                </p>
            </div>
    </div>
    );

}




export default Navigation;
