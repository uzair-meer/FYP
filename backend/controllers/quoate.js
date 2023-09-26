 import  express  from "express";
const router = express.Router();

// Calculate the quote based on distance
router.get('/quote', async (req, res) => {
  try {
    const distance = parseFloat(req.query.distance); // Get the distance from query parameter
    const basePrice = 50; // Set the base price for a short distance move
    let price = 0; // Initialize the price variable

    if (distance <= 10) {
      price = basePrice;
    } else if (distance > 10 && distance <= 50) {
      price = basePrice + (distance - 10) * 2;
    } else if (distance > 50) {
      price = basePrice + 80 + (distance - 50) * 3;
    }

    res.status(200).json({ price: price }); // Return the calculated price in the response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;