/*
  Warnings:

  - You are about to drop the `ArtistsOnUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArtistsOnUser" DROP CONSTRAINT "ArtistsOnUser_artistId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistsOnUser" DROP CONSTRAINT "ArtistsOnUser_userId_fkey";

-- DropTable
DROP TABLE "ArtistsOnUser";

-- CreateTable
CREATE TABLE "FavoriteArtists" (
    "userId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "FavoriteArtists_pkey" PRIMARY KEY ("userId","artistId")
);

-- CreateTable
CREATE TABLE "FavoriteAlbums" (
    "userId" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "FavoriteAlbums_pkey" PRIMARY KEY ("userId","albumId")
);

-- CreateTable
CREATE TABLE "FavoriteTracks" (
    "userId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "FavoriteTracks_pkey" PRIMARY KEY ("userId","trackId")
);

-- AddForeignKey
ALTER TABLE "FavoriteArtists" ADD CONSTRAINT "FavoriteArtists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteArtists" ADD CONSTRAINT "FavoriteArtists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteAlbums" ADD CONSTRAINT "FavoriteAlbums_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteAlbums" ADD CONSTRAINT "FavoriteAlbums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteTracks" ADD CONSTRAINT "FavoriteTracks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteTracks" ADD CONSTRAINT "FavoriteTracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
