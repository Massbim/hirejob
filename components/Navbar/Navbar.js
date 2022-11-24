import React from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "../../assets/image/Icon.svg";
import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg bg-white">
          <Link href="/">
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
                <li className={`${styles.border_none} nav-item mx-3 my-1`}>
                  <Link href="/login/worker">
                    <button
                      className={`${styles.login} nav-link btn btn-outline-light reg me-2 w-100`}
                    >
                      Masuk
                    </button>
                  </Link>
                </li>
                <li className={`${styles.border_none} nav-item mx-1 my-1`}>
                  <div className="dropdown">
                    <button
                      className={`${styles.login} ${styles.color} nav-link dropdown-toggle btn btn-outline-light reg me-4 `}
                      type="button"
                      id="registerDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Daftar
                    </button>
                    <ul
                      className={`dropdown-menu ${styles.drop_down_custom} `}
                      aria-labelledby="registerDropdown"
                    >
                      <li>
                        <Link href="/register/worker">
                          <a className={`dropdown-item ${styles.color}`}>
                            Pekerja
                          </a>
                        </Link>
                      </li>
                      <div className={`dropdown-divider ${styles.line}`}></div>
                      <li>
                        <Link href="/register/recruiter">
                          <a className={`dropdown-item ${styles.color}`}>
                            Perekrut
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
