const BASE_URL = "http://localhost:8080/api/trips";

export const getAllTrips = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch trips");
  return await res.json();
};

export const getTripById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch trip");
  return await res.json();
};
