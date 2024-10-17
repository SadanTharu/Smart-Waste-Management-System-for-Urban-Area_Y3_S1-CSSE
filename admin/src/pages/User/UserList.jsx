import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserList.css';

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/IssueForAdminrouter/user');
                setUsers(response.data);
            } catch (err) {
                setError('Error fetching users: ' + (err.response ? err.response.data.error : err.message));
            }
        };

        fetchUsers();
    }, []);

    // Function to handle view button click
    const handleView = (id) => {
        navigate(`/ViewUser/${id}`);
    };

    // Filter users based on the search term (searching by wasteBinId)
    const filteredUsers = users.filter((user) =>
        searchTerm === '' || (user.wasteBinId && user.wasteBinId.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="user-list-container">
            <br /><br />
            <h2>User List</h2>
            <br /><br />
            {error && <p className="error-text">{error}</p>}

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by Waste Bin ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
            <br />

            <div className="user-cards-container">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div className="user-card" key={user._id}>
                            <h3>{user.userName}</h3>
                            <p>Waste Bin ID: {user.wasteBinId || 'N/A'}</p>
                            <p>Resident ID: {user.residentId}</p>
                            <button onClick={() => handleView(user._id)} className="view-button">View</button>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default UserList;
