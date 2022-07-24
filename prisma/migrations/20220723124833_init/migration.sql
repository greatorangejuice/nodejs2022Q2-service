-- DropForeignKey
ALTER TABLE "ArtistsOnUser" DROP CONSTRAINT "ArtistsOnUser_artistId_fkey";

-- AddForeignKey
ALTER TABLE "ArtistsOnUser" ADD CONSTRAINT "ArtistsOnUser_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
