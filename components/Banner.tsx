import { Movie } from "@/typings";
import { baseUrl } from "@/utils/imageMovie";
import Image from "next/image";
import { useState, useEffect } from "react";
import { HiInformationCircle, HiPlay } from "react-icons/hi2";

interface Props {
    netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        setMovie(
            netflixOriginals[
                Math.floor(Math.random() * netflixOriginals.length)
            ]
        );
    }, [netflixOriginals]);

    return (
        <>
            <div className="absolute top-0 w-screen h-[70vh] lg:h-[95vh] -z-10">
                <Image
                    src={`${baseUrl}${
                        movie?.backdrop_path || movie?.poster_path
                    }`}
                    alt="banner"
                    fill
                    className=" object-cover"
                />
            </div>
            <div className="textShadow py-32 px-4 lg:py-60 md:w-[600px] lg:w-[800px] lg:pl-10">
                <h1 className=" text-3xl py-4 md:text-5xl lg:text-7xl font-bold ">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <p>{movie?.overview}</p>

                <div className="flex mt-5 space-x-3">
                    <button className="bannerButton bg-white text-black">
                        <HiPlay className=" h-4 w-4 text-black md:h-7 md:w-7" />
                        Play
                    </button>
                    <button className="bannerButton bg-[gray]/70">
                        More Info <HiInformationCircle />
                    </button>
                </div>
            </div>
        </>
    );
}

export default Banner;
