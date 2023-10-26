import Layout from "@/components/Layout";
import { PenIcon, TrashIcon } from "@/public/icons/icons";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Layout>
      <Link href="/products/new">
        <button className="btn-primary">Add New Product</button>
      </Link>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Product Name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td> {product.productName} </td>
              <td>
                <Link href={`/products/edit/${product._id}`}>
                  <PenIcon /> Edit
                </Link>
                <Link href={`/products/delete/${product._id}`}>
                  <TrashIcon /> Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
