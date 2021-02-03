const RatingComponent = ({ rating }) => {
  switch (rating) {
    case 5: {
      return (
        <>
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
        </>
      );
    }
    case 4: {
      return (
        <>
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star" />
        </>
      );
    }

    case 3: {
      return (
        <>
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
        </>
      );
    }

    case 2: {
      return (
        <>
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
        </>
      );
    }
    case 1: {
      return (
        <>
          <span className="fa fa-star checked" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
        </>
      );
    }
    default: {
      return (
        <>
          <span className="fa fa-star" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
        </>
      );
    }
  }
};

export default RatingComponent;
