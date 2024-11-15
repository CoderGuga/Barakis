import { useState } from "react";
import BlogList from "./blogList"

const Blog = () => {
    const [blogs, setBlogs] = useState([
        { title: "first blog", body: "hello everybody", author: "me", id:1},
        { title: "second blog", body: "hello everybody", author: "not me", id: 2}
    ])
    
const handleDelete = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id)
    setBlogs(newBlogs)
}

    return(
        <div className="blogs">
            <BlogList blogs={blogs} title="all blogs" handleDelete={handleDelete} />
        </div>
    )
}

export default Blog