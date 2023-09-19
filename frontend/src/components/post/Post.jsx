import { Link } from "react-router-dom";
import "./post.css";
import MarkdownEditor from "@uiw/react-markdown-editor";

export default function Post({blogData}) {



  return (
    <div className="post">
      <img
        className="postImg"
        src={'http://localhost:5000/'+blogData.image}
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              music
            </Link>
          </span>
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Life
            </Link>
          </span>
        </div>
        <span className="postTitle">
          <Link to={"/viewblog/"+blogData._id} className="link">
            {blogData.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
        {blogData.description}
      </p>

      <p>
      <MarkdownEditor.Markdown source={blogData.content} height="200px" />
      </p>
    </div>
  );
}
