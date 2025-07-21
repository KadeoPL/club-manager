import { getPlaiceholder } from "plaiceholder";

export default async function useBase64Image(image) {
  const { base64 } = await getPlaiceholder(image);
  return base64;
}
