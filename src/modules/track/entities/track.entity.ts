export class Track {
  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }

  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
