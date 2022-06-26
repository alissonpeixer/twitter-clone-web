import { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/outline'
import { useFormik } from 'formik'
import axios from 'axios'
import avatar from './avatar.png'


const MAX_TWEET_CHAR = 140

function userInfo() {
  const userObjectInfo = localStorage.getItem('user');
  const userInfo = JSON.parse(userObjectInfo);
  var valide = true

  if (userObjectInfo === null) {
      return valide = false
  }



  return{
      infoUser: userInfo.userInfo,
      token: userInfo.userInfo.token
  }

}






function Like(){
 
  document.addEventListener('click', e =>{
    const el = e.target
  
    if(el.classList.contains('like')){
      SendLike(el)
      async function SendLike(el)  {

       const res = await axios({
          method: 'post',
          url: `${import.meta.env.VITE_API_HOST}/like`,
          headers: {
            'authorization': `Bearer ${userInfo().token}`
          },
          data: {
            userlikeId: userInfo().infoUser.id,
            likeId: el.classList[0]
          },
        })
        
        console.log(res.data.likes)
   
        return
      } 
    }
  })

}



function TweetForm({ loggedInUser, onSuccess }) {

  const formik = useFormik({
    onSubmit: async (values, form) => {
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/post`,
        headers: {
          'authorization': `Bearer ${loggedInUser}`
        },
        data: {
          text: values.text
        },
      })

      form.setFieldValue('text', '')
      onSuccess()
    },
    initialValues: {
      text: ''
    }
  })



  return (
    <div className="border-b border-silver p-4 space-y-6">
      <div className="flex space-x-5">
        <img src={avatar} className="w-7" />
        <h1 className="font-bold text-xl">Página Inicial</h1>
      </div>

      <form className="pl-12 text-lg flex flex-col" onSubmit={formik.handleSubmit}>
        <textarea
          name="text"
          value={formik.values.text}
          placeholder="O que está acontecendo?"
          className="bg-transparent outline-none disabled:opacity-50"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
        />

        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{formik.values.text.length}</span> / <span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
          </span>
          <button
            type="submit"
            className="bg-birdBlue  px-5 py-2 rounded-full disabled:opacity-20"
            disabled={formik.values.text.length > MAX_TWEET_CHAR || formik.isSubmitting}
          >
          <span className='text-white'>Enviar</span>
          </button>
        </div>
      </form>
    </div>
  )
}






//aqui estou
function Tweet({ name, surname, username, avatar, children, likeId,likes }) {
  

  

  return (
    <>
  
      <div className="flex space-x-3 p-4 border-b border-silver" >
        <div>
          <img src={avatar} />
        </div>
        <div className="space-y-2">
          <span className="font-bold text-sm">{name}</span>{' '}
          <span className="font-bold text-sm">{surname}</span>{' '}
          <span className="text-sm text-silver">@{username}</span>

          <p className=' w-60 break-words '>{children}</p>

          <div >
            <span className={`flex space-x-1 text-silver text-sm items-center pt-2`} >
    
              <div onClick={Like}>
                <button type="button" className='flex flex-row' >
                      <HeartIcon className={`${likeId} w-6 stroke-1 like cursor-pointer `}/>
                      <div className='pl-2 pt-1'>{likes}</div>
                  </button>
              </div>        

            </span>
          </div>

        </div>

      </div>

    </>
    
  )
}



// front
export function Home({ loggedInUser }) {
  


  const [data, setData] = useState([])

  async function getData() {
    const resPost = await axios.get(`${import.meta.env.VITE_API_HOST}/post`, {
      headers: {
        'authorization': `Bearer ${loggedInUser}`
      }
    })

    .catch(function (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('user');
        location.reload();

      }
    });

    setData(resPost.data);

  };
  useEffect(() => {
    getData()
  }, [])



  return (
    <>
      <div className='flex flex-row '>
          {/* <div className=' w-[40vh] flex flex-row-revers bg-richBlack'>
           
                <div>
                  <button
                  type="submit"
  
                  className="bg-birdBlue px-5 py-2 rounded-full logout disabled:opacity-50" 
                >
                  Sair
                </button>
                </div>
       
          </div> */}
          <div className='flex-1  w-auto bg-richBlack'>
            <TweetForm loggedInUser={loggedInUser} onSuccess={getData} />
            <div className='flex flex-col-reverse  max-w-auto'>
              {data.length && 
                  data.map(tweet => (
                  <Tweet key={tweet.postId}  likeId={tweet.postlikes.likeId} likes={tweet.postlikes.likes}   name={tweet.user.name} surname={tweet.user.surname}   username={tweet.user.username} avatar={avatar}  >
                  <div>
                    {tweet.text}
                  </div>
                </Tweet>
                ))}
              
            </div>
          </div>
      </div>
    </>
  )
}
