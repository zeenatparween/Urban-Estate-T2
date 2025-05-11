import { Await, useLoaderData } from "react-router-dom";
import Card from "../../components/card/card.jsx";
import Filter from "../../components/filter/filter.jsx";
import MapMapTiler from "../../components/map/mapMapTiler.jsx";
import "./listPage.scss";
import { Suspense } from "react";

function ListPage() {
    const data = useLoaderData();

    return (
        <div className="listPage">
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    <Suspense fallback={<p>Loading posts....</p>}>
                        <Await resolve={data.packagePost} errorElement={<p>Error loading posts!</p>}>
                            {(packagePost) => packagePost.data?.data.map((item) => <Card key={item._id} item={item} />)}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="mapContainer">
                <Suspense fallback={<p>Loading locations....</p>}>
                    <Await resolve={data.packagePost} errorElement={<p>Error loading locations!</p>}>
                        {(packagePost) => <MapMapTiler data={packagePost.data?.data || []} focusLatLng={[]} />}
                    </Await>
                </Suspense>
            </div>
        </div>
    );
}

export default ListPage;
