import React from "react";
import Image from "next/image";
import styles from "../../styles/Footer.module.css";
import Icon from "../../assets/image/icon-footer.svg";

function Footer() {
  return (
    <footer className=" desktop-bottom d-none d-sm-block">
      <div className={`${styles.container_footer}`}>
        <div className={`container-sm ${styles.content_footer}`}>
          <Image alt="Icon" src={Icon} />
          <p className={`w-25 my-4 ${styles.width_p}`}>
            Di Peworld, Anda cukup posting lowongan kerja, sortir CV & temukan
            kandidat yang tepat dan berkualitas.
          </p>
          <hr />
          <div className="d-flex justify-content-between my-4">
            <p>2022 Peworld. All right reserved</p>
            <div className="contact ">
              <a href="#" className="me-4">
                Telepon
              </a>
              <a href="#">Email</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
