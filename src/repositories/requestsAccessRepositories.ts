import RequestAccess from "../database/models/RequestAccess";

export const makeRequest = async (
  userId: string,
  datasetId: string,
  freqId: string
) => {
  const data = await RequestAccess.create({
    user_id: userId,
    dataset_id: datasetId,
    frequency_id: freqId,
  });

  return data;
};

export const getPendingRequests = async () => {
  const pendingRequests = await RequestAccess.findAll({
    where: { status: null },
  });
  return pendingRequests;
};
