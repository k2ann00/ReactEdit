// frontends/src/services/ApiService.ts
import axios from "axios";
import { SceneData } from "../types/Scene";

const API_URL = "http://localhost:3000";

const ApiService = {
  // Sahne ile ilgili metotlar
  async getScene(): Promise<SceneData> {
    const res = await axios.get(`${API_URL}/scene`);
    return res.data;
  },
  async updateScene(data: SceneData) {
    return axios.post(`${API_URL}/scene/update`, data);
  },

  // Asset ile ilgili metotlar
  async getAssets(): Promise<{ name: string; url: string }[]> {
    const res = await axios.get(`${API_URL}/assets`);
    return res.data;
  },

  async uploadAsset(file: File): Promise<void> {
    const formData = new FormData();
    formData.append("asset", file);

    await axios.post(`${API_URL}/assets/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default ApiService;
