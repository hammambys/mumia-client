import React from "react";
import { Link } from "react-router-dom";

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        {product.discount > 0 && (
          <div className="discount">-{product.discount}%</div>
        )}
        <div className="card-img">
          <img
            className="small"
            src={"https://drive.google.com/uc?export=view&id=" + product.image}
            alt={product.name}
          />
        </div>

        <div className="card-body">
          <p>{product.name}</p>
          {product.discount === 0 ? (
            <div className="new-price">{product.price}TND</div>
          ) : (
            <div>
              <div className="new-price">
                {Math.trunc(product.price * ((100 - product.discount) / 100))}
                TND
              </div>
              <div className="price">{product.price}TND</div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
