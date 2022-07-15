export class Artist {
  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }

  id: string;
  name: string;
  grammy: boolean;
}
