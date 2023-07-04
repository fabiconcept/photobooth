"use client"
import Masonry from "react-masonry-css";
import "../styles/masonry.css";
import "../styles/grid.css";
import GridItem from "../elements/GridItem";

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

export default function AllPhotos({photoGrid}) {

    return (
        <div className="w-full overflow-x-hidden">
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid group-item"
                columnClassName="my-masonry-grid_column"
            >
                {photoGrid?.map(({ alt, id, photographer, src, avg_color }) => (

                    <GridItem imgSrc={src.original} photographer={photographer} imgAlt={alt} avg={avg_color} key={id} />
                ))}
            </Masonry>
        </div>
    )
}