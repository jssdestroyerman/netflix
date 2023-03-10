import Head from "next/head";
import Header from "@/components/Header";
import requests from "@/utils/requests";
import { Movie } from "@/typings";
import Banner from "@/components/Banner";
import Row from "@/components/Row";
import { useRecoilValue } from "recoil";
import { modalState, movieState } from "@/atoms/modalAtom";
import Modal from "@/components/Modal";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import useSubscription from "@/hooks/useSubscription";
import useList from "@/hooks/useList";

interface Props {
    netflixOriginals: Movie[];
    trendingNow: Movie[];
    topRated: Movie[];
    actionMovies: Movie[];
    comedyMovies: Movie[];
    horrorMovies: Movie[];
    romanceMovies: Movie[];
    documentaries: Movie[];
}

export default function Home({
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
}: Props) {
    const showModal = useRecoilValue(modalState);
    const { loading, user } = useAuth();
    const subscription = useSubscription(user);
    const router = useRouter();
    const currentMovie = useRecoilValue(movieState);
    const list = useList(user?.uid);

    if (loading || subscription === null) return null;
    if (!subscription) router.push("/plans");

    return (
        <div className="backgroundGradient relative h-screen lg:h-[140vh]">
            <Head>
                <title>Netflix - Home</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/iconNetflix.png" />
            </Head>

            <Header />

            <main className="relative">
                <Banner netflixOriginals={netflixOriginals} />
                <section className=" space-y-6 md:space-y-24">
                    <Row title="Trending Now" movies={trendingNow} />
                    <Row title="Top Rated" movies={topRated} />
                    <Row title="Action Thrillers" movies={actionMovies} />

                    {list?.length > 0 && <Row title="My List" movies={list} />}

                    <Row title="Comedies" movies={comedyMovies} />
                    <Row title="Scary Movies" movies={horrorMovies} />
                    <Row title="Romance Movies" movies={romanceMovies} />
                    <Row title="Documentaries" movies={documentaries} />
                </section>
            </main>
            {showModal && <Modal />}
        </div>
    );
}

export async function getServerSideProps() {
    const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
    ] = await Promise.all([
        fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies).then((res) => res.json()),
        fetch(requests.fetchDocumentaries).then((res) => res.json()),
    ]);

    return {
        props: {
            netflixOriginals: netflixOriginals.results,
            trendingNow: trendingNow.results,
            topRated: topRated.results,
            actionMovies: actionMovies.results,
            comedyMovies: comedyMovies.results,
            horrorMovies: horrorMovies.results,
            romanceMovies: romanceMovies.results,
            documentaries: documentaries.results,
        },
    };
}
