import { useSearchParams } from "react-router-dom";
import "./filter.scss";
import { useState } from "react";

function Filter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState({
        type: searchParams.get("type") || "",
        property: searchParams.get("property") || "",
        city: searchParams.get("city") || "",
        minPrice: searchParams.get("minPrice") || 0,
        maxPrice: searchParams.get("maxPrice") || 1000000000,
        bedroom: searchParams.get("bedroom") || "",
    });

    const handleChange = (e) => {
        setQuery((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFilter = () => {
        setSearchParams(query);
    };

    return (
        <div className="filter">
            <h1>
                Search result for <b>{searchParams.get("city")}</b>
            </h1>
            <div className="top">
                <div className="item">
                    <label htmlFor="city">Location</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City Location"
                        onChange={handleChange}
                        defaultValue={query.city}
                    />
                </div>
            </div>
            <div className="bottom">
                <div className="item">
                    <label htmlFor="type">Type</label>
                    <select id="type" name="type" onChange={handleChange} defaultValue={query.type}>
                        <option value="">any</option>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="property">Property</label>
                    <select id="property" name="property" onChange={handleChange} defaultValue={query.property}>
                        <option value="">any</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                        <option value="land">Land</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="minPrice">Min Price</label>
                    <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        min={0}
                        placeholder="any"
                        onChange={handleChange}
                        defaultValue={query.minPrice}
                    />
                </div>
                <div className="item">
                    <label htmlFor="maxPrice">Max Price</label>
                    <input
                        type="text"
                        id="maxPrice"
                        name="maxPrice"
                        placeholder="any"
                        onChange={handleChange}
                        defaultValue={query.maxPrice}
                    />
                </div>
                <div className="item">
                    <label htmlFor="bedroom">Bedroom</label>
                    <input
                        type="number"
                        id="bedroom"
                        name="bedroom"
                        placeholder="any"
                        min={0}
                        onChange={handleChange}
                        defaultValue={query.bedroom}
                    />
                </div>
                <div className="item">
                    <label htmlFor=""></label>
                    <button onClick={handleFilter}>
                        <img src="/search.png" alt="search logo" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filter;
