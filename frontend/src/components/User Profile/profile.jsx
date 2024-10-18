import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './profile.css';
import { assets } from "../../assets/assets";

const UserProfile = () => {
  const { userId, token } = useContext(StoreContext);
  const [userDetails, setUserDetails] = useState({});
  const [editDetailsMode, setEditDetailsMode] = useState(false);
  const [editPasswordMode, setEditPasswordMode] = useState(false);
  const [addBinMode, setAddBinMode] = useState(false);
  const [newDetails, setNewDetails] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    garbageBinData: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) {
        console.log("No User ID available!");
        return;
      }
      try {
        const response = await axios.get('http://localhost:4000/api/user/getuser', {
          headers: {
            Authorization: token,
          },
        });
        setUserDetails(response.data.user);
        setNewDetails({
          name: response.data.user.name,
          address: response.data.user.address,
          phone: response.data.user.phone,
          email: response.data.user.email,
          garbageBinData: JSON.stringify(response.data.user.GarbageBinData) || "", // ensuring it's a string
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserDetails();
  }, [userId, token]);

  const handleEditDetails = async () => {
    try {
      await axios.post('http://localhost:4000/api/user/updateUserDetails', {
        userId,
        name: newDetails.name,
        address: newDetails.address,
        phone: newDetails.phone,
        email: newDetails.email,
      }, {
        headers: {
          Authorization: token,
        },
      });
      
      // Re-fetch user details after update
      const response = await axios.get('http://localhost:4000/api/user/getuser', {
        headers: {
          Authorization: token,
        },
      });
      setUserDetails(response.data.user);
      setEditDetailsMode(false); // Exit edit details mode
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handlePasswordChange = async () => {
    if (newDetails.newPassword !== newDetails.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      await axios.post('http://localhost:4000/api/user/updatePassword', {
        userId,
        oldPassword: newDetails.oldPassword,
        newPassword: newDetails.newPassword,
      }, {
        headers: {
          Authorization: token,
        },
      });
      alert("Password updated successfully!");
      setNewDetails({ ...newDetails, oldPassword: "", newPassword: "", confirmPassword: "" }); // Reset password fields
      setEditPasswordMode(false); // Exit edit password mode
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleAddBinData = async () => {
    try {
      const binData = JSON.parse(newDetails.garbageBinData); // Parse if it's JSON string
      await axios.post('http://localhost:4000/api/user/addBinData', {
        userId,
        binData,
      }, {
        headers: {
          Authorization: token,
        },
      });
      alert("Garbage bin data added successfully!");
      setNewDetails({ ...newDetails, garbageBinData: "" }); // Clear the input
      setAddBinMode(false); // Exit add bin mode
      // Optionally, you can re-fetch user details here to update the view
    } catch (error) {
      console.error("Error adding garbage bin data:", error);
    }
  };

  return (
    <div className="container-cusprofile">
      <div className='cusprofile'>
        <div className="cusdetails">
          <h1>User Profile</h1>
          <div className="cusprofileimage">
            <img src={assets.profile} alt="" width={250} />
          </div>
          <div className="abc">
            <table className='custable'>
              <tbody>
                <tr>
                  <td className='tdtitle'>Username:</td>
                  <td>
                    {editDetailsMode ? (
                      <input className="input-cus" type="text" value={newDetails.name} onChange={(e) => setNewDetails({ ...newDetails, name: e.target.value })} />
                    ) : (
                      <span>{userDetails.name}</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>
                    {editDetailsMode ? (
                      <input className="input-cus" type="email" value={newDetails.email} onChange={(e) => setNewDetails({ ...newDetails, email: e.target.value })} />
                    ) : (
                      <span>{userDetails.email}</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>
                    {editDetailsMode ? (
                      <input className="input-cus" type="text" value={newDetails.address} onChange={(e) => setNewDetails({ ...newDetails, address: e.target.value })} />
                    ) : (
                      <span>{userDetails.address}</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>
                    {editDetailsMode ? (
                      <input className="input-cus" type="text" value={newDetails.phone} onChange={(e) => setNewDetails({ ...newDetails, phone: e.target.value })} />
                    ) : (
                      <span>{userDetails.phone}</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Garbage Bin Data:</td>
                  <td>
                    <span>{userDetails.GarbageBinData ? JSON.stringify(userDetails.GarbageBinData) : 'No data'}</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="button-container">
              {editDetailsMode ? (
                <>
                  <button className='action-but' onClick={handleEditDetails}>Save Details</button>
                  <button className='action-but' onClick={() => setEditDetailsMode(false)}>Cancel</button>
                </>
              ) : (
                <>
                  <button className='action-but' onClick={() => setEditDetailsMode(true)}>Edit Details</button>
                  <button className='action-but' onClick={() => setEditPasswordMode(true)}>Edit Password</button>
                  <button className='action-but' onClick={() => setAddBinMode(true)}>Add Bin</button>
                </>
              )}
            </div>
            {editPasswordMode && (
              <div>
                <h3>Change Password:</h3>
                <input type="password" placeholder="Old password" value={newDetails.oldPassword} onChange={(e) => setNewDetails({ ...newDetails, oldPassword: e.target.value })} />
                <input type="password" placeholder="New password" value={newDetails.newPassword} onChange={(e) => setNewDetails({ ...newDetails, newPassword: e.target.value })} />
                <input type="password" placeholder="Confirm password" value={newDetails.confirmPassword} onChange={(e) => setNewDetails({ ...newDetails, confirmPassword: e.target.value })} />
                <button className='action-but' onClick={handlePasswordChange}>Save Password</button>
                <button className='action-but' onClick={() => setEditPasswordMode(false)}>Cancel</button>
              </div>
            )}
            {addBinMode && (
              <div>
                <h3>Add Garbage Bin Data:</h3>
                <input type="text" placeholder="Bin Data (JSON format)" value={newDetails.garbageBinData} onChange={(e) => setNewDetails({ ...newDetails, garbageBinData: e.target.value })} />
                <button className='action-but' onClick={handleAddBinData}>Add Bin</button>
                <button className='action-but' onClick={() => setAddBinMode(false)}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
