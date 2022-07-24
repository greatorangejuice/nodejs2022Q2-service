-- CreateTable
CREATE TABLE "TestArtistFavs" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "TestArtistFavs_pkey" PRIMARY KEY ("artistId")
);

-- AddForeignKey
ALTER TABLE "TestArtistFavs" ADD CONSTRAINT "TestArtistFavs_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
