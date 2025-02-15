
export default function notFound() {
    return (
        <div className="w-screen h-screen grid grid-cols-3 grid-rows-3">
            
            <div className="col-start-2 row-start-2 rounded-xl p-3">
                <h1 className="text-7xl text-center font-semibold">404</h1>
                <h2 className="my-3 text-center text-3xl">UH OH! Your'r lost.</h2>
                <p className="text-center ">The page you are looking for does not exist.
                    How you got here is a mystery. But you can click the button below
                    to go back to the homepage.</p>
                <div className="w-full">
                    <a href="/" className="border-gray-950 border-4  block mx-auto w-4/12 mt-3 text-center py-3 rounded-full font-semibold ">HOME</a>
                </div>
            </div>

        </div>
    );
}
