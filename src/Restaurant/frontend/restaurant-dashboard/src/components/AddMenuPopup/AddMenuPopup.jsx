import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload } from "lucide-react";
import { createMenu } from "../../api/menuApi.js";
import { toast } from 'react-toastify';


export default function AddMenuModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      available: true
    }
  });

  const imageFile = watch("image");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);


  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      available: data.available,
      image: data.image[0] 
    };
    
    if (payload) {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("price", payload.price);
      formData.append("category", payload.category);
      formData.append("available", payload.available);
      formData.append("image", payload.image);

      createMenu(formData)
        .then((response) => {
          toast.success("Menu item added successfully");
          onClose();
        })
        .catch((error) => {
          toast.error("Failed to add menu item");
        });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal  */}
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl animate-scaleIn flex flex-col overflow-hidden">
        {/* Header - Fixed at top */}
        <div className="flex items-center justify-between p-6 border-b shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Add New Menu Item
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the details below
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable form area */}
        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Item Name *
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 focus:ring-orange-500/20 focus:border-orange-500"
                }`}
                placeholder="Enter item name"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                rows="3"
                {...register("description")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:outline-none focus:border-orange-500 transition"
                placeholder="Describe the menu item"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Price *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be greater than 0" }
                  })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
                    errors.price
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 focus:ring-orange-500/20 focus:border-orange-500"
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                {...register("category", {
                  required: "Category is required"
                })}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
                  errors.category
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 focus:ring-orange-500/20 focus:border-orange-500"
                }`}
              >
                <option value="">Select category</option>
                <option value="starter">Starter</option>
                <option value="main_course">Main Course</option>
                <option value="fast_food">Fast Food</option>
                <option value="snacks">Snacks</option>
                <option value="desserts">Desserts</option>
                <option value="beverages">Beverages</option>
                <option value="breakfast">Breakfast</option>
                <option value="combos">Combos</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Image *
              </label>

              <label
                className={`flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
                  errors.image
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 hover:border-orange-400 hover:bg-gray-50"
                }`}
              >
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <Upload className="w-8 h-8 text-white" />
                      <span className="ml-2 text-white text-sm">Change image</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload image
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", {
                    required: "Image is required"
                  })}
                  className="hidden"
                />
              </label>

              {errors.image && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium">Item Availability</p>
                <p className="text-sm text-gray-500">
                  Show item in menu
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("available")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            {/* Actions - Fixed at bottom */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-medium"
              >
                Add to Menu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}