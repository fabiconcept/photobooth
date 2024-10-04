"use client"
import Image from "next/image";
import { useContext } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function GridItem({ imgSrc, imgAlt, avg, photographer, photographer_url, contextObj }) {
    const { viewPop } = useContext(contextObj);

    function viewHandler() {
        const dataObject = {
            src: imgSrc,
            alt: imgAlt,
            avg_color: avg,
            photographer,
            photographerLink: photographer_url,
        }
        viewPop(dataObject);
    }
    return (
        <>
            <div className={`h-fit w-full peer relative overflow-hidden cursor-pointer group active:opacity-60 active:translate-y-3 active:scale-[0.98] active:rotate-[2deg] hover:z-10 hover:shadow-lg item`} style={{ background: `${avg}` }} onClick={viewHandler}>
                <Image
                    width={600}
                    height={800}
                    className="w-full object-contain group-hover:scale-125 group-hover:translate-y-8 duration-200 delay-200"
                    src={imgSrc}
                    alt={imgAlt}
                    priority
                    fetchPriority="high"
                />
                <div className="absolute h-full w-full z-20 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 top-0 group-hover:backdrop-blur-[2px] left-0">
                    <div className="absolute top-full left-full group-hover:top-1/2 group-hover:left-1/2 -translate-y-1/2 -translate-x-1/2 group-hover:opacity-100 opacity-0 delay-100 grid place-items-center">
                        <div className="flew gap-4">
                            <div className="text-white dark:text-[#161618] flex items-center gap-2 text-3xl"><FaArrowUpRightFromSquare /></div>
                        </div>
                    </div>
                </div>
                <span className="absolute group-hover:top-4 group-hover:right-4 top-3 right-3 px-2 lowercase py-1 bg-white dark:bg-[#161618] dark:text-white sm:text-sm text-xs rounded-md font-bold z-30 sm:max-w-[20rem] max-w-[10rem] text-ellipsis whitespace-nowrap overflow-hidden border border-black/25 dark:border-white/25 shadow-lg shadow-black/10 dark:shadow-white/10">@{photographer}</span>
                {imgAlt && <span className="absolute group-hover:bottom-8 group-hover:opacity-100 opacity-0 bottom-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mix-blend-screen px-2 py-1 text-xs text-white font-semibold z-30 sm:max-w-[15rem] max-w-[10rem] text-ellipsis whitespace-nowrap overflow-hidden">{imgAlt}</span>}
            </div>
            {imgAlt && <p className="font-semibold md:text-sm text-xs text-center mb-3 mx-6 max-sm:ml-12 shadow shadow-transparent peer-hover:opacity-100 opacity-50 hover:shadow-black/10 text-black px-6 line-clamp-1 py-1 rounded-3xl border border-black/10 hover:border-black/25 bg-slate-100">{imgAlt}</p>}
            {!imgAlt && <p className="mb-5"></p>}
        </>
    )
}
