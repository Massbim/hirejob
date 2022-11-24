import React from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "../../assets/image/Icon.svg";
import styles from "../../styles/Navbar.module.css";
import Cookies from "js-cookie";

const Navbar = () => {
  const id = Cookies.get("id");
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid">
          <Link href="/home">
            <a className="navbar-brand ms-5" href="#">
              <Image alt="Icon" src={Icon}></Image>
            </a>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <div className="d-flex justify-content-end me-2">
              <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ${styles.auth}`}>
                <li className={`${styles.border_none} nav-item mx- my-1 `}>
                  <Link href={`/details/users`}>
                    <button
                      className={`${styles.login} nav-link btn btn-outline-light reg me-2 w-100 `}
                    >
                      Details
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
