import Head from "next/head";
import Image from "next/image";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import Portofolio from "../Portofolio/index";
import PengalamanKerja from "../Experience/index";
import styles from "../../styles/Profile.module.css";
import ProfilePhoto from "../../assets/image/npp.jpg";

const Profile = (props) => {
  const router = useRouter();
  const { data, skill, portfolio, experience } = props;
  console.log(data);
  return (
    <div>
      <style global jsx>{``}</style>
      <Head>
        <title>Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Fragment>
        <div className={`container-md-fluid ${styles.hight}`}>
          <div className="row row-cols-md-1 row-cols-lg-2 mt-3 justify-content-center mx-5">
            <div className="col-md-12 col-lg-5 col-xxl-4">
              <div className="card mb-5">
                <div className="card-body">
                  <Image
                    src={
                      data.image
                        ? `https://drive.google.com/thumbnail?id=${data.image}&sz=s1080`
                        : ProfilePhoto
                    }
                    className="rounded-circle"
                    layout="responsive"
                    width="1"
                    height="1"
                    alt="Photo Profile"
                  />
                  <h3 className="my-4">{data.fullname}</h3>
                  <h5>{data.jobs}</h5>
                  <p>{data.address}</p>
                  <p>
                    <strong>
                      <i>{data.jobs}</i>
                    </strong>
                  </p>
                  <p className="text-wrap" style={{ "font-size": 1.1 + "em" }}>
                    {data.description}
                  </p>
                  <button
                    className={`btn ${styles.btn_custom}`}
                    onClick={() => {
                      router.push(`/profile-edit`);
                    }}
                  >
                    Ubah Profil
                  </button>
                  <p className="fw-1 fw-bold mt-5">Skill</p>
                  <div class="container text-center">
                    <div class="g-3">
                      {skill ? (
                        skill.split(",").map((item) => (
                          // eslint-disable-next-line react/jsx-key
                          <div className="col-3 btn btn-warning mx-2 my-2">
                            <div>{item}</div>
                          </div>
                        ))
                      ) : (
                        <>
                          <h4>Kamu belum memperbaharui skill mu!</h4>
                        </>
                      )}
                    </div>
                  </div>

                  <ul className="d-flex flex-column mt-5">
                    <li>
                      <i class="bi bi-envelope " /> {data.email}
                    </li>
                    <li>
                      <i class="bi bi-instagram " /> {data.instagram}
                    </li>
                    <li>
                      <i class="bi bi-github " /> {data.github}
                    </li>
                    <li>
                      <i class="bi bi-linkedin " /> {data.linkedin}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-7 col-xxl-8">
              <div className="card">
                <div className="card-body">
                  <div className="utama">
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button
                          className={`nav-link  ${styles.under_line}`}
                          id="nav-home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-home"
                          type="button"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                        >
                          Portofolio
                        </button>
                        <button
                          className="nav-link"
                          id="nav-profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-profile"
                          type="button"
                          role="tab"
                          aria-controls="nav-profile"
                          aria-selected="false"
                        >
                          Pengalaman Kerja
                        </button>
                      </div>
                    </nav>
                    <div className="tab-content mt-5" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                        tabIndex="0"
                      >
                        <Portofolio data={portfolio} />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-profile"
                        role="tabpanel"
                        aria-labelledby="nav-profile-tab"
                        tabIndex="0"
                      >
                        <PengalamanKerja data={experience} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default Profile;
