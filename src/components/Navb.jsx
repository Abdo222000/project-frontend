import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice.js";
import { useNavigate } from 'react-router-dom';


function Navb({api_url}) {
    const navigate = useNavigate();
    const authToken = localStorage.getItem("userToken"); 
    const { username, isLoggedIn } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    async function btnlogout() {
        let answer = confirm("log out ?")
        if (!answer) { return }
        const API_URL = `${api_url}logout/`;
        let apiSuccess = false;
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}` 
                },
            });

            if (response.ok || response.status === 200) {
                console.log("API Logout successful.");
                apiSuccess = true;
            } else {
                console.error("API Logout failed. Status:", response.status);
            }
        }
        catch (error) {
            console.error("Network error during API logout:", error);
        } finally {
            localStorage.clear();
            dispatch(logout());   
            navigate(`/`);
            
            if (!apiSuccess) {
                alert("Logout completed locally, but there was an error clearing the session on the server.");
            }
        }
    }
    return (
        <>
            <div className="container pt-5 ">
                    <div className="row">
                    <div className='col-12'>
                        <div className="d-flex justify-content-center gap-lg-5 gap-3 flex-wrap mx-5">
                            <NavLink to={`/`} style={({ isActive }) => ({ color: isActive ? "red" : "black" })}>Home Page</NavLink>
                            {!isLoggedIn && (
                                <>
                                    <NavLink to={`/login`} style={({ isActive }) => ({ color: isActive ? "red" : "black" })}>Login Page</NavLink>
                                    <NavLink to={`/register`} style={({ isActive }) => ({ color: isActive ? "red" : "black" })}>Register Page</NavLink>
                                </>
                            )}
                            {isLoggedIn && (
                                <>
                                    <NavLink to={`/createproject`} style={({ isActive }) => ({ color: isActive ? "red" : "black" })}>Create Projects Page</NavLink>
                                    <NavLink to={`/projectslist`} style={({ isActive }) => ({ color: isActive ? "red" : "black" })}>Projects List Page</NavLink>
                                    <div>
                                        <button className="btn btn-outline-dark" onClick={btnlogout} >Welcome, {username}</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navb