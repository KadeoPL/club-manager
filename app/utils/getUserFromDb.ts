export async function getUserFromDb(username: string) {
  try {
    const response = await fetch(
      `/api/findUser?username=${encodeURIComponent(username)}`
    );

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error(`Invalid JSON response. Status: ${response.status}`);
    }

    if (!response.ok) {
      throw new Error(
        data?.message || `HTTP error! status: ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}
