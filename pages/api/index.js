import axios from "axios";

export async function loadBanner() {
  const result = await axios.get(`${process.env.NEXT_APP_API_URL}/review`);
  const detail = JSON.parse(JSON.stringify(result.data.data));
  console.log(detail);
  return detail;
}
