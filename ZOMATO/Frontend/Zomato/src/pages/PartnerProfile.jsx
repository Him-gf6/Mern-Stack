import React, { useEffect,useState } from 'react'
import '../styles/foodPartnerProfile.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'


function PartnerProfile() {
  const { id } = useParams()
   const [ profile, setProfile ] = useState(null)
   const [videos, setVideos] = useState([])

  useEffect(()=>{
    axios.get(`http://localhost:3000/api/foodpartner/${id}`,{withCredentials:true})
    .then((response)=>{
      setProfile(response.data.foodPartner);
      setVideos(response.data.foodPartner.foodItems);
    })
    .catch((error)=>{
      console.error("Error fetching profile data:",error);
    })
  },[id])

  return (
    <main className="profile-page">
      <section className="profile-header">
        <div className="profile-meta">
          <img className="profile-avatar" src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" alt="avatar" />

          <div className="profile-info">
            <h1 className="profile-pill profile-business" title="Business name">{profile?.businessName}</h1>
            <p className="profile-pill profile-address" title="Address">{profile?.address}</p>
          </div>
        </div>

        <div className="profile-stats" role="list" aria-label="Stats">
          <div className="profile-stat" role="listitem">
            <span className="profile-stat-label">Total Meals</span>
            <span className="profile-stat-value">{profile?.totalMeals}</span>
          </div>
          <div className="profile-stat" role="listitem">
            <span className="profile-stat-label">Customer Serve</span>
            <span className="profile-stat-value">{profile?.customerServe}</span>
          </div>
        </div>
      </section>

      <hr className="profile-sep" />

      <section className="profile-grid" aria-label="Items">
        {videos.map((it) => (
          <div key={it.id} className="profile-grid-item">
            <video
              className="profile-grid-video"
              src={it.video}
              muted
              loop
              playsInline
              controls={false}
            />
            <div className="card-arrow">❯</div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default PartnerProfile