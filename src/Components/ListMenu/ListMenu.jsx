import { useState } from "react";
import styles from "./ListMenu.module.css";

const ListMenu = ({ options, handleSelectItem }) => {
  return (
    <ul>
      {options.length === 0 ? (
        <p>No Results found</p>
      ) : (
        options.map((option) => (
            <li
              onClick={(e) => {
                handleSelectItem(option);
              }}
              className={option.isSelected ? styles.selected : ""}
              key={option.name}
            >
              {option.symbol} - {option.name} 
            </li>
        ))
      )}
    </ul>
  );
};

export default ListMenu;
