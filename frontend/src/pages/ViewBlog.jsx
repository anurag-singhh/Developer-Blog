import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewBlog = () => {
  const [blogData, setBlogData] = useState(null);

  const { id } = useParams();

  const fetchBlogData = async () => {
    const res = await fetch("http://localhost:5000/blog/getbyid/" + id);

    const data = await res.json();

    console.log(data);
    setBlogData(data);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  const displayBlogData = () => {
    if (blogData !== null) {
      return (
        <div className="card ">
          <img
            style={{width: '100%'}}
            src={"http://localhost:5000/" + blogData.image}
          />
          <div className="card-body">
            <h3>{blogData.title}</h3>
            <p>{blogData.description}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="container ">{displayBlogData()}</div>
    </div>
  );
};

export default ViewBlog;
