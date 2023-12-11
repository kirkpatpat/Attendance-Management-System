
import Image from 'next/image';

const departments = ["SEAITE", "SABH", "SEAS", "SHAS"];
const events = ["Foundation", "Intramurals"];
const years = ["2023", "2024", "2025", "2026", "2027"];
const days: string[] = [];

for (let i = 1; i <= 31; i++) {
  days.push(i.toString());
}

const AttendanceImport = () => {

    return (
        <div>

            <div className="left-[346px] top-[99px] absolute text-indigo-600 text-[32px] font-semibold font-nunito leading-7">Attendance</div>

            <div className="left-[340px] top-[169px] absolute justify-start items-start inline-flex">
        <div className="w-[164px] h-[58px] relative bg-white rounded-md border border-gray-300">
          <div className="w-[191.40px] h-[49.30px] pl-[11.05px] pr-[89.35px] pt-[5px] pb-[13px] opacity-60 justify-start items-start flex">
            <label
              htmlFor="department"
              className="text-neutral-700 text-base font-normal font-['Open Sans'] leading-normal"
            >
              Department
            </label>
          </div>
          <div className="w-3 h-3 left-[139px] top-[23px] absolute">
            <Image
              src="/images/dropdown.png"
              alt="dropdown"
              width={30}
              height={30}
            />
          </div>
          <div className="pr-[42px] left-[13px] top-[27px] absolute justify-start items-start inline-flex">
            <select
              id="department"
              className="text-neutral-800 text-base font-normal font-open-sans leading-tight w-full h-full border-none outline-none bg-transparent"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>




      <div className="left-[528px] top-[169px] absolute justify-start items-start inline-flex">
        <div className="w-[164px] h-[58px] relative bg-white rounded-md border border-gray-300">
          <div className="w-[142.40px] pl-[11.05px] pr-[89.35px] pt-[5px] pb-[13px] opacity-60 justify-start items-start flex">
            <label
              htmlFor="event"
              className="text-neutral-700 text-base font-normal font-['Open Sans'] leading-normal"
            >
              Event
            </label>
          </div>
          <div className="w-3 h-3 left-[139px] top-[23px] absolute">
            <Image
              src="/images/dropdown.png"
              alt="dropdown"
              width={30}
              height={30}
            />
          </div>
          <div className="pr-[42px] left-[13px] top-[27px] absolute justify-start items-start inline-flex">
            <select
              id="event"
              className="text-neutral-800 text-base font-normal font-open-sans leading-tight w-full h-full border-none outline-none bg-transparent"
            >
              {events.map((event) => (
                <option key={event} value={event}>
                  {event}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>



      <div className="left-[716px] top-[169px] absolute justify-start items-start inline-flex">
        <div className="w-[164px] h-[58px] relative bg-white rounded-md border border-gray-300">
          <div className="pl-[11.05px] pr-[89.35px] pt-[5px] pb-[13px] opacity-60 justify-start items-start flex">
            <label
              htmlFor="year"
              className="w-9 text-neutral-700 text-base font-normal font-['Open Sans'] leading-normal"
            >
              Year
            </label>
          </div>
          <div className="w-3 h-3 left-[139px] top-[23px] absolute">
            <Image
              src="/images/dropdown.png"
              alt="dropdown"
              width={30}
              height={30}
            />
          </div>
          <div className="pr-[42px] left-[13px] top-[27px] absolute justify-start items-start inline-flex">
            <select
              id="year"
              className="text-neutral-800 text-base font-normal font-open-sans leading-tight w-full h-full border-none outline-none bg-transparent"
            >
              {years.map((years) => (
                <option key={years} value={years}>
                  {years}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>




<div className="left-[904px] top-[172px] absolute justify-start items-start inline-flex">
<div className="w-[164px] h-[58px] relative bg-white rounded-md border border-gray-300">
  <div className="pl-[11.05px] pr-[89.35px] pt-[5px] pb-[13px] opacity-60 justify-start items-start flex">
    <label
      htmlFor="day"
      className="w-9 text-neutral-700 text-base font-normal font-['Open Sans'] leading-normal"
    >
      Day
    </label>
  </div>
  <div className="w-3 h-3 left-[139px] top-[23px] absolute">
    <Image
      src="/images/dropdown.png"
      alt="dropdown"
      width={30}
      height={30}
    />
  </div>
  <div className="pr-[42px] left-[13px] top-[27px] absolute justify-start items-start inline-flex">
    <select
      id="day"
      className="text-neutral-800 text-base font-normal font-open-sans leading-tight w-full h-full border-none outline-none bg-transparent"
    >
      {days.map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </select>
  </div>
</div>
</div>

        
            <div className="w-[1176px] h-7 left-[340px] top-[256px] absolute flex items-center">
  <div className="w-[1136px] h-7 bg-white rounded-md border border-black flex items-center">
    <input
      type="text"
      placeholder="Search..."
      className="w-full h-full border-none outline-none bg-transparent pl-3"
    />
  </div>
  <Image
    src="/images/searchbar.png"
    alt="searchbar"
    width={40}
    height={40}
    className="ml-2"
  />
</div>

<div className="left-[371px] top-[257px] absolute text-black text-xs font-light font-nunito leading-relaxed"></div>



<div className="w-[171px] h-[37px] p-2.5 left-[346px] top-[302px] absolute bg-blue-700 rounded-md justify-center items-center gap-2.5 inline-flex">
        <button
         
          className="text-white text-xs font-bold font-inter"
        >
          TIME-IN
        </button>
      </div>

      <div className="w-[171px] h-[37px] p-2.5 left-[532px] top-[302px] absolute bg-blue-700 rounded-md justify-center items-center gap-2.5 inline-flex">
        <button
        
          className="text-white text-xs font-bold font-inter"
        >
          TIME-OUT
        </button>
      </div>

      <div className="left-[640px] top-[302px] absolute">
        <div className="text-black text-xs font-light font-nunito leading-relaxed">
         
        </div>
        <div className="text-black text-xs font-light font-nunito leading-relaxed mt-2">
          
        </div>
      </div>

        </div>
    );
}

export default AttendanceImport;
