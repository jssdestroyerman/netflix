import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
    email: string;
    password: string;
}

function Login() {
    const [login, setLogin] = useState(false);
    const { signIn, signUp } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (login) {
            await signIn(data.email, data.password);
        }
    };

    return (
        <div className="relative w-full h-[100vh] flex flex-col md:items-center md:justify-center bg-black md:bg-transparent">
            <Head>
                <title>Netflix - Login</title>
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
            <Image
                src="https://rb.gy/p2hphi"
                fill
                className="-z-10 object-cover hidden opacity-60 md:inline"
                alt="background"
            />
            <Image
                src="https://rb.gy/ulxxee"
                className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
                width={150}
                height={150}
                alt=""
            />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
            >
                <h1 className=" text-4xl font-semibold">Sign In</h1>
                <div className=" space-y-4">
                    <label className=" inline-block w-full">
                        <input
                            type="email"
                            placeholder="Email"
                            className=" input"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <p className="p-1 text-[13px] text-orange-500">
                                Please enter a valid email.
                            </p>
                        )}
                    </label>
                    <label className=" inline-block w-full">
                        <input
                            type="password"
                            placeholder="Password"
                            className="input"
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <p className="p-1 text-[13px]  text-orange-500">
                                Your password must contain between 4 and 60
                                characters.
                            </p>
                        )}
                    </label>
                </div>

                <button
                    type="submit"
                    className=" w-full rounded bg-[#e50914] py-3 font-semibold hover:bg-opacity-90 transition"
                    onClick={() => setLogin(true)}
                >
                    Sign In
                </button>
                <div className=" text-[#e5e5e5]/70">
                    New to Netflix ?{" "}
                    <Link href={"/plans"}>
                        <button
                            type="submit"
                            className=" text-white hover:underline"
                        >
                            Sign Up Now !
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
