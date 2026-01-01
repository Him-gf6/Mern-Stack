import React,{ useEffect, useState } from 'react';
import '../styles/home.css';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

function Home() {
  const [videos, setVideos] = useState([]);
  const [interactions, setInteractions] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3000/api/fooditems', { withCredentials: true })
      .then((response) => {
        const items = response.data.fooditems;
        setVideos(items);
        // initialize interactions map
        const map = {};
        items.forEach((v) => {
          map[v._id] = {
            liked: false,
            likes: (v.likeCount ?? 0),
            comments: (v.comments ?? 0),
            saved: false,
            saves: (v.saveCount ?? 0),
          };
        });
        setInteractions(map);

        // also fetch saved items to mark saved state for current user
        axios.get('https://mern-stack-backend-zoum.onrender.com/api/fooditems/saved', { withCredentials: true })
          .then((r) => {
            const saved = r.data.saved || [];
            setInteractions(prev => {
              const next = { ...prev };
              saved.forEach(s => {
                if (s && s._id && next[s._id]) {
                  next[s._id] = { ...next[s._id], saved: true };
                }
              });
              return next;
            });
          })
          .catch(() => {});
      }
    ).catch(() => {});
  },[]);

  const toggleLike = (id) => {
    setInteractions(prev => {
      const cur = prev[id] || { liked: false, likes: 0 };
      const liked = !cur.liked;
      const likes = liked ? (cur.likes + 1) : (cur.likes - 1);
      return { ...prev, [id]: { ...cur, liked, likes } };
    });
  };

  const addComment = (id) => {
    const text = prompt('Add a comment');
    if (!text) return;
    setInteractions(prev => {
      const cur = prev[id] || { comments: 0 };
      return { ...prev, [id]: { ...cur, comments: cur.comments + 1 } };
    });
  };

  const toggleSave = (id) => {
    // prevent double requests
    setInteractions(prev => {
      const cur = prev[id] || { saved: false, saves: 0, saving: false };
      if (cur.saving) return prev;
      // optimistic update
      const willSave = !cur.saved;
      const saves = willSave ? cur.saves + 1 : Math.max(cur.saves - 1, 0);
      return { ...prev, [id]: { ...cur, saved: willSave, saves, saving: true } };
    });

    axios.post('https://mern-stack-backend-zoum.onrender.com/api/fooditems/save', { foodId: id }, { withCredentials: true })
      .then((res) => {
        const savedNow = res.status === 201;
        setInteractions(prev => {
          const cur = prev[id] || { saved: false, saves: 0 };
          const saves = savedNow ? cur.saves : Math.max(cur.saves - 1, 0);
          return { ...prev, [id]: { ...cur, saved: savedNow, saves, saving: false } };
        });
      })
      .catch((err) => {
        // revert optimistic update on error
        console.error('Error toggling save', err);
        const message = err?.response?.data?.message || err.message || 'Save failed';
        alert(`Save failed: ${message}`);
        setInteractions(prev => {
          const cur = prev[id] || { saved: false, saves: 0 };
          // revert: flip saved back and adjust saves count
          const revertedSaved = !cur.saved;
          const revertedSaves = revertedSaved ? cur.saves + 1 : Math.max(cur.saves - 1, 0);
          return { ...prev, [id]: { ...cur, saved: revertedSaved, saves: revertedSaves, saving: false } };
        });
      });
  };

  return (
    <div className="home-container">
      <div className="reels-container">
        {videos.map((video) => (
          <div key={video._id} className="reel-item">
            <video
              className="reel-video"
              src={video.video}
              loop
              muted
              autoPlay
              playsInline
              preload='metadata'
            />
            <div className="reel-overlay">
              <div className="reel-content">
                <p className="reel-description">{video.name}</p>
                <p className="reel-description">{video.description}</p>

                <div className="reel-actions">
                  <div className="reel-action">
                    <button
                      type="button"
                      aria-label="Like"
                      className={`reel-action-btn ${interactions[video._id]?.liked ? 'active' : ''}`}
                      onClick={() => toggleLike(video._id)}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.2" fill="currentColor"/>
                      </svg>
                    </button>
                    <span className="reel-action-count">{interactions[video._id]?.likes ?? 0}</span>
                  </div>

                  <div className="reel-action">
                    <button
                      type="button"
                      aria-label="Comment"
                      className="reel-action-btn"
                      onClick={() => addComment(video._id)}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="1.2" fill="currentColor"/>
                      </svg>
                    </button>
                    <span className="reel-action-count">{interactions[video._id]?.comments ?? 23}</span>
                  </div>

                  <div className="reel-action">
                    <button
                      type="button"
                      aria-label="Save"
                      className={`reel-action-btn ${interactions[video._id]?.saved ? 'saved' : ''}`}
                      onClick={() => toggleSave(video._id)}
                    >
                      <svg width="18" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.2" fill="currentColor"/>
                      </svg>
                    </button>
                    <span className="reel-action-count">{interactions[video._id]?.saves ?? 1}</span>
                  </div>
                </div>

                <Link to={`/foodpartner/${video.foodpartner}`} className="reel-button">Visit Store</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;