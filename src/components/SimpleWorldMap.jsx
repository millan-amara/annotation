import React from "react";
import { motion } from "framer-motion";
import worldMap from "/world.svg";

const locations = [
  { name: "Data", top: "60%", left: "55%" },
  { name: "Data", top: "48%", left: "50%" },
  { name: "Data", top: "50%", left: "60%" },
  { name: "Data", top: "60%", left: "60%" },
  { name: "Data", top: "35%", left: "53%" },
  { name: "Data", top: "45%", left: "62%" },
  { name: "Data", top: "68%", left: "55%" },
  { name: "Data", top: "69%", left: "58%" },
  { name: "Data", top: "45%", left: "45%" },
  { name: "Data", top: "42%", left: "25%" },
  { name: "Data", top: "57%", left: "32%" },
  { name: "Data", top: "24%", left: "22%" },
  { name: "Data", top: "28%", left: "62%" },
  { name: "Data", top: "20%", left: "66%" },
  { name: "Data", top: "34%", left: "78%" },
];

export default function SimpleWorldMap() {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <img
        src={worldMap}
        alt="World Map"
        className="w-full rounded-2xl"
      />

      {locations.map((loc, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: loc.top, left: loc.left }}
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            delay: i * 0.3,
          }}
        >
          <div
            title={loc.name}
            className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_3px_rgba(34,197,94,0.5)]"
          ></div>
        </motion.div>
      ))}
    </div>
  );
}
