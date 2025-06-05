// import  { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { Box } from "@mui/material";

const data = [
  { date: "مايو ٥", series1: 80, series2: 100 },
  { date: "مايو ٦", series1: 70, series2: 130 },
  { date: "مايو ٧", series1: 120, series2: 300 },
  { date: "مايو ٨", series1: 160, series2: 350 },
  { date: "مايو ٩", series1: 90, series2: 260 },
  { date: "مايو ١٠", series1: 100, series2: 220 },
  { date: "مايو ١١", series1: 110, series2: 200 },
];

export const ChartCard = () => {
//   const [period, setPeriod] = useState("day");

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 4,
        p: 2,
        direction: "rtl",
        boxShadow: 3,
        maxWidth: 700,
        mx: "auto"
      }}
    >
      <ResponsiveContainer width="100%" height={210}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00C49F" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFBB28" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#FFBB28" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="series2"
            stroke="#00C49F"
            fillOpacity={1}
            fill="url(#color1)"
            strokeWidth={3}
          />
          <Area
            type="monotone"
            dataKey="series1"
            stroke="#FFBB28"
            fillOpacity={1}
            fill="url(#color2)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};
