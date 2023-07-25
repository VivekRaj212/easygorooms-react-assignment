import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Card/Card.css";
import globe from "../../assets/globe.png";
import mail from "../../assets/mail.png";
import phone from "../../assets/phone-call.png";
import { imgData } from "../../imgApi.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import Form from "../PopupForm/Form";

const Card = () => {
  const [data, setData] = useState([]);
  const [liked, setLiked] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setData(response.data);
        setLiked(Array(response.data.length).fill(false));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLikeClick = (index) => {
    setLiked((prevLikedItems) => {
      const newLikedItems = [...prevLikedItems];
      newLikedItems[index] = !newLikedItems[index];
      return newLikedItems;
    });
  };

  const onDeleteClick = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1); // Remove the item at the specified index
      return newData;
    });
  };

  const handleEditClick = (index) => {
    setSelectedData(data[index]);
    setShowForm(true);
  };

  const handleUpdate = (updatedData) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[selectedData.id - 1] = updatedData;
      return newData;
    });
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedData(null);
  };

  return (
    <div className="Cards">
      {data.map((item, index) => (
        <div className="card" style={{ width: "max-content" }} key={index}>
          <img
            src={imgData[index]}
            className="card-img-top"
            alt={item.username}
          />
          <hr />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <div>
              <ul>
                <li>
                  <img src={mail} /> &nbsp;{item.email}
                </li>
                <li>
                  <img src={phone} /> &nbsp;{item.phone}
                </li>
                <li>
                  <img src={globe} /> &nbsp;{item.website}
                </li>
              </ul>
            </div>
          </div>
          <div className="card-footer">
            <FontAwesomeIcon
              icon={liked[index] ? solidHeart : faHeart}
              className={`foot-img ${
                liked[index] ? "color-red" : "outline-red"
              }`}
              onClick={() => handleLikeClick(index)}
            />
            <div className="vertical-line"></div>
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="foot-img color-blue"
              onClick={() => handleEditClick(index)}
            />
            <div className="vertical-line"></div>
            <FontAwesomeIcon
              icon={faTrashCan}
              className="foot-img color-blue"
              onClick={() => onDeleteClick(index)}
            />
          </div>
        </div>
      ))}
      {showForm && selectedData && (
        <div className="form-popup">
        <Form data={selectedData} onUpdate={handleUpdate} onClose={handleCloseForm} />
        </div>
      )}
    </div>
  );
};

export default Card;
