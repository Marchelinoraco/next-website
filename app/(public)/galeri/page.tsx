"use client";
import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import BlogData from "@/components/Blog/blogData";

import { useState, useEffect } from "react";
import Config from "@/app/config/config";
import axios from "axios";

const NewsPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fungsi untuk berpindah ke slide berikutnya
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BlogData.length);
  };
  // Mengatur interval untuk pergantian slide otomatis
  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000); // 5000 ms = 5 detik

    // Bersihkan interval saat komponen unmount
    return () => clearInterval(intervalId);
  }, []);

  const [galeris, setGaleri] = useState([]);
  const getGaleri = async () => {
    try {
      const response = await axios.get(`${Config.ipPUBLIC}/galeri`);
      setGaleri(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGaleri();
  }, []);

  return (
    <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
      <div className="container mx-auto">
        {" "}
        {/* {Galeri} */}
        <div className="mx-auto max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <h1 className="text-center">KEPEMUDAAN</h1>
          <div className="relative h-[180px] w-full overflow-hidden min-[320px]:h-[200px] min-[350px]:h-[220px] min-[400px]:h-[240px] min-[430px]:h-[250px] min-[500px]:h-[270px] min-[580px]:h-[300px] sm:h-[400px] md:h-[450px]">
            {galeris.map((image, index) => (
              <div
                key={index}
                className={`absolute h-full w-full transition-opacity duration-1000 ease-in-out ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  backgroundImage: `url(${`${Config.ipPUBLIC}/galeri/${image.gambar}`})`,
                  backgroundSize: "cover", // Memastikan gambar menutupi seluruh elemen
                  backgroundPosition: "center", // Memastikan gambar berada di tengah elemen
                  backgroundRepeat: "no-repeat", // Mencegah gambar diulang
                  minHeight: "100%", // Memastikan tinggi minimum
                }}
              >
                {/* Optional overlay */}
                <div className=""></div>
              </div>
            ))}
          </div>
        </div>
        <div className="container mx-auto my-10 grid grid-cols-1 place-items-center min-[570px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:mt-28 lg:grid-cols-3 xl:grid-cols-3">
          {galeris.map((galeriItem) => (
            <div key={galeriItem.id} className="avatar my-4">
              <div className="w-[200px] rounded-xl shadow-lg min-[360px]:w-[250px] sm:w-64 md:w-72 lg:w-[300px] xl:w-[350px]">
                <img
                  src={`${Config.ipPUBLIC}/galeri/${galeriItem.gambar}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        {/* {Galeri END} */}
      </div>
    </section>
  );
};

export default NewsPage;
