/*
  Warnings:

  - You are about to drop the `TestArtistFavs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestArtistFavs" DROP CONSTRAINT "TestArtistFavs_artistId_fkey";

-- DropTable
DROP TABLE "TestArtistFavs";

-- CreateTable
CREATE TABLE "ArtistFavs" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "ArtistFavs_pkey" PRIMARY KEY ("artistId")
);

-- CreateTable
CREATE TABLE "AlbumsFavs" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "AlbumsFavs_pkey" PRIMARY KEY ("albumId")
);

-- CreateTable
CREATE TABLE "TracksFavs" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "TracksFavs_pkey" PRIMARY KEY ("trackId")
);

-- AddForeignKey
ALTER TABLE "ArtistFavs" ADD CONSTRAINT "ArtistFavs_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumsFavs" ADD CONSTRAINT "AlbumsFavs_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TracksFavs" ADD CONSTRAINT "TracksFavs_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
