const RatingComponent = ({ rating }) => {
  switch (rating) {
    case 5: {
      return (
        <div className="p-3">
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
        </div>
      );
    }
    case 4: {
      return (
        <div className="p-3">
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star" />
        </div>
      );
    }

    case 3: {
      return (
        <div className="p-3">
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
        </div>
      );
    }

    case 2: {
      return (
        <div className="p-3">
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
        </div>
      );
    }
    case 1: {
      return (
        <div className="p-3">
          <span className="fa fa-star checked" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
        </div>
      );
    }
    default: {
      return (
        <div className="p-3">
          <span className="fa fa-star" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
        </div>
      );
    }
  }
};

export default RatingComponent;
