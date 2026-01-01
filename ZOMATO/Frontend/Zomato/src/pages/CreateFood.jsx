import React, { useState } from 'react'
import '../styles/createFood.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateFood() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [fileName, setFileName] = useState('')
  const [videoFile, setVideoFile] = useState(null)

  const navigate = useNavigate();

  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0]
    setVideoFile(f)
    setFileName(f ? f.name : '')
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('video', videoFile);

    const response = await axios.post("http://localhost:3000/api/fooditems", formData, {withCredentials: true})

    console.log(response.data);
    navigate('/');
  }

  return (
    <main className="create-food-page">
      <form className="create-food-form" onSubmit={onSubmit}>
        <h2 className="cf-title">Create Food Video</h2>

        <label className="cf-field">
          <span className="cf-label">Video file</span>
          <input
            type="file"
            accept="video/*"
            className="cf-input cf-file"
            onChange={onFileChange}
          />
          <div className="cf-file-name">{fileName || 'No file chosen'}</div>
        </label>

        <label className="cf-field">
          <span className="cf-label">Name</span>
          <input
            type="text"
            className="cf-input"
            placeholder="e.g. Masala Paneer"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="cf-field">
          <span className="cf-label">Video description</span>
          <textarea
            className="cf-input cf-textarea"
            placeholder="Short description about the video"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="cf-actions">
          <button type="submit" className="cf-btn cf-btn-primary">Create</button>
          <button type="button" className="cf-btn">Cancel</button>
        </div>
      </form>
    </main>
  )
}

export default CreateFood
