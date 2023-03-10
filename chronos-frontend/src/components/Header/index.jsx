import React, {useRef} from "react";
import "./Header.css"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector , useDispatch } from 'react-redux'
import { selectIsAuth, selectAuthUser, fetchLogout } from "../../utils/redux/slices/auth";

export const Header =  () => {
    const navRef = useRef();
    const isAuth = useSelector(selectIsAuth)
	const userData = useSelector(selectAuthUser)
    const dispatch = useDispatch()

    let avatarName = 'none.png';
    if (userData) avatarName = userData.profilePic;
    const AvatarUrl = 'http://localhost:8888/api/users/avatar/' + avatarName;
    
	const onClickLogout = (e) => {
		e.preventDefault()
		if(window.confirm('Are you sure to logout?')) {
			dispatch(fetchLogout())
			window.localStorage.removeItem('accessToken')
			window.location.reload()
		}
	}

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};
    return(
        <header>
            <h3 className="Logo"><Link className="logo" to="/">Chronos</Link></h3>

            <nav ref={navRef}>
                <form className="nosubmit">
                    <input className="nosubmit" type="search" name="search" placeholder="Search..."/>
                </form>
                <Link onClick={showNavbar} to="/account">Home</Link>
                <Link onClick={showNavbar} to="/calendars">Calendars</Link>

                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
            </nav>
            {
                isAuth ? <div>
                            <img style={{borderRadius: '50%', marginRight: '5px'}} src={AvatarUrl} alt='pic' width={32} height={32}/>
                            <button className="logout" onClick={onClickLogout}>Logout</button>
                        </div> : 
                        <Link className="logIn" to="/login">Log in</Link>
            }
            <button className="nav-btn" onClick={showNavbar}>
                <FontAwesomeIcon icon={faBars}/>
            </button>
    </header>
    )
}
