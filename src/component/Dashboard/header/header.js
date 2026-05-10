import React, { useState } from "react";
import logo from '../image/sykoi.png';
import cartimg from '../image/hire.png';
import '../header/header.css';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Header() {
    // FIX: Changed cartTotalQUantity to cartTotalQuantity (lowercase 'q')
    const { cartTotalQuantity } = useSelector((state) => state.cart); 
    let history = useHistory();
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // New state for error messages

    function AddCart() {
        history.push('/cart');
    }

    function Profile() {
        history.push('/profile');
    }

    function gotoHome() {
        history.push('/home');
    }

    function Logout() {
        history.push('');
    }

    function handleSearch() {
        setErrorMessage(''); // Clear previous error messages

        const trimmedQuery = searchQuery.trim();

        if (!trimmedQuery) {
            setErrorMessage("Search input cannot be empty.");
            return;
        }

        // TC3: Reject numeric-only search input
        if (/^\d+$/.test(trimmedQuery)) { // Checks if string contains only digits
            setErrorMessage("Search query cannot be numeric-only.");
            return;
        }

        // TC2: Reject special characters (you might define what's allowed/disallowed)
        const forbiddenChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (forbiddenChars.test(trimmedQuery)) {
            setErrorMessage("Search query contains forbidden special characters.");
            return;
        }

        // TC1: Accept alphanumeric search input (partially handled by the above rejection)
        if (!/[a-zA-Z]/.test(trimmedQuery)) {
             setErrorMessage("Search query must contain at least one letter.");
             return;
        }

        // If all validations pass, navigate
        history.push(`/search-results?query=${encodeURIComponent(trimmedQuery)}`);
    }

    return (
        <div className="header">
            <img src={logo} className='logo' alt="Logo"></img>
            <div>
                <input
                    type='text'
                    className="search-input"
                    placeholder="Search for dishes..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setErrorMessage(''); // Clear error when user types again
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <button onClick={handleSearch}>Search</button>
                {/* Feedback for the user */}
                {errorMessage && <p style={{ color: 'red', fontSize: '0.8em', position: 'absolute', bottom: '-20px', left: '0' }}>{errorMessage}</p>}
            </div>

            <div style={{ position: 'relative', width: '100px' }}>
                <button className="cart-button" onClick={AddCart}>
                    <img src={cartimg} alt="Cart"></img>
                </button>
                {/* FIX: Use the corrected variable name cartTotalQuantity */}
                <span className="msg"> {cartTotalQuantity}</span> 
            </div>
            {' '}
            <button className="cart-button" ><p style={{ color: "white", marginTop: '12px' }} onClick={gotoHome}>Home</p></button>
            <button className="cart-button" ><p style={{ color: "white", marginTop: '12px' }} onClick={Profile}>Profile</p></button>
            <button className="cart-button" ><p style={{ color: "white", marginTop: '12px' }} onClick={Logout}>Log out</p></button>
        </div>
    );
}

export default Header;