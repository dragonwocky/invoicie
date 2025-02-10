import { type ComponentProps, type FC } from "react";

const Invoicie: FC<ComponentProps<"svg">> = (props) => (
  <svg
    width="128"
    height="128"
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="1" y="1" width="126" height="126" rx="28" fill="white" />
    <path
      d="M114 102.455V93.9091C114 89.1896 110.205 85.3636 105.524 85.3636H60.3217C55.6408 85.3636 51.8572 89.1926 51.9527 93.9112C52.2988 111 52.3409 111 31.3636 111H105.524C110.205 111 114 107.174 114 102.455Z"
      fill="url(#paint0_linear_388_7)"
    />
    <path
      d="M88.5734 17H31.3636V25.5455V34.0909V42.6364V111C52.3409 111 52.2988 111 51.9527 93.9112C51.8572 89.1926 55.6408 85.3636 60.3217 85.3636H97.049V25.5455C97.049 20.8259 93.2543 17 88.5734 17Z"
      fill="url(#paint1_linear_388_7)"
    />
    <path
      d="M13 25.5455V34.0909C13 38.8104 16.7946 42.6364 21.4755 42.6364C27.1259 42.6364 31.3636 39.7879 31.3636 34.0909V25.5455C31.3636 19.8485 27.1259 17 21.4755 17C16.7946 17 13 20.8259 13 25.5455Z"
      fill="url(#paint2_linear_388_7)"
    />
    <path
      d="M21.4755 17H88.5734M21.4755 17C16.7946 17 13 20.8259 13 25.5455V34.0909C13 38.8104 16.7946 42.6364 21.4755 42.6364M21.4755 17H31.3636M21.4755 17C27.1259 17 31.3636 19.8485 31.3636 25.5455M88.5734 17C93.2543 17 97.049 20.8259 97.049 25.5455V85.3636H60.3217M88.5734 17H31.3636M21.4755 42.6364C27.1259 42.6364 31.3636 39.7879 31.3636 34.0909M21.4755 42.6364L31.3636 42.6364M31.3636 111H105.524C110.205 111 114 107.174 114 102.455V93.9091C114 89.1896 110.205 85.3636 105.524 85.3636H60.3217M31.3636 111C52.3409 111 52.2988 111 51.9527 93.9112C51.8572 89.1926 55.6408 85.3636 60.3217 85.3636M31.3636 111V42.6364M31.3636 17V25.5455M51.9527 62.5757H77.979M51.9527 42.6364H77.979M31.3636 34.0909V25.5455M31.3636 34.0909V42.6364"
      stroke="black"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_388_7"
        x1="63.5"
        y1="17"
        x2="63.5"
        y2="111"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E11D48" />
        <stop offset="1" stopColor="#7B1027" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_388_7"
        x1="63.5"
        y1="17"
        x2="63.5"
        y2="111"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E11D48" />
        <stop offset="1" stopColor="#7B1027" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_388_7"
        x1="63.5"
        y1="17"
        x2="63.5"
        y2="111"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E11D48" />
        <stop offset="1" stopColor="#7B1027" />
      </linearGradient>
    </defs>
  </svg>
);

export { Invoicie };
