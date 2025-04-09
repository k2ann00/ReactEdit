// frontends/src/components/AssetManager.tsx
import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";

interface AssetItem {
  name: string;
  url: string;
}

export default function AssetManager() {
  const [assets, setAssets] = useState<AssetItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Bileşen yüklendiğinde veya yeni yükleme yapıldığında asset listesini çek
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const result = await ApiService.getAssets();
      setAssets(result);
    } catch (error) {
      console.error("Failed to fetch assets:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      await ApiService.uploadAsset(file);
      setMessage("Upload successful");
      setFile(null);

      // Yeniden asset listesini çek
      fetchAssets();
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Upload error");
    }
  };

  return (
    <div style={{ border: "1px solid green", padding: "8px" }}>
      <h3>Asset Manager</h3>
      <div>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{ marginRight: "8px" }}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
      {message && <p>{message}</p>}

      <ul style={{ maxHeight: "200px", overflowY: "auto" }}>
        {assets.map((asset) => (
          <li key={asset.name}>
            {asset.name} <br />
            <img
              src={asset.url}
              alt={asset.name}
              style={{ width: "80px", height: "80px" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
