import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "@/atoms/modalAtom";
import { useEffect, useState } from "react";
import { Element, Genre } from "@/typings";
import ReactPlayer from "react-player/lazy";
import { HiPlay, HiPlus, HiOutlineXMark } from "react-icons/hi2";
import { HiVolumeOff, HiVolumeUp, HiOutlineThumbUp } from "react-icons/hi";
import Loader from "./Loader";

function Modal() {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
    const [trailer, setTrailer] = useState<false | string>("");
    const [genres, setGenres] = useState<Genre[]>([]);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        async function fetchMovie() {
            const data = await fetch(
                `https://api.themoviedb.org/3/${
                    currentMovie?.media_type === "tv" ? "tv" : "movie"
                }/${currentMovie?.id}?api_key=${
                    process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`
            ).then((res) => res.json());

            console.log(data.videos);

            if (data?.videos.results.length > 0) {
                const index = data.videos.results.findIndex(
                    (element: Element) => element.type === "Trailer"
                );

                if (index > -1) {
                    setTrailer(data.videos.results[index].key);
                } else {
                    setTrailer(data.videos.results[0].key);
                }
            } else {
                setTrailer(false);
            }

            if (data?.genres) {
                setGenres(data.genres);
            }
        }
        fetchMovie();
    }, [currentMovie]);

    function handleClose() {
        setShowModal(false);
    }

    return (
        <MuiModal
            open={showModal}
            onClose={handleClose}
            className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll"
        >
            <>
                <button
                    onClick={handleClose}
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 md:h-11 md:w-11 border-none bg-[#181818] hover:bg-[#181818]"
                >
                    <HiOutlineXMark className=" h-7 w-7" />
                </button>

                <div className="relative flex items-center justify-center pt-[56.25%]">
                    {trailer ? (
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${trailer}`}
                            width="100%"
                            height="100%"
                            style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                            }}
                            playing
                            muted={muted}
                        />
                    ) : (
                        <div className="absolute bottom-24 md:bottom-40 h-12 w-12">
                            <Loader color="dark:fill-gray-300" />
                        </div>
                    )}

                    <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                        <div className="flex space-x-2">
                            <button className=" flex items-center gap-x-2 rounded bg-white px-4 py-1.5 text-sm md:text-xl font-semibold text-black transition hover:bg-[#e6e6e6]">
                                <HiPlay className=" h-4 w-4 text-black md:h-7 md:w-7" />
                                Play
                            </button>
                            <button className="modalButton">
                                <HiPlus className="h-4 w-4 md:h-7 md:w-7" />
                            </button>
                            <button className="modalButton">
                                <HiOutlineThumbUp className=" h-4 w-4 md:h-7 md:w-7" />
                            </button>
                        </div>
                        <button
                            className="modalButton"
                            onClick={() => setMuted(!muted)}
                        >
                            {muted ? (
                                <HiVolumeOff className="h-4 w-4 md:h-6 md:w-6" />
                            ) : (
                                <HiVolumeUp className="h-4 w-4 md:h-6 md:w-6" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex space-x-16 rounded-b-md bg-[#181818] px-5 md:px-10 py-8">
                    <div className="space-y-6 text-lg">
                        <div className="flex items-center space-x-2 test-sm">
                            <p className=" font-semibold text-green-400">
                                {Math.floor(currentMovie?.vote_average * 10)}%
                                Match
                            </p>
                            <p className=" font-light">
                                {currentMovie?.release_date ||
                                    currentMovie?.first_air_date}
                            </p>
                            <div className="flex h-4 items-center justify-center  border rounded border-white/40 px-1.5 text-xs">
                                HD
                            </div>
                        </div>

                        <div className=" flex flex-col gap-x-10 gap-y-4  md:flex-row">
                            <p className="md:w-5/6 text-justify md:text-left">
                                {currentMovie?.overview}
                            </p>
                            <div className=" flex flex-col space-y-3 text-sm">
                                <div>
                                    <span className=" text-[gray]">
                                        Genres:{" "}
                                    </span>
                                    {genres
                                        .map((genre) => genre.name)
                                        .join(", ")}
                                </div>

                                <div>
                                    <span className="text-[gray]">
                                        Original language:{" "}
                                    </span>
                                    {currentMovie?.original_language}
                                </div>

                                <div>
                                    <span className="text-[gray]">
                                        Total votes:{" "}
                                    </span>
                                    {currentMovie?.vote_count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    );
}

export default Modal;
