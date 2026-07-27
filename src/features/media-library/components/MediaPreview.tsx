import type { Media } from "../types/Media";

interface Props {
  media: Media | null;
  onClose: () => void;
}

export default function MediaPreview({
  media,
  onClose,
}: Props) {
  if (!media) return null;

  const isImage =
    media.file_type.startsWith("image");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-10">

      <div className="max-h-full max-w-5xl rounded-xl bg-white p-6">

        <div className="mb-4 flex justify-between">

          <h2 className="font-semibold">
            {media.original_name}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>

        </div>

        {isImage ? (
          <img
            src={media.public_url}
            className="max-h-[75vh]"
          />
        ) : (
          <iframe
            src={media.public_url}
            className="h-[75vh] w-[900px]"
          />
        )}

      </div>

    </div>
  );
}