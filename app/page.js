"use client"
import { testApiRequest } from "@/lib/utilities";
import AllPhotos from "./components/AllPhotos";
import NavBar from "./components/navBar"
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

export const metadata = {
  title: "PhotoBooth",
  description: "This is a photobooth app",
}

export default async function Home() {
  const [photosArray, setPhotosArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const nextHandler = async () => {
    const fetchedPhotos = await testApiRequest(currentPage);
    console.log(fetchedPhotos);
    setPhotosArray([...photosArray, ...fetchedPhotos]);
    setCurrentPage(currentPage + 1);
  }

  return (
    <main className="w-screen h-screen overflow-auto">
      <NavBar />
      <div className="mx-auto w-[95%]">
        <InfiniteScroll
          hasMore={true}
          next={nextHandler}
          dataLength={photosArray.length}
          loader={<p>Loading...</p>}
        >
          <AllPhotos photoGrid={photosArray} />
        </InfiniteScroll>
      </div>
    </main>
  )
}