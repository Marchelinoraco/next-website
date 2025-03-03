"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const Contact = () => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.success) {
      alert("Email berhasil dikirim!");
    } else {
      alert("Gagal mengirim email");
    }
  };

  return (
    <>
      <section id="support" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:p-15"
            >
              <h2 className="mb-15 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Kirim Laporan
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nama Lengkap"
                    required
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee"
                  />
                </div>

                <div className="mb-12.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subjek"
                    required
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Nomor HP"
                    required
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee"
                  />
                </div>

                <div className="mb-11.5 flex">
                  <textarea
                    name="message"
                    placeholder="Tulis Laporan..."
                    rows={4}
                    required
                    className="w-full border-b border-stroke bg-transparent focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee"
                  ></textarea>
                </div>

                <div className="flex flex-wrap items-center gap-4 xl:justify-between">
                  <div className="mb-4 flex items-center md:mb-0">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      required
                      className="peer sr-only"
                    />
                    <span className="group flex h-5 min-w-[20px] items-center justify-center rounded border-gray-300 bg-gray-100 text-blue-600 peer-checked:bg-primary dark:border-gray-600 dark:bg-gray-700">
                      <svg
                        className="opacity-0 peer-checked:group-[]:opacity-100"
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.707 0.793C9.895 0.98 10 1.235 10 1.5c0 .265-.105.52-.293.707L4.707 7.207A1 1 0 0 1 4 7.5c-.265 0-.52-.105-.707-.293L.293 4.207A1.003 1.003 0 0 1 .012 3.503c.002-.262.107-.513.293-.698a1.003 1.003 0 0 1 1.415 0L4 5.086l4.293-4.293A1.003 1.003 0 0 1 9 0.5c.265 0 .52.105.707.293z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <label
                      htmlFor="default-checkbox"
                      className="flex max-w-[425px] cursor-pointer select-none pl-5"
                    >
                      Saya setuju dengan ketentuan dan syarat.
                    </label>
                  </div>

                  <button
                    type="submit"
                    aria-label="send message"
                    className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark"
                  >
                    Kirim
                    <svg
                      className="fill-white"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.477 6.167L6.007 1.697l1.178-1.178L13.667 7l-6.482 6.482-1.178-1.178 4.47-4.47H.333V6.167h10.144z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
