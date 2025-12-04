import React from "react";

export default function SearchBar({ search, setSearch }) {
    return (
        <input
            type="text"
            className="form-control search-box mb-3 shadow-sm"
            placeholder="Search by ID or Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}
