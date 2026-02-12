import api from "./api";

export const payForListing = async (listingId, type) => {
  const res = await api.post("/payments/checkout", {
    listingId,
    type
  });

  window.location.href = res.data.url;
};
