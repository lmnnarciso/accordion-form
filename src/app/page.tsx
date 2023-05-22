"use client";
import { useState } from "react";
interface Item {
  top: string;
  bottom: string;
}

const Accordion = ({ data }: { data: Item[] }) => {
  const [accordionIndex, setAccordionIndex] = useState<number | null>(null);

  const handleAccordionIndex = (val: number) => {
    if (val === accordionIndex) {
      setAccordionIndex(null);
    } else {
      setAccordionIndex(val);
    }
  };

  return (
    // accordion
    <div>
      {/* item */}
      {data.map((item, idx) => (
        <div className="border border-white transition-all" key={idx}>
          {/* trigger */}
          <button
            className="flex justify-between w-full p-4 hover:bg-white/20 text-left"
            onClick={() => {
              handleAccordionIndex(idx);
            }}
          >
            <span>{item.top}</span>
            <span>
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                className={`transition-[transform] ${
                  idx === accordionIndex ? "rotate-180" : "rotate-0"
                }`}
                stroke="white"
                strokeWidth={2}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.16108 10.0731C4.45387 9.2649 5.02785 8 6.1018 8H17.898C18.972 8 19.5459 9.2649 18.8388 10.0731L13.3169 16.3838C12.6197 17.1806 11.3801 17.1806 10.6829 16.3838L5.16108 10.0731ZM6.65274 9.5L11.8118 15.396C11.9114 15.5099 12.0885 15.5099 12.1881 15.396L17.3471 9.5H6.65274Z"
                  fill="#212121"
                />
              </svg>
            </span>
          </button>
          {/* content */}
          <div
            className={`transition-[height, visibility] duration-500 min-h-0 
            ${idx === accordionIndex ? "visible min-h-8 p-4" : "invisible"}
            `}
          >
            <div
              className={` ${idx === accordionIndex ? "block" : "hidden"} 
            `}
            >
              {item.bottom}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [data, setData] = useState<Item[]>([]);
  return (
    <main className=" flex justify-center items-center h-full">
      <div className="max-w-6xl">
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              top: { value: string };
              bottom: { value: string };
            };
            const topVal = target.top.value;
            const bottomVal = target.bottom.value;

            target.top.value = "";
            target.bottom.value = "";

            setData([
              ...data,
              {
                top: topVal,
                bottom: bottomVal,
              },
            ]);
          }}
        >
          <label htmlFor="top-value">Top Value</label>
          <input type="text" className="text-black rounded-sm" name="top" />
          <label htmlFor="bottom-value">Bottom Value</label>
          <input type="text" className="text-black rounded-sm" name="bottom" />
          <button
            type="submit"
            className="rounded-sm hover:bg-white/25 border border-white my-2"
          >
            Submit
          </button>
        </form>
        <Accordion data={data} />
      </div>
    </main>
  );
}
