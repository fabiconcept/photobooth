"use client"
import { fetchImageApi, fetchImageApi_search } from "@/lib/utilities";
import AllPhotos from "./components/AllPhotos";
import NavBar from "./components/navBar"
import React, { useEffect, useRef, useState } from "react";
import LoadindDiv from "./elements/LoadindDiv";
import PopModal from "./components/PopModal";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "PhotoBooth",
  description: "This is a photobooth app",
}

export async function getServerSideProps() {
  const data = await fetchImageApi();
  return {
    props: {
      data,
    },
  };
}


export const MyContext = React.createContext();


export default function Home() {
  const [photosArray, setPhotosArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const divRef = useRef(null);
  const btnRef = useRef();
  const [popData, setPopData] = useState({
    imgSrc: "",
    imgAlt: "",
    photographer: "",
    photographerLink: "",
    avg_color: "",
    status: false
  })

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
    const preLoad = fetchImageApi;
    const photosResults = await preLoad(currentPage);
    setPhotosArray([...photosArray, ...photosResults]);
    setCurrentPage(currentPage + 1);
  }

  const searchHandler = async (query) => {
    setPhotosArray([]);
    const photosResult = await fetchImageApi_search(query);
    setPhotosArray([...photosResult]);
  }

  const viewPop = (data) => {
    const  { src, alt, photographer, photographerLink, avg_color } = data;
    setPopData({...popData, 
        imgSrc: src,
        imgAlt: alt,
        photographer,
        photographerLink,
        avg_color,
        status: true
      });
  }

  return (
    <MyContext.Provider value={{viewPop}}>
      <main className="w-screen h-screen overflow-auto" ref={divRef}>
        <Toaster />
        <NavBar onSearchHandler={searchHandler} />
        <div className="">
          <AllPhotos photoGrid={photosArray} />
        </div>
        <LoadindDiv />
        <div className="btn hidden" ref={btnRef} onClick={() => fetchHandler()}>Load Images</div>
        <PopModal
          avg={popData.avg_color}
          imgAlt={popData.imgAlt}
          imgSrc={popData.imgSrc}
          photographer={popData.photographer}
          photographerUrl={popData.photographerLink}
          status={popData.status}
          key={popData.avg_color}
          clean= {setPopData}
        />
      </main>
    </MyContext.Provider>
  )
}