export class Album {
  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }

  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
