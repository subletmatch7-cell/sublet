import api from "./api";

export const createListing = (data) =>
  api.post("/listings", data).then((r) => r.data);

export const getListings = (params) =>
  api.get("/listings", { params }).then((r) => r.data);

export const getListing = (id) =>
  api.get(`/listings/${id}`).then((r) => r.data);

export const updateListing = (id, data) =>
  api.put(`/listings/${id}`, data).then((r) => r.data);

export const deleteListing = (id) =>
  api.delete(`/listings/${id}`).then((r) => r.data);
