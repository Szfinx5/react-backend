import fetch from "node-fetch";

export const getTransactionData = async (contractAddress) => {
  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractAddress}&sort=asc&apikey=Y2DXGY5EUZEZMESWZ4DYZHFXG68NCGHWBW`
    );
    let data = await response.json();

    if (data.status === "0") {
      console.log(data.status);
      return { status: 404, message: data.result };
    } else {
      return { status: 200, message: data };
    }
  } catch (error) {
    console.log(error);
    return { status: 405, message: error };
  }
};

export const getFilteredResult = ({ result, filters }) => {
  // Constructing the filter objects
  let toAndFromFilter = {};
  let searchFilters = {};

  if (filters.fromAddress) {
    toAndFromFilter = { ...toAndFromFilter, from: filters.fromAddress };
  }
  if (filters.toAddress) {
    toAndFromFilter = { ...toAndFromFilter, to: filters.toAddress };
  }
  if (filters.aboveValue) {
    searchFilters = {
      ...searchFilters,
      aboveValue: Number(filters.aboveValue),
    };
  }
  if (filters.belowValue) {
    searchFilters = {
      ...searchFilters,
      belowValue: Number(filters.belowValue),
    };
  }
  if (filters.limit) {
    searchFilters = { ...searchFilters, limit: Number(filters.limit) };
  }

  searchFilters = { ...searchFilters, offset: Number(filters.offset) || 0 };

  // Filter on to and from addresses
  if (filters.fromAddress || filters.toAddress) {
    result = result.filter((transaction) => {
      for (const key in toAndFromFilter) {
        if (
          transaction[key] === undefined ||
          transaction[key] !== toAndFromFilter[key]
        )
          return false;
      }
      return true;
    });
  }

  // Filtering on the above and below value
  if (searchFilters.aboveValue) {
    result = result.filter((transaction) => {
      return Number(transaction.value) > searchFilters.aboveValue;
    });
  }
  if (searchFilters.belowValue) {
    result = result.filter((transaction) => {
      return Number(transaction.value) < searchFilters.belowValue;
    });
  }

  // Limiting the number of results and setting the page/banch number
  result = result.splice(
    searchFilters.limit * searchFilters.offset,
    searchFilters.limit
  );

  return result;
};
