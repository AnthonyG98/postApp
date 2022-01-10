import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Image } from 'cloudinary-react'
import DashProps from './DashProps';

function Profile() {
       const [ profileImg, setProfileImg ] = useState();
       const [ profileCover, setProfileCover ] = useState();
       const [ image, setImage ] = useState();
       const [ id, setId ] = useState();
       const [ postList, setPostList ] = useState();
       const [ coverImage, setCoverImage ] = useState();
       let history = useNavigate();
       let localUsername = localStorage.getItem("username");
       let { username } = useParams();
       const getUser = async() =>{
              axios.get(`http://localhost:3001/users/${username}`).then(response =>{
                     console.log(response)
                     if(response.data === null){
                            getUser();
                     }
                     setProfileImg(response.data.profile_picture);
                     setProfileCover(response.data.profile_cover);
                     setId(response.data.id);
              })
       }
       const scroll = () =>{
              const postBody = document.getElementById("post-body");
              postBody.scrollTop = postBody.clientHeight - postBody.scrollHeight;
              console.log("scroll")
       } 
       
       const getPosts = () =>{
              axios.get(`http://localhost:3001/users/posts/${id}`).then(response =>{
                     console.log(response)
                     setPostList(
                            response.data.map(postData =>{
                                   return <DashProps 
                                   user={postData.post_user} 
                                   post={postData.post}
                                   img={postData.post_profilePic}
                                   />
                            })
                     );                            
                     scroll();
              });
       }
       useEffect(() => {
              if(!localStorage.getItem("username")){
                     history("/")
              }
              getUser();    
       }, [])
       return (
              <>
              <div className='profile-container' onLoad={getPosts}>
                     <Image
                     className='cover-for-other'
                     cloudName="delktfw1a" 
                     publicId={profileCover}
                     />
                     <Image
                     className='profilePic-for-other'
                     cloudName="delktfw1a" 
                     publicId={profileImg}
                     />
              </div>
              <div className='post-list-container' id="post-body">
                     {postList}
              </div>
              </>
       )
}

export default Profile
