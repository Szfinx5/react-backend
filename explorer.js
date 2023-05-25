import express from "express";
import { getFilteredResult, getTransactionData } from "./helper.js";

const router = express.Router();
router.use(express.json());

router.get("/", async function (req, res) {
  const { contractAddress } = req.query;
  const filters = req.query;

  const response = await getTransactionData(contractAddress);
  if (response.status === 404) {
    res.json({ success: false, error: response.message });
  } else {
    const { result } = response.message;
    const filteredResult = getFilteredResult({ result, filters });
    res.json({ success: true, payload: filteredResult });
  }
});

export default router;
