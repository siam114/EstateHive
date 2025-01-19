import { Helmet } from "react-helmet-async";
import AddPropertyForm from "./../../../component/Form/AddPropertyForm";
import { useContext, useState } from "react";
import { imageUpload } from "../../../api/utils";
import { AuthContext } from "../../../context/AuthProvider";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import toast from "react-hot-toast";

const AddProperty = () => {
  const [loading, setLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState({name: 'Choose Image'});
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure()
  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const min_price = parseFloat(form.min_price.value);
    const max_price = parseFloat(form.max_price.value);
    const location = form.location.value;
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);
    console.log(name, description, min_price, max_price, location, imageUrl);

    //agent info
    const agent = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    //create property data object
    const propertyData = {
      name,
      description,
      min_price,
      max_price,
      location,
      image: imageUrl,
      agent,
    };

    //save property in db
    try{
      //post req
      await axiosSecure.post('/addProperty', propertyData)
      toast.success('Data Added Successfully!')
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Property | Dashboard</title>
      </Helmet>
      <AddPropertyForm
        handleSubmit={handleSubmit}
        loading={loading}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
      />
    </div>
  );
};

export default AddProperty;
