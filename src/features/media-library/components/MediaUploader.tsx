import { useState } from "react";
import { uploadMedia } from "../services/media";

interface MediaUploaderProps {
  onUploadSuccess: () => void;
}

const folders = [
  "Marketing",
  "Brochures",
  "Layouts",
  "Legal",
  "Videos",
  "Logos",
  "Documents",
  "Other",
];

export default function MediaUploader({
  onUploadSuccess,
}: MediaUploaderProps) {
  const [file, setFile] = useState<File | null>(null);

  const [folder, setFolder] =
    useState("Marketing");

  const [uploading, setUploading] =
    useState(false);

  async function handleUpload() {
    if (!file) {
      alert("Please choose a file.");
      return;
    }

    try {
      setUploading(true);

      await uploadMedia(file, folder);

      alert("File uploaded successfully.");

      setFile(null);

      onUploadSuccess();
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-5 text-xl font-semibold">
        Upload Media
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <input
          type="file"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] ?? null
            )
          }
        />

        <select
          value={folder}
          onChange={(e) =>
            setFolder(e.target.value)
          }
          className="rounded-lg border p-2"
        >
          {folders.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          {uploading
            ? "Uploading..."
            : "Upload"}
        </button>

      </div>

      {file && (
        <div className="mt-4 rounded-lg bg-slate-100 p-3 text-sm">

          <p>
            <strong>File:</strong>{" "}
            {file.name}
          </p>

          <p>
            <strong>Size:</strong>{" "}
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <p>
            <strong>Type:</strong>{" "}
            {file.type}
          </p>

        </div>
      )}

    </div>
  );
}