import React from 'react'
import { Image } from 'cloudinary-react'
function DashProps(props) {
       return (
              <div className='dash-props-container'>
                     <Image
                     className='dashProfile-pic'
                     cloudName="delktfw1a" 
                     publicId={props.img}
                     />
                     <div className='user-props-container'>
                            <h1 onClick={props.click}>{props.user}</h1>
                            <p>{props.post}</p>
                     </div>
              </div>
       )
}

export default DashProps
