import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

const MyImage = (props) => {
  return (
    <div>
      <Image
      loader={myLoader}
      src=" https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sketch_Logo.svg/1200px-Sketch_Logo.svg.png"
      alt="Picture of the author"
      width={500}
      height={500}
    /><h1>Login</h1>
    </div>
    
  )
}
export default MyImage;