import Image from "next/image";
import React, { Fragment } from "react";
import styles from "../../styles/UnsupportedMediaSize.module.css";
import UnsupportedMediaSizeImage from "../../assets/image/unsupported-media-size/unsupported-media-size.png";

const UnsupportedMediaSize = () => {
  return (
    <Fragment>
      <div
        className={`${styles.unsupported_media_size} text-center d-flex d-sm-none`}
      >
        <div className="d-flex align-items-center justify-content-center flex-column">
          <Image
            src={UnsupportedMediaSizeImage}
            alt="Unsupported Media"
            width={100}
            height={225}
          />
          <h1
            className={`${styles.unsupported_media_size_text} fw-bold mx-5 my-5 w-75`}
          >
            Upps! media tidak mendukung
          </h1>
        </div>
      </div>
    </Fragment>
  );
};

export default UnsupportedMediaSize;
