'use client'
import Loading from '@/Components/Loading/Loading'
import PostCard from '@/Components/PostCard/PostCard'
import { useAppDispatch, useAppSelector } from '@/Hooks/store.hook'
import { getPostDetails } from '@/store/features/post.slice'
import { use, useEffect } from 'react'

export default function page({params}: {params: Promise<{postId:string}>}) {
    const {postId} = use(params) 
    const dispatch  = useAppDispatch()
    useEffect(()=>{
      dispatch(getPostDetails(postId))
    },[])
    
    let {postDetails} = useAppSelector((store)=>store.postReducer)
  return (
    <>
    {postDetails?<PostCard postInfo={postDetails} showAllComments={true}/> : <Loading/>}
    </>
  )
}
