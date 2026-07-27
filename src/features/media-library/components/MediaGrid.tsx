import type { Media } from "../types/Media";

interface MediaGridProps {
  media: Media[];
}

export default function MediaGrid({
  media,
}: MediaGridProps) {
  if (media.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <p className="text-slate-500">
          No media uploaded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

      {media.map((item) => (

        <div
          key={item.id}
          className="overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg"
        >

          {item.file_type.startsWith("image") ? (

            <img
              src={item.public_url}
              alt={item.original_name}
              className="h-44 w-full object-cover"
            />

          ) : (

            <div className="flex h-44 items-center justify-center bg-slate-100 text-5xl">

              📄

            </div>

          )}

          <div className="p-4">

            <h3 className="truncate font-medium">

              {item.original_name}

            </h3>

            <p className="mt-1 text-sm text-slate-500">

              {item.folder}

            </p>

            <p className="mt-1 text-xs text-slate-400">

              {(item.file_size / 1024 / 1024).toFixed(2)} MB

            </p>

          </div>

        </div>

      ))}

    </div>
  );
}