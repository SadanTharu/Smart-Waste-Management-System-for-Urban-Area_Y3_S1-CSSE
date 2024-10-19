// Vault.js
import React from "react";

const Vault = ({ vaultName, userName, vaultBalance }) => {
  return (
    <div className="vault-page">
      <h1>{vaultName}</h1>
      <h2>User: {userName}</h2>
      <p>Balance: ${vaultBalance}</p>
      {/* Additional vault details can be added here */}
    </div>
  );
};

export default Vault;
