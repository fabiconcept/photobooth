"use client"
import { fetchImageApi, fetchImageApi_search } from "@/lib/utilities";
import AllPhotos from "./components/AllPhotos";
import NavBar from "./components/navBar"
import React, { useEffect, useRef, useState } from "react";
import LoadindDiv from "./elements/LoadindDiv";
import PopModal from "./components/PopModal";
import { Toaster, toast } from "react-hot-toast";

export const generateMetadata = () => {
  return {
    title: "PhotoBooth",
      description: "This is a photobooth app",
  }
}


export const MyContext = React.createContext();


export default function Home() {
  const [photosArray, setPhotosArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false); 

  const divRef = useRef(null);
  const btnRef = useRef();
  const [popData, setPopData] = useState({
    imgSrc: "",
    imgAlt: "",
    photographer: "",
    photographerLink: "",
    avg_color: "",
    status: false
  });

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

    divElement.addEventListener("scroll", handleScroll);

    btnRef.current.click();
    return () => {
      divElement.removeEventListener("scroll", handleScroll);
    };

  }, []);

  const fetchHandler = async () => {
    setIsLoading(true)
    try {
      const preLoad = fetchImageApi;
      const photosResults = await preLoad(currentPage);
      setPhotosArray([...photosArray, ...photosResults]);
      setCurrentPage(currentPage + 1);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setHasError(true);
    }
  }

  const viewPop = (data) => {
    const { src, alt, photographer, photographerLink, avg_color } = data;
    setPopData({
      ...popData,
      imgSrc: src,
      imgAlt: alt,
      photographer,
      photographerLink,
      avg_color,
      status: true
    });
  }

  return (
    <MyContext.Provider value={{ viewPop }}>
      <main className="w-screen h-screen overflow-auto" ref={divRef}>
        <Toaster />
        <NavBar />
        <div className="">
          <AllPhotos photoGrid={photosArray} contextObj={MyContext} />
        </div>
        {isLoading && <LoadindDiv />}
        {!isLoading && !hasError && photosArray.length > 0 && <div className="p-3 mx-auto justify-center text-center">You&apos;ve reached the end</div>}
        {hasError && photosArray.length === 0 && <div className="p-3 mx-auto justify-center text-center">Oops! an error occured, refresh page</div>}
        {hasError && photosArray.length > 0 && <div className="p-3 mx-auto justify-center text-center">Oops! an error occured, can&apos;t fetch more Photos</div>}
        <div className="btn hidden" ref={btnRef} onClick={() => fetchHandler()}></div>
        <PopModal
          avg={popData.avg_color}
          imgAlt={popData.imgAlt}
          imgSrc={popData.imgSrc}
          photographer={popData.photographer}
          photographerUrl={popData.photographerLink}
          status={popData.status}
          key={popData.avg_color}
          clean={setPopData}
        />
      </main>
    </MyContext.Provider>
  )
}