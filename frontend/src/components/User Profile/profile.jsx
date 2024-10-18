import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './profile.css'
import { assets } from "../../assets/assets"

const UserProfile = () => {
  const { userId, token } = useContext(StoreContext); // access the userId and token from context
  const [userDetails, setUserDetails] = useState({});
  const [editMode, setEditMode] = useState({ name: false, email: false, phone: false, address: false, password: false });
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    console.log("Current userId:", userId); // Log the current userId
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
        console.log("Fetched user details:", response.data); // Log the fetched user details
        setUserDetails(response.data.user);
        setNewName(response.data.user.name);
        setNewEmail(response.data.user.email);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
  
    fetchUserDetails();
  }, [userId, token]);  

  const handleEdit = (field) => {
    console.log(`Editing field: ${field}`);
    setEditMode({ ...editMode, [field]: true });
  };

  const handleSave = async (field) => {
    console.log(`Saving field: ${field}`);
    try {
      if (field === "name") {
        await axios.post('http://localhost:4000/api/user/updateUsername', { userId, newUsername: newName }, {
          headers: {
            Authorization: token,
          },
        });
        console.log("Username updated successfully");
      } else if (field === "email") {
        await axios.post('http://localhost:4000/api/user/updateEmail', { userId, newEmail }, {
          headers: {
            Authorization: token,
          },
        });
        console.log("Email updated successfully");
      } else if (field === "phone") {
        await axios.post('http://localhost:4000/api/user/updatePhone', { userId, newPhone }, {
          headers: {
            Authorization: token,
          },
        });
        console.log("Phone updated successfully");
      } else if (field === "address") {
        await axios.post('http://localhost:4000/api/user/updateAddress', { userId, newAddress }, {
          headers: {
            Authorization: token,
          },
        });
        console.log("Address updated successfully");
      } else if (field === "password") {
        if (newPassword !== confirmPassword) {
          alert("New password and confirm password do not match");
          return;
        }

        await axios.post('http://localhost:4000/api/user/updatePassword', { userId, oldPassword, newPassword }, {
          headers: {
            Authorization: token,
          },
        });
        console.log("Password updated successfully");
      }

      // Re-fetch user details
      console.log("Re-fetching user details after update...");
      const response = await axios.get('http://localhost:4000/api/user/getuser', {
        headers: {
          Authorization: token,
        },
      });
      setUserDetails(response.data.user);
      console.log("User details after update:", response.data.user);

      // Exit edit mode
      setEditMode({ ...editMode, [field]: false });
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
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
                  <td className='tdtitle'>User ID:</td>
                  <td className='tddata'>{userId}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Username:</td>
                  <td>
                    {editMode.name ? (
                      <>
                        <input className="input-cus" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                        <button className='action-but' onClick={() => handleSave("name")}>Save</button>
                      </>
                    ) : (
                      <>
                        {userDetails?.name || "Loading..."}
                      </>
                    )}
                  </td>
                  <td>
                    {editMode.name ? null : (
                      <img src={assets.edtqbtn} alt="" width={40} onClick={() => handleEdit("name")} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>
                    {editMode.email ? (
                      <>
                        <input className="input-cus" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                        <button className='action-but' onClick={() => handleSave("email")}>Save</button>
                      </>
                    ) : (
                      <>
                        {userDetails?.email || "Loading..."}
                      </>
                    )}
                  </td>
                  <td>
                    {editMode.email ? null : (
                      <img src={assets.edtqbtn} alt="" width={40} onClick={() => handleEdit("email")} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>
                    {editMode.phone ? (
                      <>
                        <input className="input-cus" type="text" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
                        <button className='action-but' onClick={() => handleSave("phone")}>Save</button>
                      </>
                    ) : (
                      <>
                        {userDetails?.phone || "Loading..."}
                      </>
                    )}
                  </td>
                  <td>
                    {editMode.phone ? null : (
                      <img src={assets.edtqbtn} alt="" width={40} onClick={() => handleEdit("phone")} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>
                    {editMode.address ? (
                      <>
                        <input className="input-cus" type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
                        <button className='action-but' onClick={() => handleSave("address")}>Save</button>
                      </>
                    ) : (
                      <>
                        {userDetails?.address || "Loading..."}
                      </>
                    )}
                  </td>
                  <td>
                    {editMode.address ? null : (
                      <img src={assets.edtqbtn} alt="" width={40} onClick={() => handleEdit("address")} />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            {editMode.password ? (
              <>
                <div className="passwordLayout">
                  <input className='input-cus-pass' type="password" placeholder="Old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} /> <br />
                  <input className='input-cus-pass' type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /><br />
                  <input className='input-cus-pass' type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br />
                  <div className="but-arr">
                    <button className='action-but-pass' onClick={() => handleSave("password")}>Save</button>
                    <button className='action-but-pass' onClick={() => setEditMode({ ...editMode, password: false })}>Cancel</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button className='rst-btn' onClick={() => handleEdit("password")}>Reset Password</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
