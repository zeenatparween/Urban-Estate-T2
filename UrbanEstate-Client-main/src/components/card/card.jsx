import "./card.scss";
import { Link } from "react-router-dom";

function Card({ item }) {
    return (
        <div className="card">
            <Link to={`/posts/${item._id}`} className="imageContainer">
                <img src={import.meta.env.VITE_POST_IMAGES_URL + item.images[0]} alt="post-image" />
            </Link>
            <div className="textContainer">
                <h2 className="title">
                    <Link to={`/posts/${item._id}`}>{item.title}</Link>
                </h2>
                <p className="address">
                    <img src="/pin.png" alt="location icon" />
                    <span>{item.address}</span>
                </p>
                <p className="price">$ {item.price}</p>
                <div className="bottom">
                    <div className="features">
                        <div className="feature">
                            <img src="/bed.png" alt="" />
                            <span>{item.bedroom} bedroom</span>
                        </div>
                        <div className="feature">
                            <img src="/bath.png" alt="" />
                            <span>{item.bathroom} bathroom</span>
                        </div>
                    </div>

                    <div className="icons">
                        {/* <div className="icon">
                            <img src="/save.png" alt="save icon" />
                        </div> */}
                        <div className="icon">
                            <img src="/chat.png" alt="chat icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
