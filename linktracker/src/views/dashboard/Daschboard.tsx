import { Header } from "../../components/Header"
export const Daschboard = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#faf0e6]">
        <Header />
        <div className="bg-beige p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-900">Your order history</h1>
        </div>
    </div>
  )
}
