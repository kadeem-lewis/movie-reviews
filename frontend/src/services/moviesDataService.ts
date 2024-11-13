import { Review } from "@/types/movies";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/movies`;

export async function getAll(page = 0) {
  const response = await fetch(`${baseUrl}?page=${page}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export async function get(id: string) {
  const response = await fetch(`${baseUrl}/id/${id}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export async function find(query: string, by = "title", page = 0) {
  const response = await fetch(`${baseUrl}?${by}=${query}&page=${page}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export async function createReview(data: Partial<Review>) {
  const response = await fetch(`${baseUrl}/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export async function updateReview(data: Partial<Review>) {
  const response = await fetch(`${baseUrl}/review`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}
export async function deleteReview(id: string, userId: string) {
  const response = await fetch(`${baseUrl}/review`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ review_id: id, user_id: userId }),
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export async function getRatings() {
  const response = await fetch(`${baseUrl}/ratings`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}
