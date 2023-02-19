import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from "react-router-dom";
import './profilebutton.css'
import { useSelector } from "react-redux";
import { getCurrentSpots } from "../../store/spots";


function ProfileButton({ user }) {
    const currentSpots = useSelector(state => state.spots.allSpots)
    const currentVal = Object.values(currentSpots)
    const history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    // useEffect(() => {
    //     dispatch(getCurrentSpots(user.id))
    // }, [dispatch])
 const manage = () => {
    for (let spot of currentVal ) {
        if (user.id === spot.ownerId) {
            return true
        }
    }
 }
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

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button onClick={openMenu}>
                <i className="fas fa-user-circle" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                    <div className="profile-list">
                        <li>{user?.username}</li>
                        <li>{user?.firstName} {user.lastName}</li>
                        <li>{user?.email}</li>
                        <li className={manage() ? 'show' : 'dontShow'}>Manage Your Spots</li>
                        <li>
                            <button onClick={logout}>Log Out</button>
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
                            modalComponent={<SignupFormModal />}
                        />
                        </div>
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
