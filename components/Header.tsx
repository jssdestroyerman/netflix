import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineBellAlert, HiMagnifyingGlass } from "react-icons/hi2";

function Header() {
    const { logout } = useAuth();
    return (
        <header>
            <div className="flex items-center space-x-2 md:space-x-10">
                <Image
                    src="https://rb.gy/ulxxee"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
                    alt=""
                />

                <ul className="hidden space-x-4 md:flex">
                    <li className="headerLink">Home</li>
                    <li className="headerLink">Tv Shows</li>
                    <li className="headerLink">Movies</li>
                    <li className="headerLink">New & Popular</li>
                    <li className="headerLink">My List</li>
                </ul>
            </div>
            <div className="flex items-center space-x-4 ">
                <HiMagnifyingGlass className="hidden h-6 w-6 sm:inline " />
                <p className="hidden lg:inline">Kids</p>
                <HiOutlineBellAlert className="h-6 w-6 " />
                <div onClick={logout}>
                    <Image
                        src="https://rb.gy/g1pwyx"
                        alt=""
                        width={35}
                        height={35}
                        className="cursor-pointer rounded"
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;
