import "./aboutPage.scss";

function AboutPage() {
    return (
        <section className="about-section">
            <div className="container">
                <div className="about-content">
                    <h2>About Urban Estate</h2>
                    <p>
                        Urban Estate is a trusted name in the real estate industry, offering a seamless experience to
                        help you find your dream home. Whether you're looking to buy or rent, we provide a curated
                        selection of properties that match your lifestyle and budget. With a legacy of 10+ years, we
                        pride ourselves on innovation, excellence, and dedication to client satisfaction.
                    </p>
                    <p>
                        Our commitment to innovation, integrity, and exceptional customer service sets us apart in the
                        industry. With over 10 years of experience, we’ve helped thousands of families and individuals
                        find their dream homes. At Urban Estate, we believe every client deserves personalized attention
                        and a tailored experience. Your satisfaction is our priority.
                    </p>
                    <p>
                        From luxurious apartments in the heart of the city to spacious family homes in serene
                        neighborhoods, our property listings cater to diverse preferences. Explore our offerings and let
                        Urban Estate turn your property dreams into reality. Join the growing number of happy clients
                        who’ve found their ideal space with us.
                    </p>
                    <div className="about-stats">
                        <div className="stat">
                            <span>10+</span>
                            <p>Years of Experience</p>
                        </div>
                        <div className="stat">
                            <span>34</span>
                            <p>Awards Gained</p>
                        </div>
                        <div className="stat">
                            <span>900+</span>
                            <p>Properties Ready</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutPage;
