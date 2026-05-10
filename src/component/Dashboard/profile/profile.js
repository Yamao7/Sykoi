import React, { useState, useEffect } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import profile from '../image/profile.png';
import '../profile/profile.css';
import { useHistory } from "react-router-dom"; // Import useHistory if you want to redirect

function Profile(){
    const history = useHistory(); // Initialize useHistory

    // Safely parse user data from sessionStorage
    let userData = null;
    try {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            userData = JSON.parse(storedUser);
        } else {
            console.warn("No user data found in sessionStorage. Redirecting to login.");
            // Redirect to login if no user data is found
            history.push('/login'); // Assuming '/login' is your login route
        }
    } catch (e) {
        console.error("Error parsing user data from sessionStorage:", e);
        // Handle parsing error, e.g., clear corrupted data and redirect
        sessionStorage.removeItem('user');
        history.push('/login');
    }

    const [inputValue, setInput] = useState('');
    const [inputErr, setinputErr] = useState(false);
    const [list, listvalue] = useState([]);

    // Load saved profile address on component mount
    useEffect(() => {
        try {
            const savedProfile = sessionStorage.getItem('profile');
            if (savedProfile) {
                const parsedProfile = JSON.parse(savedProfile);
                if (parsedProfile.address) {
                    listvalue(parsedProfile.address);
                }
            }
        } catch (e) {
            console.error("Error loading profile data from sessionStorage:", e);
        }
    }, []); // Empty dependency array means this runs once on mount

    function AddEvent(){
        if(inputValue.trim().length === 0){
            setinputErr(true);
        } else {
            setinputErr(false);
            let newList = [...list, inputValue];
            listvalue(newList);
            setInput(''); // Clear input after adding
        }
    }

    function Saveprofile(){
        // Ensure userData is not null before trying to access .name
        const userName = userData ? userData.name : 'Guest';
        sessionStorage.setItem('profile', JSON.stringify({'name': userName, 'address': list}));
        // Optionally, provide user feedback that profile is saved
        alert("Profile saved successfully!"); // Using alert for simplicity, consider a custom modal in production
    }

    function remove(listname){
        let removeList = list.filter((ele) => (ele !== listname));
        listvalue(removeList);
    }

    return (
        <div className="progile-bg">
            <Header />
            <div className="profile-main">
                <img src={profile} className='imge' alt="Profile"></img> <br />
                <label> UserName </label>
                : <p> {userData ? userData.name : 'N/A'}</p><br /> {/* Safely display username */}
                
                <label> Phone no </label>
                : <p>+639003079869</p>
                <label>Address </label>
                <div style={{marginLeft:'208px',marginTop:'-32PX'}}> 
                    <textarea rows="4" cols="55" value={inputValue} onChange={(e) => setInput(e.target.value)} placeholder='Enter Your Address...'></textarea>
                    {inputErr && <small style={{display:"block", color: 'red'}}>You must write something</small>} {/* Added color for error message */}
                    <button className="btne" onClick={AddEvent}>Add Address</button>
                    
                    <ul className="profile-ul">
                        {list.map((ele, index) => ( // Added index for key prop
                            <li className="profile-li" key={index}>{ele} 
                                <button onClick={() => remove(ele)}>x</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={Saveprofile} className='savebutton'>Save</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
