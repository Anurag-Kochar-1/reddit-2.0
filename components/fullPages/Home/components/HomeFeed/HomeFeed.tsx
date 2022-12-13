import React, {useState, useEffect} from 'react'
import allSubreddits from 'next/link'
import {doc, getDoc , collection, query , where, getDocs} from "firebase/firestore"
import { auth, db } from '../../../../../firebaseConfig'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import Post from '../../../../globalComponents/Post/Post'
import { RootState } from '../../../../../redux/store'

const HomeFeed = (  ) => {
  const [user] = useAuthState(auth)
  const [allSubreddits, setAllSubdreddits] = useState<any[]>([])
  const [allPosts, setAllPosts] = useState<any>([])
  const userDetailsRedux = useSelector((state:any) => state.user)
  const allPostsDataRedux = useSelector((state:any) => state.posts)

  const subredditCollectionRef = collection(db, "subreddits")
  const postCollectionRef = collection(db, 'posts')

  // const { allPostsData } = useSelector((state:RootState) => state.posts)
  
  const fetchingSubreddits = async () => {
    const subredditsCollection = await getDocs(subredditCollectionRef)
    setAllSubdreddits(subredditsCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
  }

  const fetchingPosts = async() => {
    const allPostsData = await getDocs(postCollectionRef)
    allPostsData.docs.forEach((post) => {
    })

    setAllPosts(allPostsData?.docs.map((doc) => ({ ...doc.data(), postID: doc.id })));
    
  }

  

  
  useEffect(() => {
    fetchingSubreddits()
    fetchingPosts()
  },[])

  return (
    <div 
    className='w-[100%] xl:w-[70%] h-[90vh] mb-[10vh] lg:mb-0 flex flex-col justify-start items-center bg-[#EDEFF1] overflow-x-hidden overflow-y-scroll '
    >
      <h1 className='text-xl text-center' onClick={() => console.log(userDetailsRedux)}> LOG userDetailsRedux  </h1>


      {allSubreddits && allSubreddits.map((subreddit) => {
        return (<Link href={`/place/${subreddit.id}`} key={subreddit.id}>
                    <h1 className='text-xl text-white' > {subreddit.subredditName} </h1>
                </Link> )
      })}

      {allPosts && allPosts.map((post:any, index:number) => (
        <Post key={index} at='homepage' post={post} />
      ))}



    </div>
  )
}

export default HomeFeed

