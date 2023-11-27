import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
    return (
        <div className="fixed top-50 left-10 w-[300px] h-[809px] px-5 pt-5 pb-[729px] bg-white rounded-tr-[40px] shadow flex-col justify-start items-center inline-flex">
           {/* ... ATTENDANCE ... */}
            <div className="flex-col justify-start items-start inline-flex">
                <div>
                    <Link
                        href="/"
                        className="w-[260px] h-11 p-2.5 bg-white-50 rounded justify-start items-center gap-2 inline-flex hover:bg-slate-200"
                    >
                        <div className="w-6 h-6 relative">
                            <Image
                                src="/images/lucide_file-spreadsheet.png"
                                alt="Spreadsheet"
                                width={40}
                                height={50}
                                className="w-4 h-5 left-[4px] top-[2px] absolute"
                            />
                        </div>
                        <div className="text-indigo-600 text-[15px] font-semibold font-['Open Sans'] leading-snug">
                            Attendance
                        </div>
                    </Link>
                    <div className="w-[260px] h-[5px] relative bg-white rounded"></div>
                </div>
            </div>

         {/* ... REPORT ... */}
            <div className="flex-col justify-start items-start inline-flex">
                
                    <Link href = "/"className="w-[260px] h-11 p-2.5 bg-white-50 rounded justify-start items-center gap-2 inline-flex hover:bg-slate-200">
                        <div className="w-6 h-6 relative">
                            <Image
                                src="/images/carbon_report.png"
                                alt="Report"
                                width={60}
                                height={60}
                                className="w-4 h-5 left-[4px] top-[2px] absolute"
                            />
                        </div>
                        <div className="text-indigo-600 text-[15px] font-semibold font-['Open Sans'] leading-snug">
                            Report
                        </div>
                    </Link>
            
                <div className="w-[260px] h-[300px] relative bg-white rounded"></div>
            </div>

            {/* ... LOGOUT ... */}
            <div className="flex-col justify-start items-start inline-flex">
                <div>
                    <Link href="/" className="w-[260px] h-11 p-2.5 bg-white-50 rounded justify-start items-center gap-2 inline-flex hover:bg-slate-200">
                        <div className="w-6 h-6 relative">
                            <Image
                                src="/images/icon-park-outline_logout.png"
                                alt="Spreadsheet"
                                width={40}
                                height={50}
                                className="w-4 h-5 left-[4px] top-[2px] absolute"
                            />
                        </div>
                        <div className="text-indigo-600 text-[15px] font-semibold font-['Open Sans'] leading-snug">
                            Logout
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
