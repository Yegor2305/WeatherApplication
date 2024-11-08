import {FC} from "react";
import img from "../assets/error.png"
import {Link} from "react-router-dom";

const Error : FC = () => {
    return <div className='to-center-content bg-third max-height flex-y'>
        <img src={img} alt='img'/>
        <Link to='/' className='btn a-default pad-x-20'>
            Back
        </Link>
    </div>
}

export default Error;