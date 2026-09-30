const API_URL = "http://localhost:5000/api/cms";

export const getAbout = async () => {
  const response = await fetch(`${API_URL}/about`);

  if (!response.ok) {
    throw new Error("Failed to fetch About data");
  }

  return response.json();
};

export const getSkills = async () => {
  const response = await fetch(`${API_URL}/skills`);

  if (!response.ok) {
    throw new Error("Failed to fetch Skills data");
  }

  return response.json();
};

export const getProjects = async () => {
  const response = await fetch(`${API_URL}/projects`);

  if (!response.ok) {
    throw new Error("Failed to fetch Projects data");
  }

  return response.json();
};