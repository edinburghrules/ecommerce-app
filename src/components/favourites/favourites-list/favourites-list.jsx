import React from "react";
import "./favourites-list.scss";
import FavouriteCard from "../favourite-card/favourite-card";

class FavouritesList extends React.Component {
  render() {
    const { favourites, handleDelete } = this.props;
    return (
      <div className="favourites-list">
        {favourites &&
          favourites.map((favourite, index) => (
            <FavouriteCard
              handleDelete={handleDelete}
              key={index}
              favourite={favourite}
            />
          ))}
      </div>
    );
  }
}

export default FavouritesList;
