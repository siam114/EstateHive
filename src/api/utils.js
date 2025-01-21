
import axios from "axios"
import toast from "react-hot-toast"

export const imageUpload = async imageData =>{
     const formData= new FormData()
     formData.append('image', imageData)
    const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)

    return data.data.display_url
}

export const saveUser = async(user) =>{
   try{
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
        role: 'USER'
        })
        if(!res){
            toast.error('Already Exist')
            return
        }
        const {token, ...userInfo}= res
        localStorage.setItem('access-token',token)
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
   }catch(err){
      toast.error(err.message)
   }
}