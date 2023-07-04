"use client"
import { testApiRequest } from "@/lib/utilities";
import AllPhotos from "./components/AllPhotos";
import NavBar from "./components/navBar"
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import LoadindDiv from "./elements/LoadindDiv";

export const metadata = {
  title: "PhotoBooth",
  description: "This is a photobooth app",
}

export async function getServerSideProps() {
  const data = await testApiRequest();
  return {
    props: {
      data,
    },
  };
}

export default function Home() {
  const [photosArray, setPhotosArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const divRef = useRef(null);
  const btnRef = useRef()

  useEffect(() => {
    const divElement = divRef.current;
    

    const handleScroll = () => {
      const scrollHeight = divElement.scrollHeight;
      const clientHeight = divElement.clientHeight;
      const scrollTop = divElement.scrollTop;

      const distanceToRight = scrollHeight - clientHeight - scrollTop;

      const threshold = 700;

      if (distanceToRight <= threshold) {
        btnRef.current.click();
      }
    };

    divElement.addEventListener('scroll', handleScroll);

    btnRef.current.click();
    return () => {
      divElement.removeEventListener('scroll', handleScroll);
    };

  }, []);

  const fetchHandler = async () => {
    const fetchPhotosHandler = await testApiRequest(currentPage);
    setPhotosArray([...photosArray, ...fetchPhotosHandler]);
    setCurrentPage(currentPage + 1);
  }



  return (
    <main className="w-screen h-screen overflow-auto" ref={divRef}>
      <NavBar />
      <div className="">
        <AllPhotos photoGrid={photosArray} />
      </div>
      <LoadindDiv/>
      <div className="btn hidden" ref={btnRef} onClick={()=>fetchHandler()}>Load Images</div>
    </main>
  )
}