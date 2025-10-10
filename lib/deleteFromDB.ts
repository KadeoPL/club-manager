import { toast } from "sonner";

export async function deleteFromDB(id: number, endpoint: string, name: string) {
  try {
    const res = await fetch(`/api/${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    toast.error("Błąd połączenia z serwerem.");
    return false;
  }
}
