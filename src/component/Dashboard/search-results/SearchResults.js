// src/components/searchresults/SearchResults.jsx (You'll need to create this file and folder)

import React, { useState, useEffect } from "react";
import Food from "../../foodimage"; // Adjust path as needed
import Footer from "../footer/footer"; // Adjust path as needed
import Header from "../header/header"; // Adjust path as needed
import { useHistory, useLocation } from "react-router-dom";
import { addTocart } from "../cart/cartslice"; // Adjust path as needed
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from "../cart/cartslice";

// Assuming you have a CSS file for categories or similar styling
import '../home/categories/categories'; // Adjust path if needed

function SearchResults() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);

    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query'); // Get the search query from the URL

    useEffect(() => {
        if (searchQuery) {
            const filteredData = Food.filter((ele) =>
                ele.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ele.description.toLowerCase().includes(searchQuery.toLowerCase()) // You can add more fields to search
            );
            setSearchResults(filteredData);
        } else {
            setSearchResults([]); // Clear results if no search query
        }
    }, [searchQuery]); // Re-run effect when searchQuery changes

    const cart = useSelector((state) => state.cart);
    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    function detailed(id) {
        history.push(`/singledish?id=${id}`);
    }

    function order() {
        history.push('/cart');
    }

    function AddtoCart(ele) {
        dispatch(addTocart(ele));
    }

    return (
        <div className="sfp-bg">
            <Header />

            <div className="All-dish-card">
                {searchResults.length > 0 ? (
                    searchResults.map((ele) => {
                        return (
                            <div key={ele.id} className='Perslide'>
                                <img src={ele.url} alt={ele.title} onClick={() => detailed(ele.id)}></img>
                                <p>{ele.title}</p>
                                <span style={{ display: 'block' }}>₱{ele.rate}</span>
                                <button className="slide-cart-button" onClick={order}>Order</button>{'  '}
                                <button className="slide-cart-button" onClick={() => AddtoCart(ele)}>+Add to Cart</button>
                            </div>
                        );
                    })
                ) : (
                    <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>
                        No dishes found for "{searchQuery}". Try a different search term.
                    </p>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default SearchResults;