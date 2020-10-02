import React from 'react';
import { faCircle, faPlane} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Logo =()=>{

    return <div >
    <FontAwesomeIcon icon={faPlane} />
    <FontAwesomeIcon icon={faCircle} />
    <FontAwesomeIcon icon={faCircle}  />
    <FontAwesomeIcon icon={faCircle}  />

    </div>
}

export default Logo