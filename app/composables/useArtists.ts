import type { ArtistListItem } from "#types/artists/artist";

export function useArtists() {
  const getArtists = () => {
    return useFetch<ArtistListItem[]>("/api/artists/artists");
  };

  return { getArtists };
}
