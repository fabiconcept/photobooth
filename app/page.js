"use client"
import { fetchImageApi, fetchImageApi_search } from "@/lib/utilities";
import AllPhotos from "./components/AllPhotos";
import NavBar from "./components/navBar"
import React, { useEffect, useRef, useState } from "react";
import LoadindDiv from "./elements/LoadindDiv";
import PopModal from "./components/PopModal";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

export const MyContext = React.createContext();
export default function Home() {
  const [photosArray, setPhotosArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [scrolled, setScrolled] = React.useState(false);

  
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
  React.useEffect(() => {
    const myDiv = divRef.current

    if (!myDiv) return;

    const handleScroll = () => {
      const fullHeight = myDiv.clientHeight;
      const scrollPosition = myDiv.scrollTop;
      
      if (scrollPosition > (fullHeight * 0.05)) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      console.log({
        isScrolled: scrollPosition > (fullHeight * 0.05)
      })
    };

    myDiv.addEventListener('scroll', handleScroll);
    return () => myDiv.removeEventListener('scroll', handleScroll);
  }, []);
  
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
      setHasError(false);

    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
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
    <MyContext.Provider value={{ viewPop, scrolled }}>
      <main className="w-screen h-screen overflow-auto relative" ref={divRef}>
        <Toaster />
        <NavBar />
        <div className="p-1 md:px-4 sm:px-2 px-1 ">
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

      <div className="fixed sm:bottom-10 bottom-5 sm:right-10 right-5 opacity-30 hover:opacity-100 group z-[90]">
        Made by <Link href={"https://fabiconcept.online"} className="text-xl group-hover:text-blue-500 font-semibold" target="_blank">@Fabiconcept</Link>
      </div>
      </main>
    </MyContext.Provider>
  )
}