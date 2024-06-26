import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const UserDashboard = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    bio: "",
    emailVerified: false,
    profilePicture: "",
  });
  //TODO: fetch user data from server with axios / api route
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/api/auth/user`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  //TODO: 업로드하면 바로 랜더링해주기
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", user.username);
    console.log("Email:", user.email);
    console.log("Email Verified:", user.emailVerified);
    console.log("Bio:", user.bio);
    // TODO: 서버에 데이터 전송
  };

  const handleLogout = () => {
    // TODO: api route
    axios
      .get("/api/auth/logout", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/";
        }
      })
      .catch((error) => console.error("Error logging out:", error));
  };

  return (
    <div className="container">
      <div className="dashboard-container d-flex flex-column align-items-center">
        <div className="row w-100">
          <div className="col-md-4 d-flex flex-column align-items-center">
            <div className="profile-pic-wrapper">
              <label htmlFor="profilePicInput" className="profile-pic-label">
                <img src={user.profilePicture || "profile.jpg"} alt="Profile" className="profile-pic" />
              </label>
              <input type="file" id="profilePicInput" className="d-none" onChange={handleProfilePicChange} />
            </div>
            <h3>{user.username}</h3>
            <p>{user.bio || "This is a short bio about the user."}</p>
          </div>
          <div className="col-md-8">
            <form id="userForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={user.username}
                  onChange={(e) =>
                    setUser((prevUser) => ({
                      ...prevUser,
                      username: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control" value={user.email} disabled />
              </div>
              <div className="form-group">
                <label htmlFor="bio-input">Bio</label>
                <textarea
                  id="bio-input"
                  className="form-control"
                  rows="3"
                  value={user.bio}
                  onChange={(e) =>
                    setUser((prevUser) => ({
                      ...prevUser,
                      bio: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <div className="form-group">
                <p>
                  Email Verified: <span>{user.emailVerified ? "Yes" : "No"}</span>
                </p>
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-3">
                Edit
              </button>
            </form>
            <button id="logoutButton" className="btn btn-danger btn-block mt-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
