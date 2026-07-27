import { supabase } from "../../../lib/supabase";
import type { Media } from "../types/Media";

/*
-----------------------------------
Get Media
-----------------------------------
*/

export async function getMedia(): Promise<Media[]> {

  const { data, error } =
    await supabase
      .from("media_library")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) throw error;

  return (data ?? []) as Media[];

}

/*
-----------------------------------
Upload File
-----------------------------------
*/

export async function uploadMedia(
  file: File,
  folder: string
) {

  const fileName =
    `${Date.now()}-${file.name}`;

  const storagePath =
    `${folder}/${fileName}`;

  const { error: uploadError } =
    await supabase.storage
      .from("media-library")
      .upload(storagePath, file);

  if (uploadError)
    throw uploadError;

  const {
    data: publicData,
  } =
    supabase.storage
      .from("media-library")
      .getPublicUrl(storagePath);

  const publicUrl =
    publicData.publicUrl;

  const { data, error } =
    await supabase
      .from("media_library")
      .insert([
        {
          file_name: fileName,
          original_name: file.name,
          folder,
          file_type: file.type,
          file_size: file.size,
          public_url: publicUrl,
          storage_path: storagePath,
        },
      ])
      .select()
      .single();

  if (error) throw error;

  return data as Media;

}

/*
-----------------------------------
Delete
-----------------------------------
*/

export async function deleteMedia(
  media: Media
) {

  await supabase.storage
    .from("media-library")
    .remove([
      media.storage_path,
    ]);

  const { error } =
    await supabase
      .from("media_library")
      .delete()
      .eq("id", media.id);

  if (error) throw error;

}