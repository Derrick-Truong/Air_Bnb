import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormPage   from '../SignupFormPage';
import { useHistory } from "react-router-dom";
import './profilebutton.css'
import { useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import { getCurrentSpots } from "../../store/spots";


function ProfileButton({ user }) {

    const currentSpots = useSelector(state => state.spots.allSpots)

    const currentVal = Object.values(currentSpots)

    const history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();



    // useEffect(() => {
    //     dispatch(getCurrentSpots())
    // }, [dispatch])



    // useEffect(() => {
    //     dispatch(getCurrentSpots(user.id))
    // }, [dispatch])
    // const manage = () => {
    //     for (let spot of currentVal) {
    //         if (user.id === spot.ownerId) {
    //             return true
    //         }
    //     }

    // }
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push('/')
    };
    const clickSub = (e) => {
        e.preventDefault()
         history.push('/spots/current')
     }
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <div className="button-container" onClick={openMenu}>
                <i className="fa fa-bars" />
                <i className="fa fa-user-circle-o" />
            </div>

            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <div className="profile-list">
                            <li>Hello, {user?.username}</li>
                            <li>{user?.email}</li>
                            <hr class="new1"></hr>
                            <li ><NavLink exact to="/spots/current">Manage Your Spots</NavLink></li>
                            <li> <hr class="new1"></hr>
                                <button class="sign-out-button" onClick={logout}>Log Out</button>

                            </li>
                        </div>
                    </>

                ) : (
                    <>
                        <div className="log-sign-up">
                            <OpenModalMenuItem
                                itemText="Log In"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormPage />}
                            />
                        </div>
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
