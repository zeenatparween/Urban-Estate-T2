import "./list.scss";
import Card from "../card/card.jsx";

function List({ listData }) {
    return (
        <div className="list">
            {listData.map((item) => (
                <Card key={item._id} item={item} />
            ))}
        </div>
    );
}

export default List;
