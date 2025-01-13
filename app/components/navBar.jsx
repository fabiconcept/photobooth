    "use client"
    import Image from "next/image";
    import Link from "next/link";
    import { useRouter, usePathname } from "next/navigation";
    import { useEffect, useRef, useState, useTransition } from "react";

    export default function NavBar() {
        const searchBox = useRef();
        const pathName = usePathname();
        const [placeholder, setPlaceholder] = useState("CTRL + K");
        const [searchText, setSearchText] = useState(pathName ? `${pathName.slice(1).replace(/%20/g, ' ')}` : "");
        const router = useRouter();
        const [loading, startTransition] = useTransition();

        const onSearchHandler = (path) => {
            startTransition(() => {
                router.push(path);
            });
        };

        const handleShortCut = (e) => {
            const { ctrlKey, code } = e;

            if (ctrlKey && code === "KeyK") {
                e.preventDefault();
                searchBox.current?.focus();
                return
            }
            
            if (ctrlKey && code === "KeyS") {
                e.preventDefault();
                searchBox.current?.focus();
                return
            }
            
            if (ctrlKey && code === "KeyL") {
                e.preventDefault();
                searchBox.current?.focus();
                return
            }
            
            if (ctrlKey && code === "KeyF") {
                e.preventDefault();
                searchBox.current?.focus();
                return
            }
        }

        const handleSubmit = (e) => {
            e.preventDefault();

            if (String(searchText).length > 0) {
                onSearchHandler(`/${searchText}`);
            } else {
                onSearchHandler(`/`);
            }
        }

        useEffect(() => {
            document.addEventListener("keydown", (e) => handleShortCut(e));
            return (
                document.removeEventListener("keydown", (e) => handleShortCut(e))
            );
        }, []);

        return (
            <section className="w-full py-4 sm:px-12 px-5 flex bg-white dark:bg-[#161618] justify-between duration-[.5s] border-b border-b-black/10 focus-within:border-b-black/25 shadow-xl shadow-black/10 focus-within:sticky max-sm:sticky top-0 z-[200] items-center">
                <Link href={"/"} className="font-bold text-lg uppercase cursor-pointer flex items-center gap-1" >
                    <Image
                        src={"/sly.svg"}
                        alt="Dead Head Ico"
                        height={25}
                        width={25}
                        className={`dark:brightness-0 dark:invert ${searchText || placeholder !== "CTRL + K" ? "max-sm:w-8" : ""}`}
                    />
                    <span className={`font-bold ${searchText || placeholder !== "CTRL + K" ? "max-sm:hidden" : ""}`}>Photobooth</span>
                </Link>
                <div className={`rounded-lg flex gap-2 ${searchText || placeholder !== "CTRL + K" ? "border-black dark:border-white" : "focus-within:border-black focus-within:dark:border-white"} border-2 border-transparent overflow-hidden px-3 py-2 capitalize`}>
                    {loading && <Image
                        src="/spinner.svg"
                        alt="Loading spinner"
                        width={20}
                        height={20}
                        className="dark:invert"
                    />}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="search"
                            ref={searchBox}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="border-none outline-none bg-transparent placeholder-shown:w-[5.5rem] focus:w-56 w-40 capitalize"
                            placeholder={`${placeholder}`}
                            onFocus={() => setPlaceholder("Find item...")}
                            onBlur={() => setPlaceholder("CTRL + (K/S/F/L)")}
                        />
                    </form>
                </div>
            </section>
        );
    }