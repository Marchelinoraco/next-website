"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Config from "@/app/config/config";

const BlogItem = ({ blog }) => {
  const { judul_berita, tanggal_berita, gambar, id } = blog;

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="animate_top rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
      >
        <Link
          href={`/berita-pemuda`}
          className="relative block aspect-[368/239]"
        >
          <Image
            src={`${Config.ipPUBLIC}/images/${gambar}`}
            alt={judul_berita}
            fill
          />
        </Link>

        <div className="px-4">
          <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
            <Link href={`/berita-pemuda/${judul_berita}`}>
              {`${judul_berita ? judul_berita.slice(0, 40) : "Judul tidak tersedia"}...`}
            </Link>
          </h3>
          <p className="text-sm text-gray-500">{tanggal_berita}</p>
        </div>
      </motion.div>
    </>
  );
};

export default BlogItem;
