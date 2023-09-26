import { useLocation } from "react-router-dom";

function PriceCalculator() {
  const location = useLocation();
  const pik = location.state.pickupLocation;

  return (
    <div>
      <h2>Estimated Price {pik}</h2>
      <p>Total Price: </p>
    </div>
  );
}

export default PriceCalculator;
