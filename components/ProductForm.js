import { UploadIcon } from "@/public/icons/icons";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import Image from "next/image";

function ProductForm({
  _id,
  productName: existingName,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  properties: assignedProperties,
}) {
  const [productName, setProductName] = useState(existingName || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  async function productHandler(e) {
    e.preventDefault();
    const data = {
      productName,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };

    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    router.push("/products");
  }

  async function UploadImages(event) {
    const files = event.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function productPropertyHandler(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let CategoryInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...CategoryInfo.properties);
    while (CategoryInfo?.parent?._id) {
      const parentCategory = categories.find(
        ({ _id }) => _id === CategoryInfo?.parent?._id
      );
      propertiesToFill.push(...parentCategory.properties);
      CategoryInfo = parentCategory;
    }
  }

  return (
    <form onSubmit={productHandler}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <option key={category.categoryName} value={category._id}>
                {category.categoryName}
              </option>
            );
          })}
      </select>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div className="flex gap-1" key={p.name}>
            <div>{p.name}</div>
            <select
              value={productProperties[p.name]}
              onChange={(e) => productPropertyHandler(p.name, e.target.value)}
              className="w-24"
            >
              {p.values.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
        ))}
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          className="flex flex-wrap gap-1"
          list={images}
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link) => {
              return (
                <div key={link} className="h-24 inline-block">
                  <img src={link} alt="product" className="rounded-lg" />
                </div>
              );
            })}
        </ReactSortable>

        {isUploading && (
          <div className="h-24 flex items-center rounded-lg ">
            <Spinner />
          </div>
        )}
        <label className="h-24 w-24 cursor-pointer flex flex-col items-center justify-center text-gray-600 bg-gray-200 rounded-lg">
          <UploadIcon /> Upload
          <input onChange={UploadImages} type="file" className="hidden"></input>
        </label>
      </div>
      <label>Description</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price (USD)</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}

export default ProductForm;
