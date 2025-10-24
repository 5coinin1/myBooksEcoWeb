// src/pages/custom/FlavorFrosting.tsx
import React from "react";
import { motion } from "framer-motion";
import { FiDroplet, FiFeather, FiLayers } from "react-icons/fi";
import { FaCheese } from "react-icons/fa6";

interface FlavorFrostingProps {
  selections: {
    base?: string;
    frosting?: string;
  };
  handleSelect: (category: "base" | "frosting", value: string) => void;
}

export default function FlavorFrosting({
  selections,
  handleSelect,
}: FlavorFrostingProps) {
  const baseFlavors = [
    {
      group: "Cơ bản",
      flavors: [
        { name: "Vani", color: "#f5deb3" },
        { name: "Sô-cô-la", color: "#5a3b1d" },
      ],
    },
    {
      group: "Phổ biến",
      flavors: [
        { name: "Red Velvet", color: "#a83232" },
        { name: "Trà xanh (Matcha)", color: "#6b8e23" },
        { name: "Cà phê (Mocha)", color: "#8b5a2b" },
      ],
    },
    {
      group: "Trái cây",
      flavors: [
        { name: "Chanh dây", color: "#f5c542" },
        { name: "Dâu", color: "#e85a5a" },
        { name: "Cam", color: "#ff9933" },
      ],
    },
    {
      group: "Đặc biệt",
      flavors: [
        { name: "Cà rốt", color: "#e67300" },
        { name: "Chuối", color: "#ffe066" },
        { name: "Khoai môn", color: "#b57edc" },
      ],
    },
  ];

  const frostings = [
    {
      name: "Kem bơ (Buttercream)",
      icon: <FiLayers className="h-6 w-6 text-yellow-600" />,
      description:
        "Ngọt, đứng form, dễ trang trí. Có nhiều biến thể: Thụy Sĩ, Hàn Quốc.",
      color: "bg-yellow-100 border-yellow-300",
    },
    {
      name: "Kem tươi (Whipping Cream)",
      icon: <FiFeather className="h-6 w-6 text-blue-500" />,
      description:
        "Nhẹ, tan trong miệng, ít ngọt. Khó giữ form ở nhiệt độ thường.",
      color: "bg-blue-50 border-blue-200",
    },
    {
      name: "Kem phô mai (Cream Cheese Frosting)",
      icon: <FaCheese className="h-6 w-6 text-orange-500" />,
      description:
        "Vị chua nhẹ, hợp với Red Velvet, Cà rốt. Mềm, dễ tan.",
      color: "bg-orange-50 border-orange-200",
    },
    {
      name: "Fondant",
      icon: <FiDroplet className="h-6 w-6 text-pink-600" />,
      description:
        "Lớp đường dẻo mịn, tạo hình đẹp nhưng rất ngọt, ít ai ăn lớp này.",
      color: "bg-pink-50 border-pink-200",
    },
  ];

  return (
    <div className="space-y-8">
      {/* CỐT BÁNH */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          🍞 Cốt Bánh (Base Flavor / Sponge)
        </h3>
        {baseFlavors.map((group) => (
          <div key={group.group} className="mb-5">
            <p className="text-sm font-medium text-gray-600 mb-2">
              {group.group}
            </p>
            <div className="flex flex-wrap gap-3">
              {group.flavors.map((flavor) => {
                const isSelected = selections.base === flavor.name;
                return (
                  <motion.button
                    key={flavor.name}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect("base", flavor.name)}
                    animate={{
                      border: isSelected
                        ? `3px solid ${flavor.color}`
                        : "1px solid transparent",
                      boxShadow: isSelected
                        ? `0 0 12px ${flavor.color}`
                        : "none",
                    }}
                    className="relative rounded-full px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none transition"
                    style={{
                      backgroundColor: flavor.color,
                      filter: isSelected ? "brightness(1.1)" : "none",
                    }}
                  >
                    {flavor.name}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* KEM PHỦ */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          🍰 Loại Kem Phủ Bên Ngoài (Frosting)
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {frostings.map((frost) => {
            const isSelected = selections.frosting === frost.name;
            return (
              <motion.div
                key={frost.name}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  borderColor: isSelected ? "#000" : "rgba(0,0,0,0.1)",
                  boxShadow: isSelected
                    ? "0 0 10px rgba(0,0,0,0.25)"
                    : "none",
                  scale: isSelected ? 1.02 : 1,
                }}
                onClick={() => handleSelect("frosting", frost.name)}
                className={`p-4 border rounded-2xl flex items-start space-x-3 cursor-pointer ${frost.color} transition`}
              >
                <div className="flex-shrink-0">{frost.icon}</div>
                <div>
                  <p className="font-medium text-gray-800">{frost.name}</p>
                  <p className="text-sm text-gray-600">{frost.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
