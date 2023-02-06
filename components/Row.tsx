import { Movie } from "@/typings";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "@/atoms/modalAtom";
import { DocumentData } from "firebase/firestore";

interface Props {
    title: string;
    movies: Movie[] | DocumentData | undefined;
}

function Row({ title, movies }: Props) {
    const rowRef = useRef<HTMLDivElement | null>(null);
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

    function handleClick(direction: string) {
        let currentPosition = 0;
        function setPostion() {
            rowRef.current?.scrollTo({
                left: currentPosition,
                behavior: "smooth",
            });
        }

        if (rowRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;

            if (direction === "left") {
                currentPosition = scrollLeft - clientWidth;
                setPostion();
            } else {
                currentPosition = scrollLeft + clientWidth;
                setPostion();
            }

            if (currentPosition === -clientWidth) {
                currentPosition = scrollLeft + scrollWidth;
                setPostion();
            } else if (currentPosition === scrollWidth) {
                currentPosition = scrollLeft - scrollWidth;
                setPostion();
            }
        }
    }

    return (
        <div className=" h-40 space-y-0.5 md:space-y-2 pl-4 lg:pl-10">
            <h2 className=" font-semibold mb-2 md:text-2xl">{title}</h2>
            <div className="group relative md:-ml-2">
                <HiChevronLeft
                    className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 md:h-14 md:w-14"
                    onClick={() => handleClick("left")}
                />

                <div
                    ref={rowRef}
                    className="hideScrollBar flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
                >
                    {movies?.map((movie) => {
                        return (
                            <div
                                key={movie.id}
                                className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
                                onClick={() => {
                                    setCurrentMovie(movie);
                                    setShowModal(true);
                                }}
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
                    className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 md:h-14 md:w-14"
                    onClick={() => handleClick("right")}
                />
            </div>
        </div>
    );
}

export default Row;
