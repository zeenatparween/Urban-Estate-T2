import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar() {
    const [query, setQuery] = useState({
        type: "buy",
        city: "",
        minPrice: 0,
        maxPrice: 0,
    });

    const swichType = (type) => {
        setQuery((prev) => ({
            ...prev,
            type: type,
        }));
    };

    const handleChange = (e) => {
        setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="searchBar">
            <div className="type">
                {types.map((type) => (
                    <button key={type} onClick={() => swichType(type)} className={query.type === type ? "active" : ""}>
                        {type}
                    </button>
                ))}
            </div>
            <form>
                <input type="text" name="city" placeholder="City Location" onChange={handleChange} />
                <input
                    type="number"
                    name="minPrice"
                    min={0}
                    max={10000000}
                    placeholder="Min Price"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    min={0}
                    max={10000000}
                    placeholder="Max Price"
                    onChange={handleChange}
                />
                <Link
                    to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
                >
                    <button>
                        <img src="/search.png" alt="search icon" />
                    </button>
                </Link>
            </form>
        </div>
    );
}

export default SearchBar;
