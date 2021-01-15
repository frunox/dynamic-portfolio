import React from "react";
import "./style.css";

function SearchBox({ handleSearchChange }) {
    return (
        <div className="searchbox">
            <form className="form-inline">
                <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={e => handleSearchChange(e)}
                />
                <button
                    type="reset"
                    onClick={(e) => {
                        resetSearch(e);
                    }}
                    variant="dark"
                >
                    Clear
        </button>
            </form>
        </div>
    );
}
export default SearchBox;
