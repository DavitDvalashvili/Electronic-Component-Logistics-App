/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bpg: ['"BPG Square Mtavruli"', "sans-serif"],
      },
      colors: {
        AntarcticDeep: "#343a40",
        Waiting: "#9d9d9d",
        SheetMetal: "#5f6163",
        shadowColor: "rgba(0,0,0, 0.1)",
        NorthAtlanticBreeze: "#337ab7",
      },
    },
  },
  plugins: [],
};
