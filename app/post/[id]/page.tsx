'use client'
import { useParams } from "next/navigation"
import React, { useEffect, useState } from 'react'
interface PostList{
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  count: number;
}

export default function Detail(){

  const params = useParams();
  // console.log(params)
  // post/[id]로 쓰는게 국룰
  const [post, setPost] = useState<PostList[]>([]);
//  state안쓰고 변수에 넣어도 됨. 계속 렌더링되는게 아니기 때문.
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const deletePost = async (e: number)=> {
    try{
      const res = await fetch(`/api/delete`, {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({id: e})
      });
      console.log(e)
      if(res.ok){
        const data = await res.json();
        console.log(data.message)
        alert('정상적으로 삭제되었습니다.');
        window.location.href="/";
      }else{
        const errorData = await res.json();
        console.log(errorData.error)
      }
    }catch(error){
      console.log(error)
    }
  } 

  useEffect(()=>{
    const fetchData = async () =>{
      // 배열의 마지막 값을 가지고 오는 방법 pop
      const res = await fetch(`/api/post/${params.id}`)
      const data = await res.json();
      // console.log(data)
      setPost(data.data)
      setIsLoading(false)
    }
    fetchData();
  },[params.id])

  return(
    <>   
    {isLoading && <Loading/>}
    <div className="flex bg-slate-300 m-20 p-4 border rounded-xl max-w-[500px] mx-auto">
      <div className="mx-auto">
      
      {
        post.length > 0 && (
          <>
          <div className="">
            <div className="">
              <p className="">작성자 : {post && post[0]?.author}</p>
              <p className="">제목 : {post && post[0]?.title}</p>
              <p className="">내용 : {post && post[0]?.content}</p>
            </div>
          </div>
          </>
        )
      }
      <button className="text-black mr-2 p-2 bg-blue-500 rounded mt-5">수정</button>  
      <button className='text-black p-2 bg-yellow-500 rounded' onClick={()=>deletePost(post[0].id)}>삭제</button>
      </div>
    </div>
    
    </>    
  )
}

function Loading(){
  return(
  <div className="w-full h-full bg-black/50 top-0 left-0 z-50">
      <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4">
        <svg width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <g transform="rotate(0 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#87ceeb`}>
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(30 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#87ceeb`}>
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(60 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#87ceeb`}>
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(90 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#87ceeb`}>
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(120 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#87ceeb`}>
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(150 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#87ceeb`}>
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(180 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#87ceeb`}>
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(210 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#87ceeb`}>
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(240 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#87ceeb`}>
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(270 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#87ceeb`}>
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(300 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#87ceeb`}>
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(330 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#87ceeb`}>
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
            </rect>
          </g>
        </svg>
      </div>
    </div>
)

}