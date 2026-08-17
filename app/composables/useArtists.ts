import type { ArtistListItem } from "#types/artists/artist";

export function useArtists() {
  const getArtists = () => {
    return useFetch<ArtistListItem[]>("/api/artists/artists");
  };

  const getArtist = (id: string) => {
    return useFetch<ArtistListItem>(`/api/artists/${id}`);
  };

  const addArtist = (form: FormData) => {
    return $fetch("/api/artists/artist", { method: "POST", body: form });
  };

  const updateArtist = (id: string, form: FormData) => {
    return $fetch(`/api/artists/${id}`, { method: "PUT", body: form });
  };

  const removeArtist = (id: string) => {
    return $fetch(`/api/artists/${id}`, { method: "DELETE" });
  };

  return { getArtists, getArtist, addArtist, updateArtist, removeArtist };
}
