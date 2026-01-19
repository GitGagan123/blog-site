import * as OrdersRepository from "../endpoints/orders";

export const getSampleOrders = async (SortName: string) => {
  try {
    const sampleOrders = await OrdersRepository.getOrders(SortName || "");
    return sampleOrders.data;
  } catch (err) {
    console.log("Unable to Fetch Orders : ", err);
    return null;
  }
};
