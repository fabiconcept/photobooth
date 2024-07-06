"use client"
import Masonry from "react-masonry-css";
import "../styles/masonry.css";
import "../styles/grid.css";
import GridItem from "../elements/GridItem";

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 2
};

export default function AllPhotos({photoGrid, contextObj}) {

    return (
        <div className="w-fit overflow-x-hidden md:mx-4 sm:mx-2 mx-1 pt-3">
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid group-item gap-x-4 gap-y-4"
                columnClassName="my-masonry-grid_column"
            >
                {photoGrid?.map(({ alt, id, photographer, src, avg_color, photographer_url }) => (

                    <GridItem contextObj={contextObj} imgSrc={src.original} photographer={photographer} imgAlt={alt} avg={avg_color} key={id} photographer_url={photographer_url} />
                ))}
            </Masonry>
        </div>
    )
}