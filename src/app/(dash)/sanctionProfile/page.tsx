import Link from "next/link";
import SanctionNavProfile from "@/components/sanctionNavProfile";

export default function sanctionProfile() {
  return (
    <div>
      <div className="p-8">
        <Link href="/">
          <button className="bg-white my-2 mx-6 p-3 text-sm text-purple font-semibold rounded-[15px] flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="12"
              width="10"
              viewBox="0 0 320 512"
              className="inline mr-2"
            >
              <path
                fill="#000000"
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
              />
            </svg>
            Go back to attendify!
          </button>
        </Link>
      </div>

      <div className="flex justify-center">
        <h1 className="text-[36px] text-purple font-bold italic">Profile</h1>
      </div>

      <div
        className="main-container container w-7/12 bg-white rounded-[15px] h-[560px] mt-8 shadow-md p-10"
        style={{ boxShadow: "0 10px 20px rgba(65, 84, 241, 0.35)" }}
      >
        <div className="flex flex-row justify-between items-center "></div>
      </div>
      <SanctionNavProfile />
    </div>
  );
}
