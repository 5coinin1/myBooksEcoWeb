// src/pages/custom/CakeDecoration.tsx
import React, {JSX} from "react";
import { motion } from "framer-motion";
import {
  GiFruitBowl,
  GiJellyBeans,
  GiHoneyJar,
  GiChocolateBar,
  GiFlowerPot,
  GiDrop,
  GiSpray,
} from "react-icons/gi";
import { FaPaintBrush, FaIceCream, FaCookieBite } from "react-icons/fa";
import { MdEmojiObjects } from "react-icons/md";
import { BsStars } from "react-icons/bs";

interface Option {
  name: string;
  icon: JSX.Element;
  color: string;
}

interface CakeDecorationProps {
  selections: Record<string, string | string[]>;
  handleSelect: (category: string, value: string) => void;
}

const CakeDecoration: React.FC<CakeDecorationProps> = ({
  selections,
  handleSelect,
}) => {
  const fillings: Option[] = [
    { name: "Không nhân", icon: <GiDrop className="text-gray-400" />, color: "bg-gray-100" },
    { name: "Mứt trái cây", icon: <GiJellyBeans className="text-pink-400" />, color: "bg-pink-50" },
    { name: "Kem", icon: <FaIceCream className="text-yellow-400" />, color: "bg-yellow-50" },
    { name: "Hạt (Óc chó, Hạnh nhân)", icon: <GiHoneyJar className="text-amber-700" />, color: "bg-amber-50" },
    { name: "Trái cây tươi", icon: <GiFruitBowl className="text-red-400" />, color: "bg-red-50" },
  ];

  const decorations: Option[] = [
    { name: "Tối giản (Minimalist)", icon: <BsStars className="text-gray-500" />, color: "bg-gray-50" },
    { name: "Vẽ hình / Họa tiết", icon: <FaPaintBrush className="text-purple-500" />, color: "bg-purple-50" },
    { name: "Hoa (kem / tươi)", icon: <GiFlowerPot className="text-pink-500" />, color: "bg-pink-50" },
    { name: "Drip Cake", icon: <GiHoneyJar className="text-amber-500" />, color: "bg-amber-50" },
    { name: "Rải / Phủ", icon: <GiSpray className="text-blue-500" />, color: "bg-blue-50" },
    { name: "Trái cây tươi trang trí", icon: <GiFruitBowl className="text-red-400" />, color: "bg-red-50" },
    { name: "Bánh kẹo (Macaron, Oreo...)", icon: <FaCookieBite className="text-yellow-500" />, color: "bg-yellow-50" },
    { name: "Topper / Mô hình", icon: <MdEmojiObjects className="text-green-500" />, color: "bg-green-50" },
    { name: "Chocolate tạo hình", icon: <GiChocolateBar className="text-brown-500" />, color: "bg-amber-100" },
  ];

  const renderOptionGroup = (title: string, options: Option[], category: string) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {options.map((item) => {
          const selected = selections[category]?.includes(item.name);
          return (
            <motion.button
              key={item.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(category, item.name)}
              animate={{
                border: selected ? `2px solid ${item.color.replace("bg-", "").replace("-50", "")}` : "1px solid transparent",
                boxShadow: selected
                  ? `0 0 12px rgba(0,0,0,0.15)`
                  : "none",
                scale: selected ? 1.03 : 1,
              }}
              className={`p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-2 text-gray-800 transition ${item.color} hover:shadow-md`}
            >
              <div className="text-3xl">{item.icon}</div>
              <p className="text-sm font-medium text-center">{item.name}</p>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      key="cake-decoration"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex justify-center items-center">
        🎀 Bước 3: Thêm Điểm Nhấn (Tùy chọn)
      </h2>

      {renderOptionGroup("Nhân / Mứt Giữa Các Lớp Bánh (Fillings)", fillings, "fillings")}
      {renderOptionGroup("Phong Cách Trang Trí & Toppings", decorations, "toppings")}
    </motion.div>
  );
};

export default CakeDecoration;
