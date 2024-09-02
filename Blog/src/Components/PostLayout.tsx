import React from 'react'
import { Post } from '../App'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'

type PostLayoutProps = {
    posts : Post[]
}

const PostLayout = ({posts} : PostLayoutProps) => {
    const {id} = useParams()

    const post = posts.find((item)=>item.id === id)

    if (post == null) return <Navigate to={'/'} replace/>

    return <Outlet context={post}/>
}

export function usePost(){
    return useOutletContext<Post>()
}

export default PostLayout