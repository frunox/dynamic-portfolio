// import React, { useContext } from "react";
import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./searchBar.css";
// import DevDataContext from "../utils/DevDataContext";

export default function searchBar({ resetSearch, handleInputChange }) {
  // const { devData, setDevData } = useContext(DevDataContext);
  // console.log(props);
  return (
    <div className="searchBar">
      <InputGroup>
        <FormControl
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          onChange={(e) => handleInputChange(e)}
        />
        <InputGroup.Append>
          <Button
            onClick={(e) => {
              resetSearch(e);
            }}
            variant="dark"
          >
            Clear
        </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
