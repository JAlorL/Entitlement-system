import axios from "axios";
import CustomError from "../types/customError";

const BASE_URL = "https://api.coincap.io/v2/assets";

export const getPricingData = async (
  datasetName: string,
  frequency: string
) => {
  try {
    const url = `${BASE_URL}/${datasetName}/history?interval=${frequency}`;
    const response = await axios.get(url);
    const pricingData = response.data.data.map((item: any) => ({
      priceUsd: item.priceUsd,
      time: item.time,
      date: new Date(item.time).toISOString(),
    }));
    return pricingData;
  } catch (error) {
    throw new CustomError(
      `Error fetching pricing data for ${datasetName} at ${frequency}:`,
      400
    );
  }
};
