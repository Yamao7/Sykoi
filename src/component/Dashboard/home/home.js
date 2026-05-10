import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Imageslide from "./Imageslides";
import Header from "../header/header";
import '../header/header.css'
import HomeMaintenance from "./categories/HomeMaintenance/HomeMaintenance";
import Footer from "../footer/footer";
import SelfPamper from "./categories/SelfPamper/SelfPamper";
import { useSelector,useDispatch } from "react-redux";
import { getTotals } from "../cart/cartslice";
import { useEffect } from "react";
import Categories from "./categories/categories";
import SelfImprovement from "./categories/SelfImprovement/SelfImprovement";
function Home(){
    const cart=useSelector((state)=>state.cart)
    let dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getTotals())
    },[cart,dispatch])
    const slides=[
        { url:require("../image/slide1.png"),title:'slide1'},
        { url:require("../image/slide2.png"),title:'slide2'},
        { url:require("../image/slide3.png"),title:'slide3'}
    ]
    return(
        <div className="home">
            <Header/>
            <div className="bg">
                
                <div className="main-slice">
                    <Imageslide slides={slides} />
                </div>
            </div>
            <Categories />
            <div className="categories">
            <HomeMaintenance />
         <SelfPamper />
         <SelfImprovement />
            </div>
         
         <Footer/>
        </div>

    )
}

export default Home