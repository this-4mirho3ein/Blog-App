import { Route, Routes } from "react-router-dom";
import PostForm from "./Components/PostForm";
import { Container } from "react-bootstrap";
import { useLocalStorage } from "./hooks/useLocalStorage";
import AddPost from "./Components/AddPost";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import PostList from "./Components/PostList";
import PostLayout from "./Components/PostLayout";
import Post from "./Components/Post";
import EditPost from "./Components/EditPost";

export type Post = {
  id: string;
} & PostData;

export type RawPosts = {
  id: string;
} & RawPostData;

export type RawPostData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type PostData = {
  title: string;
  markdown: string;
  tags: Tags[];
};

export type Tags = {
  id: string;
  label: string;
};

function App() {
  const [posts, setPosts] = useLocalStorage<RawPosts[]>("POSTS", []);
  const [tags, setTags] = useLocalStorage<Tags[]>("TAGS", []);

  const postWithTags = useMemo(() => {
    return posts.map((item) => {
      return {
        ...item,
        tags: tags.filter((tag) => item.tagIds.includes(tag.id)),
      };
    });
  }, [posts, tags]);

  function onCreatePost({ tags, ...data }: PostData) {
    setPosts((prevPosts) => {
      return [
        ...prevPosts,
        { ...data, id: uuidV4(), tagIds: tags.map((item) => item.id) },
      ];
    });
  }

  function onUpdatePost(id: string, { tags, ...data }: PostData) {
    setPosts((prevPosts) => {
      return prevPosts.map((item) => {
        if (item.id === id) {
          return { ...item, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return item;
        }
      });
    });
  }

  function onDeletePost(id: string) {
    setPosts((prevPosts) => {
      return prevPosts.filter((item) => item.id !== id);
    });
  }

  function addTag(tag: Tags) {
    setTags((prev) => [...prev, tag]);
  }

  function updateTag(id:string , label:string) {
    setTags((prevTags)=>{
      return prevTags.map((tag)=>{
        if (tag.id === id) {
          return {...tag , label}
        }else{
          return tag 
        }
      })
    })
  }

  function deleteTag(id : string ) {
    setTags((prevTags)=>{
      return prevTags.filter((tag)=>tag.id !== id)
    })
  }
  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={
            <PostList
              posts={postWithTags}
              availabelTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/add"
          element={
            <AddPost
              onSubmit={onCreatePost}
              onAddTag={addTag}
              availabelTags={tags}
            />
          }
        />
        <Route path="/:id" element={<PostLayout posts={postWithTags} />}>
          <Route index element={<Post onDelete={onDeletePost} />} />
          <Route
            path="edit"
            element={
              <EditPost
                onSubmit={onUpdatePost}
                onAddTag={addTag}
                availabelTags={tags}
              />
            }
          />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
