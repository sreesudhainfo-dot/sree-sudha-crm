import type { Media } from "../types/Media";
import { deleteMedia } from "../services/media";

interface MediaCardProps {
  media: Media;
  onDeleted: () => void;
  onPreview: (media: Media) => void;
}

export default function MediaCard({
  media,
  onDeleted,
  onPreview,
}: MediaCardProps) {
  async function handleDelete() {
    const ok = window.confirm(
      "Delete this file?"
    );

    if (!ok) return;

    try {
      await deleteMedia(media);
      onDeleted();
    } catch (error) {
      console.error(error);
      alert("Unable to delete.");
    }
  }

  const isImage =
    media.file_type.startsWith("image");

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow transition hover:shadow-xl">

      {isImage ? (
        <img
          src={media.public_url}
          className="h-44 w-full cursor-pointer object-cover"
          onClick={() => onPreview(media)}
        />
      ) : (
        <div
          className="flex h-44 cursor-pointer items-center justify-center bg-slate-100 text-6xl"
          onClick={() => onPreview(media)}
        >
          📄
        </div>
      )}

      <div className="space-y-2 p-4">

        <div className="truncate font-semibold">
          {media.original_name}
        </div>

        <div className="text-sm text-slate-500">
          {media.folder}
        </div>

        <div className="flex justify-between text-xs text-slate-400">

          <span>
            {(media.file_size / 1024 / 1024).toFixed(2)} MB
          </span>

          <span>
            {new Date(
              media.created_at
            ).toLocaleDateString()}
          </span>

        </div>

        <div className="flex gap-2 pt-3">

          <button
            onClick={() => onPreview(media)}
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
          >
            Preview
          </button>

          <a
            href={media.public_url}
            target="_blank"
            rel="noreferrer"
            className="rounded bg-green-600 px-3 py-1 text-sm text-white"
          >
            Download
          </a>

          <button
            onClick={handleDelete}
            className="rounded bg-red-600 px-3 py-1 text-sm text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}