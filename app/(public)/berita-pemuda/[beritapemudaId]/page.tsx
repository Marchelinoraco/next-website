"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "@/app/config/config";
import { useParams } from "next/navigation";

const DetailNewsPage = () => {
  const [berita, setBerita] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getBeritaById = async (id) => {
      try {
        const response = await axios.get(`${Config.ipPUBLIC}/berita/${id}`);
        setBerita(response.data);
      } catch (error) {
        setError("Failed to fetch the news article.");
        console.error(error);
      }
    };

    if (id) {
      getBeritaById(id);
    }
  }, [id]);

  // Loading state
  if (!berita && !error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex-col">
        <div className="flex justify-center pb-10">
          <h1 className="mt-20 text-center text-lg min-[320px]:mx-auto sm:mx-24 sm:text-xl md:mx-40 md:text-2xl lg:mx-56 lg:text-3xl">
            {error}
          </h1>
        </div>
      </div>
    );
  }

  // Main content when data is loaded
  return (
    <section className="overflow-hidden pb-25 pt-45 lg:pb-32.5 lg:pt-50 xl:pb-37.5 xl:pt-55">
      <div className="flex justify-center pb-10">
        <h1 className="mt-20 text-center text-lg min-[320px]:mx-auto sm:mx-24 sm:text-xl md:mx-40 md:text-2xl lg:mx-56 lg:text-3xl">
          {berita?.judul_berita}
        </h1>
      </div>
      <hr className="mx-[10%]" />
      <div className="mx-[10%] md:mx-[15%] lg:mx-[20%]">
        <p className="mt-1 w-auto text-justify text-xs text-[#888888] sm:text-[16px]">
          Author: {berita?.nama_pembuat_berita}
        </p>
        <p className="mt-1 w-auto text-justify text-sm text-[#888888] sm:text-[16px]">
          {berita?.tanggal_berita}
        </p>
        {berita?.gambar && (
          <img
            className="w-[1250px] rounded-xl py-10 min-[319px]:mx-0"
            src={`${Config.ipPUBLIC}/images/${berita.gambar}`}
            alt={berita?.judul_berita}
          />
        )}
      </div>
      <div className="mx-[10%] pb-20 md:mx-[15%] lg:mx-[20%]">
        <p className="mx-auto mt-1 text-justify leading-normal min-[320px]:text-[10px] sm:text-sm md:text-lg">
          {berita?.isi_berita}
        </p>
      </div>
    </section>
  );
};

export default DetailNewsPage;
