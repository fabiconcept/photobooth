"use client"
import { fetchImageApi_search } from "@/lib/utilities";
import PopModal from "../components/PopModal";
import NavBar from "../components/navBar";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import AllPhotos from "../components/AllPhotos";
import LoadindDiv from "../elements/LoadindDiv";
import NoImage from "../elements/NoImage";


export const generateMetadata = ({ params: { query } }) => {
    return {
        title: `PhotoBooth | ${query}`,
        description: "This is a photobooth app",
    }
}

export const searchContext = React.createContext();

export default function SearchResultsPage({ params: { query } }) {
    const [photosArray, setPhotosArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [popData, setPopData] = useState({
        imgSrc: "",
        imgAlt: "",
        photographer: "",
        photographerLink: "",
        avg_color: "",
        status: false
    });

    const searchHandler = async () => {
        setIsLoading(true)
        setPhotosArray([]);
        try {
            const preLoad = fetchImageApi_search;
            const photosResult = await preLoad(query);
            setPhotosArray([...photosResult]);
            toast.success(`Search Results: ${photosResult.length}`, {
                style: {
                  border: '1px solid #713200',
                  padding: '16px',
                  color: '#713200',
                },
                iconTheme: {
                  primary: '#713200',
                  secondary: '#FFFAEE',
                },
              });
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false);
            setHasError(true);
        }
    }

    useEffect(() => {
        searchHandler()
    }, [query]);

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
        <searchContext.Provider value={{ viewPop }}>
            <main className="w-screen h-screen overflow-auto">
                <NavBar />
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                 />
                {!hasError && <AllPhotos photoGrid={photosArray} contextObj={searchContext} />}
                {isLoading && <LoadindDiv />}
                {!isLoading && !hasError && photosArray.length === 0 && <NoImage />}
                {!isLoading && !hasError && photosArray.length > 0 && <div className="p-3 mx-auto justify-center text-center">You've reached the end</div>}
                {hasError && <div className="p-3 mx-auto justify-center text-center">Oops! an error occured, refresh page</div> }
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
        </searchContext.Provider>
    )
}