
function Banner(){


    return (
        <section className="bg-gray-50">
            <div className="mx-auto  max-w-screen-xl px-4 py-20 lg:flex  lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Optimize Your Play Experience
                        <strong className="font-extrabold text-blue-800 sm:block"> Boost Engagement. </strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Explore a world of possibilities with our intuitive platform designed for seamless play scheduling and management!
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-500 focus:outline-none focus:ring active:bg-blue-800 sm:w-auto"
                            href="#"
                        >
                            Book Now
                        </a>

                        <a
                            className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                            href="#"
                        >
                            Log out
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner;