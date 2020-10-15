import React from 'react';
import { faCircle, faPlane} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";


const Logo =()=>{

    return <div >
        <Link to='/home'>
    <FontAwesomeIcon icon={faPlane} />
    <FontAwesomeIcon icon={faCircle} />
    <FontAwesomeIcon icon={faCircle}  />
    <FontAwesomeIcon icon={faCircle}  />
        </Link>

    </div>
}

export default Logo