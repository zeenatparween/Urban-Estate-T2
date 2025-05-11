import "./homePage.scss";
import SearchBar from "../../components/searchBar/SearchBar";

function HomePage() {
    return (
        <div className="homePage">
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className="title">Find Real Estate & Get Your Dream Place </h1>

                    <p className="description">
                        Discover your dream home with Urban Estate. Whether you're buying or renting, we offer a premium
                        selection of properties tailored to your lifestyle. With years of experience, we're dedicated to
                        making your real estate journey seamless and stress-free.
                    </p>

                    <SearchBar />

                    <div className="boxes">
                        <div className="box">
                            <h1>10+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>34</h1>
                            <h2>Award Gained</h2>
                        </div>
                        <div className="box">
                            <h1>900+</h1>
                            <h2>Property Ready</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="hero-image" />
            </div>
        </div>
    );
}

export default HomePage;
