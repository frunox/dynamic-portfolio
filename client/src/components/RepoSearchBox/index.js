import React from "react";
import { Input, Button } from "semantic-ui-react";
import "./repoSearchBox.css";

const RepoSearchBox = ({ handleSearchChange, resetRepoSearch }) => {

  let content = (
    <div className="search">
      <form>
        <Input
          as="span"
          focus
          placeholder="Search..."
          className="searchBox"
          onChange={(e) => handleSearchChange(e)}
        />
        <Button
          type='reset'
          onClick={(e) => resetRepoSearch(e)}
        >
          Clear
        </Button>
      </form>
    </div>
  )
  return content
};

export default RepoSearchBox;
