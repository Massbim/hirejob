import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Footer from "../components/Footer/Footer";
import styles from "../styles/Profile.module.css";
import React, { useEffect, useState } from "react";
import ProfilePhoto from "../assets/image/npp.jpg";
import Navbar from "../components/Navbar/NavbarDetail";

const Profile = () => {
  const token = Cookies.get("token");
  const [Skill, setSkill] = useState([]);
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("hallo", loading);
  console.log(detail.image);
  var data = [];
  const [form, setFrom] = useState({
    fullname: detail?.fullname ? detail?.fullname : "",
    jobs: detail?.job ? detail?.job : "",
    address: detail?.address ? detail?.address : "",
    description: detail?.description ? detail?.description : "",
  });
  const [formExperience, setFormExperience] = useState({
    position: "",
    name_company: "",
    month_year: "",
    job_description: "",
  });
  const [formPortfolio, setFormPortfolio] = useState({
    name_app: "",
    repository: "",
    type: "",
    image: [],
  });

  const [image, setImage] = useState(null);
  const [imagePortfolio, setImagePortfolio] = useState([]);
  const [imageExperience, setImageExperience] = useState([]);

  const handleChangePortfolio = (e) => {
    e.preventDefault();
    setFormPortfolio({
      ...formPortfolio,
      [e.target.name]: e.target.value,
    });
    console.log(formPortfolio);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files;
    setImagePortfolio(file);
  };

  const handleSubmitPortfolio = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name_app", formPortfolio.name_app);
    data.append("repository", formPortfolio.repository);
    data.append("type", formPortfolio.type);
    data.append("image", imagePortfolio[0]);
    data.append("image", imagePortfolio[1]);
    data.append("image", imagePortfolio[2]);
    data.append("image", imagePortfolio[3]);

    axios
      .post(`${process.env.NEXT_APP_API_URL}/portfolio`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: res.data.message,
        });
      })
      .catch((err) =>
        console.log(
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          })
        )
      );
  };

  const imageChangeHandler = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const onSubmitImage = () => {
    document.getElementById("close").click();
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    axios
      .put(
        `${process.env.NEXT_APP_API_URL}/authWorker/update-profile/img`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          "Content-Type": "multipart/form-data",
        }
      )
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: res.data.message,
          confirmButtonText: "Oke",
        }).then((res) => {
          if (res.isConfirmed) {
            setLoading(false);
          }
        });
        fetch();
      });
  };

  const handleChangeExperience = (e) => {
    e.preventDefault();
    setFormExperience({
      ...formExperience,
      [e.target.name]: e.target.value,
    });
    console.log(formExperience);
  };

  const handleUploadExperience = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImageExperience(file);
  };

  const handleSubmitExperience = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("position", formExperience.position);
    data.append("name_company", formExperience.name_company);
    data.append("job_description", formExperience.job_description);
    data.append("month_year", formExperience.month_year);
    data.append("image", imageExperience);

    axios
      .post(`${process.env.NEXT_APP_API_URL}/experience`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "maaf gagal, silahkan coba lagi!",
        });
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFrom({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      fullname: form.fullname,
      address: form.address,
      jobs: form.jobs,
      description: form.description,
    };
    e.preventDefault();
    console.log(data);
    if (data.fullname || data.address || data.jobs || data.description) {
      axios
        .put(
          `${process.env.NEXT_APP_API_URL}/authWorker/update-profile/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            "Content-Type": "application/json",
          }
        )
        .then((result) => {
          console.log(result);
          Swal.fire({
            icon: "success",
            title: result.data.message,
          });
          fetch();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "error",
          });
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Lengkapi data!!!",
      });
    }
  };
  const fetch = async () => {
    const result = await axios.get(
      `${process.env.NEXT_APP_API_URL}/authWorker/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setDetail(result.data.data[0]);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="body">
      <Head>
        <title>Peworld - Ubah Profil</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={`${styles.bg_profile}`}>
        <Navbar />
        <div className={`${styles.bg}`}></div>
        <div className={`container ${styles.hight}`}>
          <div className="row mt-3 justify-content-center ">
            <div className="col-lg-12 col-md-12 col-sm-7 col-xl-4 mb-5">
              <div className={`card ${styles.border_none}`}>
                <div className="card-body">
                  <div className={`${styles.img_profile}`}>
                    <div
                      className="edit-icon"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#editPhoto"
                    >
                      {loading ? (
                        <div className="p-3">
                          <div className="spinner-grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={
                            detail.image
                              ? `https://drive.google.com/thumbnail?id=${detail.image}&sz=s1080`
                              : ProfilePhoto
                          }
                          className={`${styles.img_profile} rounded-circle`}
                          layout="responsive"
                          width="1"
                          height="1"
                          alt="Photo Profile"
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className="modal fade"
                    id="editPhoto"
                    tabIndex="-1"
                    aria-labelledby="editPhotoLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="editPhotoLabel">
                            Change Photo Profile
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className="modal-body">
                          <form>
                            <input
                              type="file"
                              className="form-control"
                              onChange={imageChangeHandler}
                            />
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            id="close"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            onClick={onSubmitImage}
                            className="btn bg-primary text-white"
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3>{detail.fullname}</h3>
                  <h5>
                    {detail.jobs ? (
                      detail.jobs
                    ) : (
                      <span className="text-secondary">jobs</span>
                    )}
                  </h5>
                  <p>
                    {detail.address ? (
                      detail.address
                    ) : (
                      <span className="text-secondary">alamat</span>
                    )}
                  </p>
                </div>
              </div>
              <button className="btn w-100 reg my-3" onClick={handleSubmit}>
                Simpan
              </button>
              <Link href="/profile-detail">
                <button className="btn w-100 reg">Batal</button>
              </Link>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-7 col-xl-8 g-sm-5 g-lg-0 mb-5">
              <div className={`card ${styles.border_none}`}>
                <div className="card-body">
                  <h3>Data Diri</h3>
                  <hr />
                  <form className="w-100 form-sign-up">
                    <div className="mb-2">
                      <label htmlFor="nama" className="form-label">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        className="form-input form-control"
                        id="nama"
                        defaultValue={detail.fullname}
                        placeholder="Masukan nama lengkap"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="job" className="form-label">
                        Job Desk
                      </label>
                      <input
                        defaultValue={detail.jobs}
                        type="text"
                        name="jobs"
                        className="form-input form-control"
                        id="job"
                        placeholder="Masukan job desk"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="domisili" className="form-label">
                        Domisili
                      </label>
                      <input
                        defaultValue={detail.address}
                        type="text"
                        name="address"
                        className="form-input form-control"
                        id="domosili"
                        placeholder="Masukan domisili"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="deskripsi" className="form-label">
                        Deskripsi Singkat
                      </label>
                      <textarea
                        defaultValue={detail.description}
                        type="text"
                        name="job_description"
                        className="form-input form-control"
                        id="kerja"
                        placeholder="Tuliskan Deskripsi Singkat"
                        onChange={handleChangeExperience}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className={`card mt-3 ${styles.border_none}`}>
                <div className="card-body">
                  <h3>Skill</h3>
                  <hr />
                  <div>
                    <ul>
                      {Skill
                        ? Skill.skill?.map((res, index) => {
                            return <li key={index}>{res}</li>;
                          })
                        : ""}
                    </ul>
                  </div>
                  <form className="w-100 form-sign-up">
                    <div className="mb-2">
                      <input
                        type="text"
                        defaultValue=""
                        className="form-input form-control w-75  d-inline ms-2 me-lg-4 "
                        id="nama"
                        placeholder="Eg: javascript, html, css, dll"
                        onChange={(e) => {
                          e.preventDefault();
                          data.push(e.target.value);
                          console.log(data);
                        }}
                      />
                      <button
                        className="btn btn-warning ms-4 text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          const data1 = {
                            skill: data[data.length - 1],
                          };
                          axios
                            .put(
                              `${process.env.NEXT_APP_API_URL}/authWorker/update-profile/`,
                              data1,
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                                "Content-Type": "application/json",
                              }
                            )
                            .then((result) => {
                              console.log(result);
                              Swal.fire({
                                icon: "success",
                                title: result.data.message,
                              });
                              fetch();
                            })
                            .catch((err) => {
                              Swal.fire({
                                icon: "error",
                                title: err.message,
                              });
                              console.log(err);
                            });
                        }}
                      >
                        Simpan
                      </button>
                    </div>
                    <div className="col-3"></div>
                  </form>
                </div>
              </div>
              <div className={`card mt-3 ${styles.border_none}`}>
                <div className="card-body">
                  <h3>Pengalaman Kerja</h3>
                  <hr />
                  <form
                    onSubmit={handleSubmitExperience}
                    className="w-100 form-sign-up"
                  >
                    <div className="mb-2">
                      <label htmlFor="nama" className="form-label">
                        Posisi
                      </label>
                      <input
                        type="text"
                        name="position"
                        className="form-input form-control"
                        id="nama"
                        placeholder="Posisi"
                        onChange={handleChangeExperience}
                      />
                    </div>
                    <div className="row g-2">
                      <div className="col-md">
                        <div className="mb-2">
                          <label htmlFor="nama" className="form-label">
                            Nama perusahaan
                          </label>
                          <input
                            type="text"
                            name="name_company"
                            className="form-input form-control"
                            id="nama"
                            placeholder="Posisi"
                            onChange={handleChangeExperience}
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="mb-2">
                          <label htmlFor="nama" className="form-label">
                            Bulan/tahun
                          </label>
                          <input
                            type="text"
                            name="month_year"
                            className="form-input form-control"
                            id="nama"
                            placeholder="Januari 2020"
                            onChange={handleChangeExperience}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="deskripsi" className="form-label">
                        Deskripsi Singkat
                      </label>
                      <textarea
                        type="text"
                        name="job_description"
                        className="form-input form-control"
                        id="kerja"
                        placeholder="Tuliskan Deskripsi Singkat"
                        onChange={handleChangeExperience}
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="nama" className="form-label">
                        Upload logo perusahaan
                      </label>
                      <input
                        type="file"
                        name="image"
                        className="form-control"
                        onChange={handleUploadExperience}
                      ></input>
                    </div>

                    <hr className="mt-3" />

                    <div className="row justify-content-center">
                      <button type="submit" className="btn btn-outline-warning">
                        Tambah Pegalaman Kerja
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className={`card mt-3 ${styles.border_none}`}>
                <div className="card-body">
                  <h3>Portofolio</h3>
                  <hr />
                  <form
                    onSubmit={handleSubmitPortfolio}
                    className="w-100 form-sign-up"
                  >
                    <div className="mb-2">
                      <label htmlFor="nama" className="form-label">
                        Nama Aplikasi
                      </label>
                      <input
                        type="text"
                        name="name_app"
                        className="form-input form-control"
                        id="nama"
                        placeholder="Masukan nama aplikasi"
                        onChange={handleChangePortfolio}
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="nama" className="form-label">
                        Link repository
                      </label>
                      <input
                        type="text"
                        name="repository"
                        className="form-input form-control"
                        id="nama"
                        placeholder="Masukan link repository"
                        onChange={handleChangePortfolio}
                      />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="nama" className="form-label">
                        Type portofolio
                      </label>
                      <div className="container row">
                        <div className="form-check col-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="type"
                            id="flexRadioDefault1"
                            value="Aplikasi Mobile"
                            onChange={handleChangePortfolio}
                          />
                          <label
                            className="form-check-label"
                            for="flexRadioDefault1"
                          >
                            Aplikasi mobile
                          </label>
                        </div>
                        <div className="form-check col-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="type"
                            id="flexRadioDefault2"
                            value="Aplikasi Web"
                            onChange={handleChangePortfolio}
                          />
                          <label
                            className="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Aplikasi web
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="nama" className="form-label">
                        Upload Gambar
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleUpload}
                        multiple
                      ></input>
                    </div>
                    <hr className="mt-3" />
                    <div className="row justify-content-center">
                      <button type="submit" className="btn btn-outline-warning">
                        Tambah Portofolio
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
