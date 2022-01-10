import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import defaultImg from "../images/default.jpg"
import { Image } from 'cloudinary-react';
import DashProps from './DashProps';
function Dashboard() {
       const [ post, setPost ] = useState();
       const [ profileImg, setProfileImg ] = useState();
       const [ username, setUsername ] = useState();
       const [ myId, setMyId ] = useState();
       const [ postList, setPostList ] = useState();
       let history = useNavigate();
       let localUsername = localStorage.getItem("username");

       const getUser = async() =>{
              axios.get(`http://localhost:3001/users/${localUsername}`).then(response =>{
                     console.log(response)
                     if(response.data === null){
                            getUser();
                     }
                     setProfileImg(response.data.profile_picture);
                     setUsername(response.data.username);
                     setMyId(response.data.id);
              })
       }
       const scroll = () =>{
              const postBody = document.getElementById("post-body");
              postBody.scrollTop = postBody.clientHeight - postBody.scrollHeight;
              console.log("scroll")
       } 
       const getProfile = (profileUrl) =>{
              console.log("clicked")
              axios.get(`http://localhost:3001/users/${profileUrl}`).then(response =>{
                     console.log(response)
                     history(`/${response.data.username}`)
              })
       }
       const getPosts = () =>{
              axios.get("http://localhost:3001/users").then((response)=>{
                     setPostList(
                            response.data.map(postData =>{
                                   return <DashProps 
                                   user={postData.post_user} 
                                   post={postData.post}
                                   img={postData.post_profilePic}
                                   click={()=>{getProfile(postData.post_user)}}
                                   />
                            })
                     );                            
                     scroll();                     
              });
       };
       const onPost = () =>{
              const postData = {
                     post: post,
                     post_user: username,
                     post_profilePic: profileImg,
                     userId: myId
              }
              axios.post("http://localhost:3001/users/post", postData).then(response =>{
                     console.log(response);
                     window.location.reload();
              })
       }

       useEffect(() => {
              if(!localStorage.getItem("username")){
                     history("/")
              }
              getUser();
              scroll();
              getPosts();
       }, [])
       return (
              <>
              <div className='dashboard-container'>
                     <div className='dash-profile-container'>
                            <div className='profile-pic'>
                                   <Link to="/profile" className='dash-link'>
                                          <Image
                                          className='dashProfile-pic'
                                          cloudName="delktfw1a" 
                                          publicId={profileImg}
                                          />
                                          <p className='dash-user'>Profile</p>
                                   </Link>
                            </div>
                     </div>
              </div>
              <div className='dash-posts-container'>
                            <textarea placeholder="Post what's on your mind!" className='post-input' onChange={(e)=>{
                                   setPost(e.target.value);
                            }}/>
                            <button className='post-btn' onClick={()=>{onPost()}}>Post</button>
              </div>
              <div className='post-list-container' id="post-body">
                     {postList}
              </div>
              
              </>
       )
}

export default Dashboard
