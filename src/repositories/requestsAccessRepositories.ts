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

export const findRequestById = async (id: string) => {
  const requestsRowInfo = await RequestAccess.findAll({
    where: { id: id },
    raw: true,
  });

  return requestsRowInfo;
};

export const updateRequestStatus = async (id: string, status: boolean) => {
  const rowsAffected = await RequestAccess.update(
    { status: status },
    {
      where: {
        id: id,
      },
    }
  );
  return rowsAffected;
};

export const findRequest = async (
  userId: string,
  datasetId: string,
  freqId: string
) => {
  const requestsRowInfo = await RequestAccess.findAll({
    where: { user_id: userId, dataset_id: datasetId, frequency_id: freqId },
    raw: true,
  });

  return requestsRowInfo;
};
