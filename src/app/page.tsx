import Image from "next/image";

export default function Home() {
  return <div>
    <Image src='/images/tao.png' alt='Attendify' width={150} height={150} className='items-center mx-auto mt-20' />
    <h1 className="text-blue text-center mx-auto mt-10 text-4xl">University of Saint Louis Tuguegarao</h1>
  </div>
}
