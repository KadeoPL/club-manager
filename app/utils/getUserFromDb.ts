export async function getUserFromDb(username: string) {
  try {
    const response = await fetch(`/api/findUser/username=${username}`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}
