import React from "react";
import Link from "next/link";
import Image from "next/image";

const Portofolio = ({ data }) => {
  return (
    <div>
      <div className="column align-items-center g-1">
        {data?.map((item, index) => {
          return (
            <div
              className="col-lg-10 categories border ms-lg-5 mb-1"
              key={index}
            >
              <span className="d-flex ms-auto ">
                <h4 className="font-category fw-1 m-auto">{item.name_app}</h4>
              </span>
              <div className="d-flex justify-content-center mt-2">
                <Link href={item.repository} className="btn btn-primary w-50 ">
                  Link Repository
                </Link>
              </div>
              <div className="row">
                {item?.image?.map((image, index) => {
                  console.log(image);
                  return (
                    <div className="col-5 m-auto mt-5" key={index}>
                      <Image
                        className="mb-2"
                        src={image}
                        width="10"
                        height={10}
                        fill="cover"
                        layout="responsive"
                        alt="portofolio"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Portofolio;
