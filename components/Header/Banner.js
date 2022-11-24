import axios from "axios";
import Image from "next/image";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import banner1 from "../../assets/image/banner1.svg";
import banner2 from "../../assets/image/banner2.svg";
import banner3 from "../../assets/image/banner3.svg";
import testimony_picture from "../../assets/image/testimony_image.svg";

import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";

function Banner() {
  const [data, setData] = useState([]);
  const fetch = async () => {
    const result = await axios.get(`${process.env.NEXT_APP_API_URL}/worker`);

    setData(result.data.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="container">
      <div className=" container-sm container_content1 mb-5">
        <div className="contain-tex m-auto">
          <h1>Talenta terbaik negri untuk perubahan revolusi 4.0</h1>
          <br />
          <p className="fs-3 fw-lighter mb-3">
            Ayo raih Impianmu untuk berkarir dibidang IT bersama <b>Peworld</b>
            !.
          </p>
          <button className="btn btn-custom">Mulai Dari Sekarang</button>
        </div>
        <div className="">
          <div className="">
            <Image alt="banner1" src={banner1} />
          </div>
        </div>
      </div>
      <div className="container-sm container_content1">
        <div className="container-sm contain-text">
          <div>
            <Image alt="banner2" src={banner2} />
          </div>
        </div>
        <div className="d-flex flex-column w-100 ">
          <h1>Kenapa harus mencari talent di peworld</h1>
          <ul className="daftar">
            <li>
              <i className="bi bi-check-circle-fill" />
              <span className="fs-5">
                {" "}
                Talent peworld <strong>berstandar global</strong>.
              </span>
            </li>
            <li>
              <i className="bi bi-check-circle-fill" />
              <span className="fs-5">
                {" "}
                Talent peworld <strong>cerdas dan berkarakter</strong>.
              </span>
            </li>
            <li>
              <i className="bi bi-check-circle-fill" />
              <span className="fs-5">
                {" "}
                Talent peworld <strong>berfikir kritis</strong>.
              </span>
            </li>
            <li>
              <i className="bi bi-check-circle-fill" />
              <span className="fs-5">
                {" "}
                Talent peworld <strong>adaptif dengan segala keadaan</strong>.
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container_content1 ">
        <div className="contain-text2 ">
          <h1 className="ms-5">Skill Talent</h1>
          <span className="fw-light fs-5 ms-5">
            Talent peworld tidak hanya di didik secara kepemimpinan namun juga
            di latih dengan{" "}
            <strong>
              <i> matang dan sangat melek dengan skill Digital</i>
            </strong>
            .
          </span>
          <div className="container-sm mt-2">
            <ul className="list-skill">
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> Java</span>
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> Kotlin</span>
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> PHP</span>
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> Javascrip</span>
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> Golang</span>
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> C++</span>
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> Ruby</span>
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> 10+ Bahasa lainnya</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container_img d-flex justify-content-center align-items-center">
          <div className="contain-img3">
            <Image alt="banner3" src={banner3} />
          </div>
        </div>
      </div>

      <div className="container-sm">
        <h1 className="text-center">Opini mereka tentang Peworld</h1>
        <Swiper
          className="container container_swiper"
          modules={[Pagination, Navigation]}
          spaceBetween={0}
          // slidesPerView={3}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            //when window width is >= 440
            440: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            991: {
              slidesPerView: 3,
            },
          }}
        >
          {data?.map((card, index) => (
            <SwiperSlide className="" key={index}>
              <div className="Card">
                <div className="bg-img">
                  <div className="card-img ">
                    <Image
                      alt="testimony-picture"
                      src={
                        card.image
                          ? `https://drive.google.com/uc?export=view&id=${card.image}`
                          : testimony_picture
                      }
                      width={300}
                      height={300}
                      className="img7"
                    />
                  </div>
                </div>
                <div className="card-text ">
                  <h3 className="">{card.fullname}</h3>
                  <span className="fw-light">{card.jobs}</span>
                  <p className="w-75 ms-4">{card.opini} </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container_content4 my-5">
        <div className="container_img4 ">
          <div className="">
            <p className="text-white w-50 ms-5 fs-2">
              Jika tidak meniti karir dari sekarang, kapan lagi ?
            </p>
          </div>
          <div className="d-flex justify-content-end me-5">
            <button className="btn bg-white py-2 fs-5 btn3">
              Mulai Dari Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
