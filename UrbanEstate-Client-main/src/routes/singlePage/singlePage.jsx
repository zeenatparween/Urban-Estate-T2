import Slider from "../../components/slider/slider";
import "./singlePage.scss";
import { useLoaderData } from "react-router-dom";
import MapMapTiler from "../../components/map/mapMapTiler.jsx";
import { useEffect, useState } from "react";
import api from "../../utils/api.js";

function SinglePage() {
    const postData = useLoaderData();
    const data = postData.data;

    const [postSaved, setPostSaved] = useState(false);

    useEffect(() => {
        if (data?.savedPost) {
            setPostSaved(true);
        }
    }, [data]);

    const handleSave = async () => {
        try {
            if (data?.post?._id) {
                const savePost = await api.post("/users/savepost", {
                    postId: data.post._id,
                });

                if (savePost.data?.data?.createdAt) {
                    setPostSaved(true);
                } else {
                    setPostSaved(false);
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="singlePage">
            <div className="details">
                <div className="wrapper">
                    <Slider images={data.post.images} />
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{data.post.title}</h1>
                                <div className="address">
                                    <img src="/pin.png" alt="" />
                                    <span>{data.post.address}</span>
                                </div>
                                <div className="price">$ {data.post.price}</div>
                            </div>
                            <div className="user">
                                <img src={import.meta.env.VITE_AVATAR_URL + data.post.author?.avatar} alt="" />
                                <span>{data.post.author?.username}</span>
                            </div>
                        </div>
                        <div className="bottom">{data.postDetails.description}</div>
                    </div>
                </div>
            </div>
            <div className="features">
                <div className="wrapper">
                    <p className="title">General</p>
                    <div className="listVertical">
                        <div className="feature">
                            <img src="/utility.png" alt="" />
                            <div className="featureText">
                                <span>Utlities</span>
                                <p>
                                    {data.postDetails.utilities === "owner"
                                        ? "Owner is responsible"
                                        : data.postDetails.utilities === "tenant"
                                        ? "Tenet is responsible"
                                        : "Shared"}
                                </p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/pet.png" alt="" />
                            <div className="featureText">
                                <span>Pet Policy</span>
                                <p>{data.postDetails.pet === "allowed" ? "Pets Allowed" : "Pets Not-Allowed"}</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/fee.png" alt="" />
                            <div className="featureText">
                                <span>Property Fees</span>
                                <p>{data.postDetails.income}</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Sizes</p>
                    <div className="sizes">
                        <div className="size">
                            <img src="/size.png" alt="" />
                            <span>{data.postDetails.size} sqft</span>
                        </div>
                        <div className="size">
                            <img src="/bed.png" alt="" />
                            <span>{data.post.bedroom} bed</span>
                        </div>
                        <div className="size">
                            <img src="/bath.png" alt="" />
                            <span>{data.post.bathroom} bathroom</span>
                        </div>
                    </div>
                    <p className="title">Nearby Places</p>
                    <div className="listHorizontal">
                        <div className="feature">
                            <img src="/school.png" alt="" />
                            <div className="featureText">
                                <span>School</span>
                                <p>{data.postDetails.school}km away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/utility.png" alt="" />
                            <div className="featureText">
                                <span>Bus Stop</span>
                                <p>{data.postDetails.bus}km away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/utility.png" alt="" />
                            <div className="featureText">
                                <span>Restaurant</span>
                                <p>{data.postDetails.restaurant}km away</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Location</p>
                    <div className="mapContainer">
                        <MapMapTiler data={[data.post]} focusLatLng={data.post?.location?.coordinates || []} />
                    </div>
                    <div className="buttons">
                        <button>
                            <img src="/chat.png" alt="" />
                            Send a Message
                        </button>
                        <button onClick={handleSave} style={{ backgroundColor: postSaved ? "#fece51" : "#fff" }}>
                            <img src="/save.png" alt="" />
                            {postSaved ? "Place saved" : "Save a Place"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SinglePage;
