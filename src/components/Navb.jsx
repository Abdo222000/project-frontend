import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userslice";


function Navb() {
    const { username, isLoggedIn } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    function btnlogout() {
        let answer = confirm("log out ?")
        if (answer) {
            localStorage.clear()
            dispatch(logout())   
            // window.location.reload();
            window.location.href = `../`;
        }
        else{return}
    }
    return (
        <>
            <div className="container mt-5 ">
                    <div className="row">
                    <div className='col-12'>
                        <div className="d-flex justify-content-center gap-lg-5 gap-sm-3 flex-wrap mx-5">
                            <NavLink to={`/`} style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}>Home Page</NavLink>
                            <NavLink to={`/login`} style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}>Login Page</NavLink>
                            <NavLink to={`/register`} style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}>Register Page</NavLink>
                            {isLoggedIn ? (<>
                                <NavLink to={`/createproject`} style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}>Create Projects Page</NavLink>
                                <NavLink to={`/projectslist`} style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}>Projects List Page</NavLink>
                                <div>
                                    <button className="btn btn-outline-dark" onClick={btnlogout} >Welcome, {username}</button>
                                </div>
                            </>
                            ) :<></>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navb