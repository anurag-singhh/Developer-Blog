import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.css";

export default function Posts() {
  const [blogList, setBlogList] = useState([]);

  const fetchBlogData = async () => {
    try {
      const response = await fetch('http://localhost:5000/blog/getall');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setBlogList(data);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []); 

  return (
    <div className="posts">
      {blogList.map(blogData => (
        <Post key={blogData.id} blogData={blogData} />
      ))}
    </div>
  );
}
