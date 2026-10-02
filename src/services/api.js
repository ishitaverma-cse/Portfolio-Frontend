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

export const getExperience = async () => {
  const response = await fetch(`${API_URL}/experience`);

  if (!response.ok) {
    throw new Error("Failed to fetch Experience data");
  }

  return response.json();
};

export const getBlogs = async () => {
  const response = await fetch(`${API_URL}/blogs`);

  if (!response.ok) {
    throw new Error("Failed to fetch Blogs data");
  }

  return response.json();
};

export const getTestimonials = async () => {
  const response = await fetch(`${API_URL}/testimonials`);

  if (!response.ok) throw new Error("Failed to fetch Testimonials data");

  return response.json();
};

export const getBlogBySlug = async (slug) => {
  const response = await fetch(`${API_URL}/blogs/${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }

  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const signupUser = async (name, email, password) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};