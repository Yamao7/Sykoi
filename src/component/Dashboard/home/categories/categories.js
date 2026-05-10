import React from "react";
import Food from "../../../foodimage";
import '../categories/categories.css'
import HomeMaintenance from '../../image/HomeMaintenance.png'
import SelfPamper from '../../image/SelfPamper.png'
import korean from '../../image/SelfImprovement.png'
import { useHistory } from "react-router-dom";
function Categories(){
    const history=useHistory()
    let Food1=Food.filter((ele)=>ele.titlename==='HomeMaintenance');
    let Food2=Food.filter((ele)=>ele.titlename==='SelfPamper');
    let Food3=Food.filter((ele)=>ele.titlename==='SelfImprovement');
    function Alldish(titleId){
        history.push(`/alldish?id=${titleId}`)
    }
    return (
        <div className="category-list">
           <h2>Categories</h2>
           <div className="category-main">
           <div className="cont"><img src={HomeMaintenance} alt='HomeMaintenance' onClick={()=>Alldish(Food1[0].titleId)} ></img>
           <p >Home Maintenance</p></div> 
           <div className="cont"><img src={SelfPamper} alt='SelfPamper' onClick={()=>Alldish(Food2[0].titleId) }  ></img>
           <p>Self-Pamper</p></div> 
           <div className="cont"><img src={korean} alt='SelfImprovement'  onClick={()=>Alldish(Food3[0].titleId) } ></img>
           <p>Self-Improvement</p></div>
           </div>
        </div>
    )
}
export default Categories