"use client"
import { FaCircleHalfStroke, FaDownload, FaEyeDropper, FaUserAstronaut } from "react-icons/fa6";
import "../styles/popModal.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { copyToClipboard } from "../lib/utils";

export default function PopModal({imgSrc, imgAlt, photographer, avg, photographerUrl, status, clean}) {
    const [modalShowing, setModalShowing] = useState(status);

    const downloadHandler = () => {
        const imageUrl = imgSrc;
        const linkElement = document.createElement("a");
        linkElement.href = imageUrl;
        linkElement.setAttribute("download", `${imgAlt} | PhotoBooth.jpeg`);
        linkElement.download;
        linkElement.target = "_blank";
        document.body.appendChild(linkElement);
        linkElement.click();
        document.body.removeChild(linkElement);
    }

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

    return (
        <div className={`popModal p-4 sm:p-[5rem] ${modalShowing ? "in" : "out"}`}>
            <div className="modal">
                <div className="img relative" style={{background: `${avg}`, color: `${avg}`, backgroundImage: `url(${imgSrc})`}}>
                    {imgAlt && <span className="absolute top-3  right-3 mix-blend-screen px-2 capitalize py-1 bg-white text-sm rounded-md font-bold z-30 max-w-[20rem] sm:max-w-[30rem] text-ellipsis whitespace-nowrap overflow-hidden">{imgAlt}</span>}
                    <span className="absolute top-3 left-3 cursor-pointer mix-blend-screen w-[30px] h-[30px] grid place-items-center p-0 m-0 bg-white text-2xl rounded-full z-30 max-w-[20rem] text-ellipsis whitespace-nowrap overflow-hidden hover:scale-105 active:scale-95 active:opacity-50 close" onClick={()=>setModalShowing(false)}>x</span>
                    <span className="absolute bottom-3 left-3 cursor-pointer mix-blend-screen w-[30px] h-[30px] flex justify-center items-center bg-white text-2xl rounded-full z-30 max-w-[20rem] text-ellipsis whitespace-nowrap overflow-hidden hover:scale-105 active:scale-95 active:opacity-50 close peer">  <FaCircleHalfStroke /> </span>
                    {imgSrc && <Image height={800} width={600} src={imgSrc} alt={imgAlt} className="peer-hover:filter peer-hover:grayscale" priority />}
                </div>
                <section className="w-full p-5 rounded-b-lg bg-white flex-1 flex justify-between items-center flex-wrap gap-4 text-black">
                    <span className="min-w-[10rem] flex-1 justify-center flex gap-4 items-center text-red-500 cursor-pointer hover:scale-105 active:scale-95" onClick={downloadHandler}>
                        <FaDownload className="text-lg font-light"/>
                        Download
                    </span>
                    <Link href={photographerUrl} target="_blank" className="min-w-[10rem] flex-1 justify-center flex gap-4 items-center cursor-pointer hover:scale-105 active:scale-95">
                        <FaUserAstronaut className="text-lg font-light" />
                        {photographer}
                    </Link>
                    <span className="min-w-[10rem] flex-1 justify-center flex gap-4 items-center cursor-grab hover:scale-105 active:scale-95" onClick={()=>copyToClipboard(avg)}>
                        <FaEyeDropper className="text-lg font-light" />
                        <div className={`color text-xs flex items-center justify-center`} style={{background: `${avg}`}}></div>
                    </span>
                    
                </section>
            </div>
            <div className="background" onClick={()=>setModalShowing(false)}></div>
        </div>
    )
}