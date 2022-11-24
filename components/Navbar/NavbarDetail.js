import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Icon from "../../assets/image/Icon.svg";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Navbar.module.css";
import iconProfile from "../../assets/image/npp.jpg";
import { Dropdown, DropdownButton } from "react-bootstrap";
import iconBell from "../../assets/image/navbar/icon-bell.svg";
import iconMail from "../../assets/image/navbar/icon-mail.svg";

const Navbar = () => {
  const [myProfile, setMyProfile] = useState([]);
  const router = useRouter();

  const token = Cookies.get("token");

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#32C33B",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("id");
        Cookies.remove("token");
        router.push("/");
      }
    });
  };

  const fetchProfile = async () => {
    const result = await axios.get(
      `${process.env.NEXT_APP_API_URL}/authWorker/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(result);
    setMyProfile(result.data.data[0]);
    console.log(myProfile);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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
            <div className="d-flex justify-content-center ">
              <ul className={`navbar-nav  mb-3 mb-lg-0 ${styles.auth_detail}`}>
                <li className={`${styles.border_none} nav-item mx-3 my-2`}>
                  <Image
                    className={`${styles.icon_profile}`}
                    alt="iconBell"
                    src={iconBell}
                  />
                </li>
                <li className={`${styles.border_none} nav-item mx-3 my-2`}>
                  <Image
                    className={`${styles.icon_profile}`}
                    alt="iconMail"
                    src={iconMail}
                  />
                </li>
                <li
                  className={`${styles.container_profile} nav-item mx-1 my-0`}
                >
                  <DropdownButton
                    align="end"
                    title={
                      <Image
                        src={
                          myProfile.image
                            ? `https://drive.google.com/thumbnail?id=${myProfile.image}&sz=s1080`
                            : iconProfile
                        }
                        alt=""
                        width={35}
                        height={35}
                        className="rounded-circle"
                      />
                    }
                    variant="link"
                    id="dropdown-menu-align-end"
                  >
                    <Dropdown.Item
                      onClick={() => {
                        router.push(`/profile-detail`);
                      }}
                    >
                      Profil Saya
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleSignOut}>
                      Keluar
                    </Dropdown.Item>
                  </DropdownButton>
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
