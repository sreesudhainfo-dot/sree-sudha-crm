const STORAGE_KEY = "crm_auth";

export function login(
  username: string,
  password: string
) {
  if (
    username === "admin" &&
    password === "admin123"
  ) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        username: "admin",
        role: "Admin",
      })
    );

    return true;
  }

  return false;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export function isAuthenticated() {
  return !!localStorage.getItem(STORAGE_KEY);
}

export function getCurrentUser() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return null;

  return JSON.parse(data);
}