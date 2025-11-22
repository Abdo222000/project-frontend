import React from 'react'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function Projectslist({api_url}) {
    const userState = useSelector((state) => state.user);
    const [isFUllView, setIsFullView] = useState(true);    
    useEffect(() => {
    const handleResize = () => {
        setIsFullView(window.innerWidth > 992);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, []);

    const username = userState.username;
    const authToken = localStorage.getItem("userToken"); 
    // console.log(currentUserId,username)
    const formatDateTime = (isoString) => {
        if (!isoString) return 'N/A';
        try {
            return new Date(isoString).toLocaleString('en-UK', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: 'UTC'
            });
        } catch (e) {
            console.log(e)
            return 'Invalid Date';
        }
    };
    
    let [siteData,setdata]= useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let [nodata, setnodata] = useState(false);
    async function getdata() {
        setnodata(false);
        setIsLoading(true);
        const API_URL = `${api_url}projects/`;
        let payload_headers = {
            'Content-Type': 'application/json',
            // 'token': `${authToken}`,
            'Authorization':`token ${authToken}`
        };
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: payload_headers
            });
            // console.log(payload_headers)
            if (response.status === 201 || response.ok) {
                const result = await response.json();
                // console.log("Projects Get Successful!", result);
                if (result.length != 0) {
                    console.log("Projects Get Successful!", result);                    
                }
                setdata(result)
                if (result.length === 0) {
                    console.log("There are no data !");
                    setnodata(true);
                }
            } else {
                const errorData = await response.json();
                console.error("Projects Get Failed:", response.status, errorData);
                alert({ 
                    message: `Failed to load projects: ${response.status} - ${errorData.detail || 'Server Error'}`, 
                    type: 'error' 
                });
            }
        }
        catch (error){
            console.error("Network Error during project creation:", error);
            alert("A network error occurred. Please check your CORS configuration and connectivity.");
        } finally {
            setIsLoading(false); 
        }
    }

    useEffect(() => {
        getdata();
    },[]);
    async function delete_project(id) {
        const API_URL = `${api_url}projects/${id}/`; 
        
        let payload_headers = {
            'Content-Type': 'application/json',
            'Authorization':`token ${authToken}`
        };

        if (!window.confirm("Are you sure you want to delete this project?")) {
            return;
        }
        
        try {
            const response = await fetch(API_URL, {
                method: 'DELETE',
                headers: payload_headers
            });

            if (response.status === 204) { 
                // console.log(`Project ${id} Deleted Successfully!`);
                alert("Project deleted successfully!");
                getdata(); 
            } else {
                const errorData = await response.json(); 
                console.error(`Project ${id} Deletion Failed:`, response.status, errorData);
                alert(`Deletion Failed: ${response.status} - ${errorData.detail || 'Server Error'}`);
            }
        }
        catch (error){
            console.error("Network Error during project deletion:", error);
            alert("A network error occurred. Please try again.");
        }
    }

    async function donate_project(id) {
        const amount = prompt("Enter the amount you wish to donate:");

        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            if (amount !== null) alert("Please enter a valid amount greater than 0.");
            return;
        }
        const API_URL = `${api_url}projects/${id}/donate/`;
        let payload_headers = {
            'Content-Type': 'application/json',
            'Authorization':`token ${authToken}`
        };

        try {
            const response = await fetch(API_URL, {
                method: 'PATCH',
                headers: payload_headers,
                body: JSON.stringify({
                    donation_amount: parseFloat(amount)
                })
            });

            if (response.ok) { 
                const result = await response.json();
                console.log(`Donation Successful!`, result);
                alert(`Donation of $${amount} successful!`);
                getdata(); 
            } else {
                const errorData = await response.json(); 
                console.error(`Donation Failed:`, response.status, errorData);
                alert(`Donation Failed: ${response.status} - ${errorData.donation_amount || errorData.detail || 'Server Error'}`);
            }
        }
        catch (error){
            console.error("Network Error during donation:", error);
            alert("A network error occurred. Please try again.");
        }
    }
    if (isLoading) {
        return (
            <div className='container my-5 text-center'>
                <div className='h1 py-3'>Loading Projects...</div>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="py-4"> </div>
                <div className="py-4"> </div>
                <div className="py-4"> </div>
                <div className="py-4"> </div>
            </div>
        );
    }
    if (nodata) {
        return (
            <div className='container my-5 text-center'>
                <div className='h1 text-center py-3'>
                    All Projects
                </div>
                <div className="alert alert-info" role="alert">
                    <h4 className="alert-heading">No Projects Found!</h4>
                    <p>There are currently no fundraising projects available.</p>
                    <hr/>
                    <p className="mb-0">You can create a new project to start fundraising.</p>
                </div>
                <div className="py-4"> </div>
            </div>
        );
    }
    return (
        <div className='container my-5'>
            <div className='h1 text-center py-3'>
                All Projects
            </div>
            <table className='table table-dark table-striped table-bordered table-hover'>
                <thead>
                <tr className='text-center align-middle'>
                    {isFUllView&&<th>Project ID</th>}
                    <th>Project Title</th>
                    <th>Project Details</th>
                    {isFUllView&&<th>Project Start Time</th>}
                    {isFUllView&&<th>Project End Time</th>}
                    <th>Project Total Target</th>
                    <th>Project Total Raised</th>
                    {isFUllView&&<th>Project Created by User id</th>}
                    <th colSpan="2">Action</th>
                </tr>
                </thead>
                <tbody>
                {siteData.map((proj) => (
                <tr className='text-center align-middle' key={proj.id}>
                    {isFUllView&&<td>{proj.id}</td>}
                    <td>{proj.title}</td>
                    <td>{proj.details}</td>
                    {isFUllView&&<td>{formatDateTime(proj.start_time)}</td>}
                    {isFUllView&&<td>{formatDateTime(proj.end_time)}</td>}
                    <td>{proj.total_target} $</td>
                    <td>{proj.total_raised} $</td>
                    {isFUllView&&<td>{proj.user}</td>}
                    {(username == proj.user) ? (
                        <td>
                            <Link type="button" className="btn btn-light btn-sm"
                                role='button' to={`/projectslist/${proj.id}`}>
                                Edit
                            </Link>
                        </td>
                    ) : (
                        <td colSpan="2">
                            <button className="btn btn-success btn-sm"
                                    onClick={() => donate_project(proj.id)}>
                                Donate
                            </button>
                        </td>
                    )}
                    {(username == proj.user) ? (    
                    <td>
                        <button type="button" className="btn btn-danger btn-sm "
                            onClick={() => delete_project(proj.id)}>
                        Delete 
                        </button>
                    </td>
                    ):<></>}        
                </tr>
                ))}
                </tbody>
            </table>
            <div className="pb-4"></div>
    </div>
    )
}

export default Projectslist
