const express = require("express");
const router = express.Router();

/**
 * -------------------------------------
 *
 * graph visualizer API
 *
 * -------------------------------------
 */
router.post("/graph", (req, res) => {
  const { matrix } = req.body;
  if (!matrix) {
    return res.status(400).json({ error: "Matrix is required" });
  }
  console.log(matrix);
  res.json({ matrix });
});

module.exports = router;
