"use client"
import Image from "next/image";
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
        <section className="w-full py-4 sm:px-12 px-5 flex bg-white justify-between duration-[.5s] border-b border-b-black/10 focus-within:border-b-black/25 shadow-xl shadow-black/10 focus-within:sticky max-sm:sticky top-0 z-[200] items-center">
            <Link href={"/"} className="font-bold text-lg uppercase cursor-pointer flex items-center gap-1" >
                <Image
                    src={"/sly.svg"}
                    alt="Dead Head Ico"
                    height={25}
                    width={25}
                    className={`${placeholder !=="CTRL + K" ? "max-sm:w-8": ""}`}
                />
                <span className={`font-bold ${placeholder !=="CTRL + K" ? "max-sm:hidden": ""}`}>Photobooth</span>
            </Link>
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