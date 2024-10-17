// import React, { useContext } from "react";
// import "./DeseaseDisplay.css";
// import { StoreContext } from "../../context/StoreContext";
// import DiseaseItem from "../DiseaseItem/DiseaseItem";

// const DiseaseDisplay = ({ category }) => {
//   const { disease_list } = useContext(StoreContext);

//   return (
//     <div className="food-display" id="diseases-display">
//       <h1>Currently available information...</h1>
//       <p>“contact us +94740956299”</p>
//       <div className="food-display-list">
//         {disease_list.map((item) => {
//           if (category === "All" || category === item.category) {
//             return (
//               <DiseaseItem
//                 key={item._id}
//                 id={item._id}
//                 diseaseName={item.diseaseName}
//                 symptoms={item.symptoms}
//                 severityLevel={item.severityLevel}
//                 image={item.image}
//               />
//             );
//           }
//           return null;
//         })}
//       </div>
//     </div>
//   );
// };

// export default DiseaseDisplay;
