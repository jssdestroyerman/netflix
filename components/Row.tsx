import { Movie } from "@/typings";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useEffect, useRef } from "react";

interface Props {
    title: string;
    movies: Movie[];
}

function Row({ title, movies }: Props) {
    const rowRef = useRef<HTMLDivElement | null>(null);

    function handleClick(direction: string) {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;

            const scrollTo =
                direction === "left"
                    ? scrollLeft - clientWidth
                    : scrollLeft + clientWidth;
            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    }

    return (
        <div className=" h-40 space-y-0.5 md:space-y-2 pl-4 lg:pl-10">
            <h2 className=" font-semibold mb-2 md:text-2xl">{title}</h2>
            <div className="group relative md:-ml-2">
                <HiChevronLeft
                    className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
                    onClick={() => handleClick("left")}
                />

                <div
                    ref={rowRef}
                    className="hideScrollBar flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
                >
                    {movies.map((movie) => {
                        return (
                            <div
                                key={movie.id}
                                className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
                            >
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${
                                        movie.backdrop_path || movie.poster_path
                                    }`}
                                    fill
                                    alt=""
                                    className="rounded-sm object-cover md:rounded"
                                />
                            </div>
                        );
                    })}
                </div>

                <HiChevronRight
                    className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
                    onClick={() => handleClick("right")}
                />
            </div>
        </div>
    );
}

export default Row;
