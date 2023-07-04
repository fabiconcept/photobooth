"use client"
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
    const searchBox = useRef();
    const [placeholder, setPlaceholder] = useState("CTRL + K");


    const handleShortCut = (e) => {
        const { ctrlKey, code } = e;

        if (ctrlKey && code === "KeyK") {
            e.preventDefault();
            searchBox.current.focus();
            return
        }
    }
    

    useEffect(() => {
        document.addEventListener("keydown", (e)=> handleShortCut(e));

        return (
            document.removeEventListener("keydown", (e)=> handleShortCut(e))
        );
    }, []);

    return (
        <section className="w-full py-4 px-5 flex justify-between items-center">
            <div className="font-bold text-lg uppercase">Photobooth</div>
            <div className="rounded-lg focus-within:border-blue-500 focus-within:border-2 overflow-hidden px-3 py-2">
                <input type="text" ref={searchBox} className="border-none outline-none bg-transparent placeholder-shown:w-20 focus:w-40 w-40" placeholder={`${placeholder}`} onFocus={()=>setPlaceholder("Find item...")} onBlur={()=>setPlaceholder("CTRL + K")} />
            </div>
        </section>
    )
}