import { useState } from "react";
import { useHistory } from "react-router-dom"

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('morio');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const blog = {
            title,
            body,
            author
        };
        setIsPending(true);
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(blog),
        })
        .then(() => {
            console.log("New blog added.")
        })
        .finally(() => {
           setIsPending(false);
           // history.go(-1);
           history.push('/');
        });

    }

    return ( 
        <div className="create">
            <h2>Add New Blog</h2>
             <form onSubmit={handleSubmit}>
                <label >Blog title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="Enter title"
                />
                <label >Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e)=>setBody(e.target.value)}
                ></textarea>
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e)=>setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yashi">yashi</option>
                </select>
                { !isPending && <button disabled={isPending}>Add Blog</button>}
             </form>
        </div>
     );
}
 
export default Create;