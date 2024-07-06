"use client"
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
    const searchBox = useRef();
    const pathName = usePathname();
    const [placeholder, setPlaceholder] = useState("CTRL + K");
    const [searchText, setSearchText] = useState(pathName ? `${pathName.slice(1).replace(/%20/g, ' ')}` : "");
    const router = useRouter();

    const onSearchHandler = (path) => {
        router.push(path);
    };

    const handleShortCut = (e) => {
        const { ctrlKey, code } = e;

        if (ctrlKey && code === "KeyK") {
            e.preventDefault();
            searchBox.current?.focus();
            return
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(String(searchText).length > 0){
            onSearchHandler(`/${searchText}`);
        }else{
            onSearchHandler(`/`);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", (e)=> handleShortCut(e));
        return (
            document.removeEventListener("keydown", (e)=> handleShortCut(e))
        );
    }, []);

    return (
        <section className="w-full py-4 sm:px-12 px-5 flex bg-white justify-between duration-[.5s] focus-within:sticky focus-within:top-0 focus-within:z-[200] items-center">
            <Link href={"/"} className="font-bold text-lg uppercase cursor-pointer" >Photobooth</Link>
            <div className="rounded-lg focus-within:border-black border-2 border-transparent overflow-hidden px-3 py-2 capitalize">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="search" 
                        ref={searchBox} 
                        value={searchText} 
                        onChange={(e)=>setSearchText(e.target.value)} 
                        className="border-none outline-none bg-transparent placeholder-shown:w-[5.5rem] focus:w-56 w-40 capitalize" 
                        placeholder={`${placeholder}`} 
                        onFocus={()=>setPlaceholder("Find item...")} 
                        onBlur={()=>setPlaceholder("CTRL + K")} 
                    />
                </form>
            </div>
        </section>
    );
}