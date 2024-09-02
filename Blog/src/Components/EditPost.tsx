import PostForm from "./PostForm";
import { PostData, Tags } from "../App";
import { usePost } from "./PostLayout";

type EditPostProps = {
  onSubmit: (id: string, data: PostData) => void;
  onAddTag: (tag: Tags) => void;
  availabelTags: Tags[];
};

const EditPost = ({ onSubmit, onAddTag, availabelTags }: EditPostProps) => {
  const post = usePost();

  return (
    <>
      <h2 className="mb-4">ویرایش پست</h2>
      <PostForm
        title={post.title}
        markdown={post.markdown}
        tags={post.tags}
        onSubmit={(data) => onSubmit(post.id, data)}
        onAddTag={onAddTag}
        availabelTags={availabelTags}
      />
    </>
  );
};

export default EditPost;
