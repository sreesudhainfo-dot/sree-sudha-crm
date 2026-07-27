import { useEffect, useState } from "react";

import MediaUploader from "../components/MediaUploader";
import FolderSidebar from "../components/FolderSidebar";
import SearchBar from "../components/SearchBar";
import MediaCard from "../components/MediaCard";
import MediaPreview from "../components/MediaPreview";

import { getMedia } from "../services/media";

import type { Media } from "../types/Media";

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedFolder, setSelectedFolder] =
    useState("All");

  const [selectedMedia, setSelectedMedia] =
    useState<Media | null>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  async function loadMedia() {
    try {
      setLoading(true);

      const data = await getMedia();

      setMedia(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredMedia = media.filter((item) => {
    const matchesSearch =
      item.original_name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFolder =
      selectedFolder === "All" ||
      item.folder === selectedFolder;

    return matchesSearch && matchesFolder;
  });

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Media Library
      </h1>

      <MediaUploader
        onUploadSuccess={loadMedia}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">

        <FolderSidebar
          selected={selectedFolder}
          onSelect={setSelectedFolder}
        />

        <div className="space-y-5 lg:col-span-3">

          <SearchBar
            value={search}
            onChange={setSearch}
          />

          {loading ? (
            <div className="rounded-xl bg-white p-8 shadow">
              Loading...
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow">
              No media found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredMedia.map((item) => (
                <MediaCard
                  key={item.id}
                  media={item}
                  onDeleted={loadMedia}
                  onPreview={setSelectedMedia}
                />
              ))}

            </div>
          )}

        </div>

      </div>

      <MediaPreview
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />

    </div>
  );
}