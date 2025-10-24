import React, {JSX} from "react";
import { motion } from "framer-motion";
import { GiCakeSlice, GiStairsCake, GiSlicedBread } from "react-icons/gi";
import { FaShapes } from "react-icons/fa";
import { FiSquare, FiLayers } from "react-icons/fi";
import { LuLayers2, LuLayers3 } from "react-icons/lu";
import { IoIosResize } from "react-icons/io";
import { IoSquare, IoHeartSharp } from "react-icons/io5";
import { MdCircle } from "react-icons/md";
import { BsCake } from "react-icons/bs";
import { TiSortAlphabetically } from "react-icons/ti";

interface Option {
  name: string;
  icon?: JSX.Element;
}

interface CakeBaseProps {
  selections: Record<string, string | string[]>;
  handleSelect: (category: string, value: string) => void;
}

const CakeBase: React.FC<CakeBaseProps> = ({ selections, handleSelect }) => {
  const cakeTypes: Option[] = [
    { name: "Bánh Kem Truyền Thống", icon: <GiCakeSlice className="text-pink-500 text-4xl" /> },
    { name: "Bánh Mousse", icon: <GiSlicedBread className="text-purple-500 text-4xl" /> },
    { name: "Bánh Entremet", icon: <GiCakeSlice className="text-red-400 text-4xl rotate-45" /> },
  ];

  const cakeSizes: Option[] = [
    { name: "Size S (4-6 người)", icon: <FiSquare className="text-gray-400 text-3xl" /> },
    { name: "Size M (8-10 người)", icon: <FiSquare className="text-gray-500 text-4xl" /> },
    { name: "Size L (12-15 người)", icon: <FiSquare className="text-gray-700 text-5xl" /> },
    { name: "Size XL (>25cm)", icon: <FiSquare className="text-gray-800 text-6xl" /> },
  ];

  const cakeLayers: Option[] = [
    { name: "2 tầng", icon: <LuLayers2 className="text-gray-600 text-4xl" /> },
    { name: "3 tầng", icon: <LuLayers3 className="text-gray-700 text-5xl" /> },
  ];

  const cakeShapes: Option[] = [
    { name: "Tròn", icon: <MdCircle className="text-blue-400 text-4xl" /> },
    { name: "Vuông", icon: <IoSquare className="text-green-400 text-4xl" /> },
    { name: "Trái Tim", icon: <IoHeartSharp className="text-pink-400 text-4xl" /> },
    { name: "Số / Chữ cái", icon: <TiSortAlphabetically className="text-indigo-400 text-4xl" /> },
  ];

  const renderOptions = (title: string, icon: JSX.Element, items: Option[], layout: "row" | "grid" = "grid") => (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <span className="mr-2 text-pink-500">{icon}</span> {title}
      </h3>
      <div
        className={
          layout === "row"
            ? "flex justify-center flex-wrap gap-6"
            : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        }
      >
        {items.map((item) => (
          <motion.button
            key={item.name}
            onClick={() => handleSelect(title, item.name)}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl shadow-md transition duration-200 ${
              selections[title] === item.name
                ? "bg-pink-100 ring-2 ring-pink-400 scale-105"
                : "hover:bg-gray-100"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.icon}
            <span className="mt-2 text-gray-700 text-sm font-medium text-center">{item.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      key="cake-base"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex  justify-center items-center">
        <BsCake className="text-pink-500 text-3xl mr-3" /> Bước 1: Chọn Nền Tảng Bánh
      </h2>

      {renderOptions("Loại Bánh", <GiCakeSlice />, cakeTypes, "row")}
      {renderOptions("Kích Thước", <IoIosResize />, cakeSizes, "row")}
      {renderOptions("Tầng Bánh", <GiStairsCake />, cakeLayers, "row")}
      {renderOptions("Hình Dáng", <FaShapes />, cakeShapes)}
    </motion.div>
  );
};

export default CakeBase;
