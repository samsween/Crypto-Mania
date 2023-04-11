import { Loader } from "./Loader"





export const LoadingPage = () => {
    return (
        <div className="w-full h-full bg-primary-100 bg-opacity-50 absolute top-0 left 0 flex justify-center items-center">
            <Loader />
        </div>
    )
}