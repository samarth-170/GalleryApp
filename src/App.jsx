import axios from 'axios'
import { useEffect, useState } from 'react'
const App = () => {
  const [data, setData] = useState([])
  const [index, setIndex] = useState(1)
  useEffect(() => {
    getData()
  }, [index])
  const previous = () => {
    if (index > 1) {
      setIndex(index - 1)
    }
  }
  const next = () => {

    setIndex(index + 1)
  }
  const getData = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=30`)
    setData(response.data)
    console.log(response.data)
  }
  let printUserData = "Loading..."
  if (data.length > 0) {
    printUserData = data.map(function (ele, idx) {
      return <div key={idx} className='rounded-2xl h-50 w-55 '>
        <img src={ele.download_url} className='h-full w-full rounded-2xl object-cover' />
        <h1 className='mt-1'>{idx + 1} {ele.author}</h1>
      </div>
    })
  }
  return (
    <div className="bg-black text-white h-screen overflow-auto scrollbar-hide">
      <div className='flex flex-wrap gap-10 p-10 justify-center items-center h-[88%] overflow-auto hide-scrollbar'>{printUserData}</div>
      <div className='flex justify-center items-center gap-10'>
        <button onClick={function () {
          previous()
        }}  style={{opacity: index>1? 1 : 0.5}}className='bg-amber-300 text-black px-6 py-2 rounded-xl outline-none font-semibold mt-5 cursor-pointer active:scale-95'>Prev</button>
        <span className='flex justify-center items-center mt-5'>Page {index}</span>
        <button onClick={function () {
          next()
        }} className='bg-amber-300 text-black px-6 py-2 rounded-xl outline-none font-semibold mt-5 cursor-pointer active:scale-95'>Next</button>
      </div>
    </div>
  )
}
export default App