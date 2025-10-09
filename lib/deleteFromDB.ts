import { toast } from "sonner";
export async function deleteFromDB(id: number, endpoint: string, name: string) {
  // await fetch(`/api/${url}`, {
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ id }),
  // });

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
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    return toast.error("Błąd połączenia z serwerem.");
  }
}
