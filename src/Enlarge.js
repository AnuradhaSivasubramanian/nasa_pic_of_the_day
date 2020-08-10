import React from "react";
import Close from "./images/closeicon.svg";
import "./Enlarge.scss";

export default function Enlarge({ picture, handleClose }) {
  return (
    <div>
      {picture ? (
        <div className="enlarge--wrapper">
          <div className="enlarge--background">
            <div className="close--button">
              <img
                className="enlarge--close_icon"
                src={Close}
                alt="close Icon"
                onClick={() => {
                  handleClose();
                }}
              ></img>
            </div>
            <div className="enlarge--content">
              <img
                className="enlarge--image"
                src={picture.url}
                alt="NasaPic"
              ></img>
              <p>{picture.title}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
