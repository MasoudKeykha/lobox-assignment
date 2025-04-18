"use client";

import React, { useState } from "react";

import "./globals.css";

import {
  CheckOutlined,
  CloseOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";

const Home = () => {
  const [open, setOpen] = useState(false);

  const [newItem, setNewItem] = useState<string>("");

  const [items, setItems] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleAddNewItem = () => {
    if (newItem.trim() === "") return;

    if (!items.includes(newItem)) {
      setItems((prev) => [...prev, newItem]);
    }

    if (!selectedItems.includes(newItem)) {
      setSelectedItems((prev) => [...prev, newItem]);
    }

    setNewItem("");
  };

  const handleClickDropDownListItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems((prev) =>
        prev.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  return (
    <>
      {open && items.length > 0 && (
        <div onClick={() => setOpen(false)} className="clickAwayListener"></div>
      )}
      <section className="dropDownPage">
        <div className="dropDownContainer">
          <div className="dropDownBox">
            <div
              className="dropDownField"
              onClick={() => setOpen(!open)}
              style={{
                border: open ? "1px solid #007bff" : "1px solid #ccc",
                boxShadow: open ? "0 0 5px rgba(0, 123, 255, 0.5)" : "none",
              }}
            >
              <div className="dropDownFieldContent">
                <ul className="selectedItemsList">
                  {selectedItems.map((selectedItem, index) => (
                    <li key={index} className="selectedItem">
                      <span>{selectedItem}</span>
                      <button
                        className="removeItemBtn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItems((prev) =>
                            prev.filter((item) => item !== selectedItem)
                          );
                        }}
                      >
                        <CloseOutlined />
                      </button>
                    </li>
                  ))}
                </ul>
                <input
                  type="text"
                  placeholder="Add item..."
                  className="newItemField"
                  value={newItem}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                  }}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddNewItem();
                    }
                  }}
                />
              </div>
              {open ? (
                <KeyboardArrowUpOutlined className="arrow" />
              ) : (
                <KeyboardArrowDownOutlined className="arrow" />
              )}
            </div>
            {open && items.length > 0 && (
              <ul className="dropDownList">
                {items.filter(item => item.includes(newItem)).map((item, index) => (
                  <li
                    key={index}
                    className="dropDownListItem"
                    onClick={() => handleClickDropDownListItem(item)}
                  >
                    <span>{item}</span>
                    {selectedItems.includes(item) && (
                      <CheckOutlined className="check" />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
