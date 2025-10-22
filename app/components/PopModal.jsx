"use client"
import { FaDownload, FaEyeDropper, FaUserAstronaut, FaX } from "react-icons/fa6";
import "../styles/popModal.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { copyToClipboard } from "../lib/utils";
import { detectOS, downloadHandler } from "@/lib/utilities";
import toast from "react-hot-toast";

export default function PopModal({imgSrc, imgAlt, photographer, avg, photographerUrl, status, clean}) {
    const [modalShowing, setModalShowing] = useState(status);

    useEffect(()=>{
        if(!modalShowing) {
            clean({
                imgSrc: "",
                imgAlt: "",
                photographer: "",
                photographerLink: "",
                avg_color: "",
                status: false
              });
        }
    }, [modalShowing]);

    const isMac = useMemo(() => detectOS() === "macos", [])
    
    const performDownload = useCallback(() => {
        const promise = downloadHandler({imgAlt, imgSrc});
        toast.promise(promise, {
            loading: "Downloading Image...",
            error: "Failed to download image.",
            success: "Image downloaded successfully."
        });
    }, []);

    const handleShortCut = useCallback((e) => {
        const { ctrlKey, code, metaKey } = e;
        
        if (String(code).toLowerCase() === "escape") {
            e.preventDefault()
            setModalShowing(false)
            return;
        };

        if (ctrlKey && code === "KeyS") {
            e.preventDefault();
            performDownload()
            return
        }
        
        if (metaKey && code === "KeyS") {
            e.preventDefault();
            performDownload()
            return
        }
        
        if (ctrlKey && code === "KeyC") {
            if(!avg) return;
            e.preventDefault();
            copyToClipboard(avg)
            return
        }
        
        if (metaKey && code === "KeyC") {
            if(!avg) return;
            e.preventDefault();
            copyToClipboard(avg)
            return
        }
    }, [performDownload, copyToClipboard, avg]);

    useEffect(() => {
        const handler = (e) => handleShortCut(e);
        document.addEventListener("keydown", handler);
        return () => {
            document.removeEventListener("keydown", handler);
        };
    }, [handleShortCut]);


    return (
        <div className={`popModal sm:p-[5rem] ${modalShowing ? "in" : "out"}`}>
            <div className="modal">
                <div className="img relative" style={{background: `${avg}`, color: `${avg}`, backgroundImage: `url(${imgSrc})`}}>    
                    <span 
                        title="Exit (ESC)"
                        className="absolute top-3 left-3 cursor-pointer w-[30px] h-[30px] grid place-items-center bg-white text-2xl rounded-full z-30 max-w-[20rem] text-ellipsis whitespace-nowrap overflow-hidden hover:scale-105 active:scale-95 active:opacity-50 close hover:text-red-600 border border-black/10 hover:border-red-600/40" 
                        onClick={()=>setModalShowing(false)}
                    >
                        <FaX className="text-sm" />
                    </span>
                    {imgSrc && <Image height={800} width={600} src={imgSrc} alt={imgAlt} className="" priority />}
                </div>
                {imgAlt && <section className="p-5 bg-slate-100 dark:bg-[#1f1f22] text-center border-b border-b-black/10">
                    <span className="text-black px-4 sm:text-base text-sm rounded-md dark:text-white text-ellipsis text-center">{imgAlt}</span>
                </section>}
                <section className="w-full p-5 max-sm:px-2 rounded-b-lg bg-white dark:bg-[#161618] dark:text-white flex-1 flex justify-between items-center flex-wrap gap-4 text-black">
                    <span 
                        className="sm:min-w-[10rem] min-w-[1rem] flex-1 justify-center flex gap-4 items-center text-red-500 cursor-pointer hover:scale-105 active:scale-95" 
                        onClick={performDownload}
                        title={`Download Image ${isMac ? "(⌘ + S)" :"(CTRL + S)"}`}
                    >
                        <FaDownload className="text-lg font-light"/>
                        <span className="max-sm:hidden">Download</span>
                    </span>
                    <Link href={photographerUrl} target="_blank" className="min-w-[10rem] flex-1 justify-center flex gap-2 items-center cursor-pointer hover:scale-105 active:scale-95">
                        <FaUserAstronaut className="text-lg font-light" />
                        <span className="whitespace-nowrap max-sm text-sm">{photographer}</span> 
                    </Link>
                    <span 
                        className="sm:min-w-[10rem] min-w-[1rem] flex-1 justify-center flex gap-4 items-center cursor-grab hover:scale-105 active:scale-95" 
                        onClick={()=>copyToClipboard(avg)}
                        title={`Copy ${avg} ${isMac ? "(⌘ + C)" :"(CTRL + C)"}`}
                    >
                        <FaEyeDropper className="text-lg font-light" />
                        <div className={`color text-xs flex items-center justify-center max-sm:hidden`} style={{background: `${avg}`}}></div>
                    </span>
                    
                </section>
            </div>
            <div className="background" title="Exit (ESC)" onClick={()=>setModalShowing(false)}></div>
        </div>
    )
}