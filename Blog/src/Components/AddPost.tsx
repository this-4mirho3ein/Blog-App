import { PostData, Tags  } from '../App'
import PostForm from './PostForm'

type AddPostProps = {
  onSubmit : (data : PostData) => void
  onAddTag : (tag : Tags) => void
  availabelTags : Tags[]
}

const AddPost = ({onSubmit , onAddTag , availabelTags} : AddPostProps) => {
  return (
    <div>
      <h2 className='mb-4'>افزودن پست</h2>
      <PostForm onSubmit={onSubmit} onAddTag={onAddTag} availabelTags={availabelTags}/>
    </div>
  )
}

export default AddPost