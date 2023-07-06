import { FaImage, FaRegImages } from "react-icons/fa6";

export default function NoImage() {
    return (
        <>
        <div className="w-full h-80 flex flex-col justify-center items-center">
            <FaRegImages className="text-[5rem] opacity-30" />
        </div>
        <div className="text-center font-semibold py-4">Search Term not found!</div>
        <div className="text-center opacity-40 font-semibold text-sm">press ctrl + k to search again</div>
        </>
    )
}