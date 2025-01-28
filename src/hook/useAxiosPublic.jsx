import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://my-assignment12-estate-hive-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
}

export default useAxiosPublic