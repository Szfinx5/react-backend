import express from "express";
import fetch from "node-fetch";

const router = express.Router();
router.use(express.json());

router.get("/", async function (req, res) {
  const { contractAddress } = req.query;
  const filters = req.query;

  const result = await getTransactionData(contractAddress);
  const filteredResult = getFilteredResult({ result, filters });

  res.json({ success: true, payload: result });
});

const getTransactionData = async (contractAddress) => {
  const response = await fetch(
    `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractAddress}&page=1&sort=asc&offset=100&apikey=Y2DXGY5EUZEZMESWZ4DYZHFXG68NCGHWBW`
  );
  let data = await response.json();
  return data.result;
};

const getFilteredResult = ({ result, filters }) => {
  console.log(filters);
};

export default router;
