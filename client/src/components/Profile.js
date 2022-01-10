import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashProps from './DashProps';
import { Image } from 'cloudinary-react'

function Profile() {
       const [ profileImg, setProfileImg ] = useState();
       const [ profileCover, setProfileCover ] = useState();
       const [ image, setImage ] = useState();
       const [ postList, setPostList ] = useState();
       const [ coverImage, setCoverImage ] = useState();
       const [ myId, setMyId ] = useState();
       let history = useNavigate(  );
       let localUsername = localStorage.getItem("username");
       const getUser = async() =>{
              axios.get(`http://localhost:3001/users/${localUsername}`).then(response =>{
                     console.log(response)
                     if(response.data === null){
                            getUser();
                     }
                     setProfileImg(response.data.profile_picture);
                     setProfileCover(response.data.profile_cover);
                     setMyId(response.data.id);                     
              })

       }
       const scroll = () =>{
              const postBody = document.getElementById("post-body");
              postBody.scrollTop = postBody.clientHeight - postBody.scrollHeight;
              console.log("scroll")
       } 
       
       const getPosts = () =>{
              axios.get(`http://localhost:3001/users/posts/${myId}`).then(response =>{
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
       const uploadProfileImg = () =>{
              const imgFormData = new FormData();
              imgFormData.append("file", image);
              imgFormData.append("upload_preset", "fy5ahm9g");
              axios.post(`https://api.cloudinary.com/v1_1/delktfw1a/image/upload`, imgFormData).then(response =>{
                     const fileName = response.data.public_id
                     const updatedData = {
                            profile_picture: fileName
                     }
                     axios.put(`http://localhost:3001/users/profile/${profileImg}`, updatedData).then(response =>{
                            console.log(response);
                            window.location.reload();
                     })
              })
       }
       const uploadCoverImg = () =>{
              const imgFormData = new FormData();
              imgFormData.append("file", coverImage);
              imgFormData.append("upload_preset", "fy5ahm9g");
              axios.post(`https://api.cloudinary.com/v1_1/delktfw1a/image/upload`, imgFormData).then(response =>{
                     const fileName = response.data.public_id
                     const updatedData = {
                            profile_cover: fileName
                     }
                     axios.put(`http://localhost:3001/users/cover/${profileCover}`, updatedData).then(response =>{
                            console.log(response);
                            window.location.reload();
                     })
              })
       }
       const openEditCover = () =>{
              const fileChooser = document.querySelector(".coverImg-input");
              const coverBtn = document.querySelector(".uploadCover-btn");
              fileChooser.style.display = "block";
              coverBtn.style.display = "block"; 
       }
       const openEditProfile = () =>{
              const fileChooser = document.querySelector(".profileImg-input");
              const coverBtn = document.querySelector(".uploadProfile-btn");
              fileChooser.style.display = "block";
              coverBtn.style.display = "block"; 
       }
       useEffect(() => {
              if(!localStorage.getItem("username")){
                     history("/")
              }
              getUser() 
              getPosts()
       }, [])
       return (
              <>
              <div className='profile-container' onLoad={getPosts}>
                     <Image
                     className='cover'
                     cloudName="delktfw1a" 
                     publicId={profileCover}
                     onClick={openEditCover}
                     />
                     <input 
                            type="file" 
                            name="image"
                            onChange={(e)=>{
                                   setCoverImage(e.target.files[0])
                            }}
                            className='coverImg-input'
                     />
                     <button 
                     className='uploadCover-btn'
                     onClick={()=>{uploadCoverImg()}}>Change Cover</button>
                     <Image
                     className='profilePic'
                     cloudName="delktfw1a" 
                     publicId={profileImg}
                     onClick={openEditProfile}
                     />
                     <input 
                            type="file" 
                            name="image"
                            onChange={(e)=>{
                                   setImage(e.target.files[0])
                            }}
                            className='profileImg-input'
                     />
                     <button 
                     className='uploadProfile-btn'
                     onClick={()=>{
                            uploadProfileImg();
                     }}>Change Picture</button>
              </div>
              <div className='post-list-container' id="post-body">
                     {postList}
              </div>
       </>
       )
}

export default Profile
