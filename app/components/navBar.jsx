"use client"
import { useEffect, useRef, useState } from "react";

export default function NavBar({onSearchHandler}) {
    const searchBox = useRef();
    const [placeholder, setPlaceholder] = useState("CTRL + K");
    const [searchText, setSearchText] = useState("");


    const handleShortCut = (e) => {
        const { ctrlKey, code } = e;

        if (ctrlKey && code === "KeyK") {
            e.preventDefault();
            searchBox.current.focus();
            return
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        onSearchHandler(searchText);
    }

    

    useEffect(() => {
        document.addEventListener("keydown", (e)=> handleShortCut(e));

        return (
            document.removeEventListener("keydown", (e)=> handleShortCut(e))
        );
    }, []);

    return (
        <section className="w-full py-4 px-5 flex bg-white justify-between duration-[.5s] focus-within:sticky focus-within:top-0 focus-within:z-[200] items-center">
            <div className="font-bold text-lg uppercase">Photobooth</div>
            <div className="rounded-lg focus-within:border-black focus-within:border-2 overflow-hidden px-3 py-2">
                <form onSubmit={handleSubmit}>
                <input type="search" ref={searchBox} value={searchText} onChange={(e)=>setSearchText(e.target.value)} className="border-none outline-none bg-transparent placeholder-shown:w-20 focus:w-40 w-40" placeholder={`${placeholder}`} onFocus={()=>setPlaceholder("Find item...")} onBlur={()=>setPlaceholder("CTRL + K")} />
                </form>
            </div>
        </section>
    )
}