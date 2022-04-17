import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { listProductCategories } from "../actions/productActions";
import { listTopSellers } from "../actions/userActions";
import { Link } from "react-router-dom";
import adtwo from "../adtwo.jpg";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listProductCategories());
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
      <div className="row-main">
        <div className="categories-list">
          <ul className="categories">
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <div className="category-item">
                  <li key={c}>
                    <Link to={`/search/category/${c}`}>{c}</Link>
                  </li>
                </div>
              ))
            )}
          </ul>
        </div>
        <div className="middle">
          <Carousel showArrows autoPlay showThumbs={false}>
            <div className="ads">
              <img src={adtwo} alt="ad2"></img>
            </div>
            <div className="ads">
              <img src={adtwo} alt="ad2"></img>
            </div>
            <div className="ads">
              <img src={adtwo} alt="ad2"></img>
            </div>
            <div className="ads">
              <img src={adtwo} alt="ad2"></img>
            </div>
          </Carousel>
        </div>
        <div className="right">
          <div className="right-item top">
            <img src={adtwo} alt="ad2"></img>
          </div>
          <div className="right-item bottom ad">
            <img src={adtwo} alt="ad2"></img>
          </div>
        </div>
      </div>
      <section className="row">
        <Link to={"/"} className="col-4 first">
          Link 1
        </Link>

        <Link to={"/"} className="col-4">
          Link 2
        </Link>

        <Link to={"/"} className="col-4">
          Link 3
        </Link>

        <Link to={"/"} className="col-4" id="last">
          Link 4
        </Link>
      </section>

      <div className="top-sellers">
        <h2>Top Sellers</h2>
        {loadingSellers ? (
          <LoadingBox></LoadingBox>
        ) : errorSellers ? (
          <MessageBox variant="danger">{errorSellers}</MessageBox>
        ) : (
          <>
            {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          </>
        )}
      </div>

      <h2>Featured Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
