import axios from "axios";

const baseURL = "http://localhost:5001/api";

export async function getViewAllPosition() {
  try {
    const res = await axios.post("/positions/viewallposition");
    const data = await res.data;
    return data;
    console.log("positionData", positionData);
  } catch (error) {
    console.log("error in /api.js", error);
  }
}

export async function deletePosition(positionId) {
  try {
    const res = await axios.post(`${baseURL}/positions/deletePosition`, {
      positionId,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("error in /api.js", error);
    throw error;
  }
}

// export async function assetConfig
