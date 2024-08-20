import { useLoaderData, useNavigate } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaUtensils } from "react-icons/fa6";

const image_hosting_key = import.meta.env.VITE_IMAGEBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateItem = () => {
  const { name, recipe, category, price, _id } = useLoaderData();

  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // console.log(data);
    // Image upload to imagebb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send menu with image url
      const menuItem = {
        name: data.name,
        recipe: data.recipe,
        image: res.data.data.display_url,
        category: data.category,
        price: data.price,
      };
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      if (menuRes.data.modifiedCount > 0) {
        navigate("/dashboard/manageitems");
        // Show success alert
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} updated in Menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    // console.log(res.data);
  };

  return (
    <div>
      <SectionTitle heading={"UPDATE ITEM"} subHeading={"--update info--"} />

      <div className="bg-[#f3f3f3] p-10 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* recipe name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe name*</span>
            </div>
            <input
              {...register("name")}
              defaultValue={name}
              required
              type="text"
              placeholder="Recipe name"
              className="input input-bordered w-full"
            />
          </label>
          <div className="flex gap-4">
            {/* Category */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Category*</span>
              </div>
              <select
                defaultValue={category}
                className="select select-bordered"
                {...register("category")}
                required
              >
                <option disabled value="default">
                  select your category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </label>
            {/* Price */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                {...register("price")}
                defaultValue={price}
                required
                type="number"
                placeholder="$10"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="space-y-4">
            {/* Recipe details */}
            <label className="form-control">
              <div className="label">
                <span className="label-text">Recipe details</span>
              </div>
              <textarea
                {...register("recipe")}
                defaultValue={recipe}
                required
                className="textarea textarea-bordered h-24"
                placeholder="Recipe details"
              ></textarea>
            </label>

            {/* Image */}
            <input
              {...register("image")}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
            {/* Submit btn */}
            <button className="flex items-center gap-1 btn bg-[#835D23] rounded-none">
              <input type="submit" value="Update Menu Item" />
              <FaUtensils />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
