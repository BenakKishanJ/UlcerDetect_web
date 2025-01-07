import { Averia_Libre } from "next/font/google";

const averiaLibre = Averia_Libre({
    subsets: ["latin"], // Specify subsets as needed
    weight: ["400", "700"], // Add weights you need (e.g., normal and bold)
    style: ["normal", "italic"], // Add styles if needed
});

export default async function Home() {
  return (
    <div className="py-24 px-24 m-auto">
      <div className="bg-black rounded-3xl text-white shadow-2xl items-center flex flex-col h-[45rem] justify-center text-center">
        <p className="text-display-1 font-extrabold text-7xl mb-8 p-48">
          <em className={averiaLibre.className}>
            Let’s Get Started <br /> with Ulcer Detect
          </em>
        </p>
      </div>
    </div>
  );
}