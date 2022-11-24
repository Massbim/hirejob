import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Portofolio = ({ data }) => {
  const token = Cookies.get("token");
  const id = Cookies.get("id");

  const [portfolioData, setPortfolioData] = useState([]);
  const [portfolioId, setPortfolioId] = useState("");
  const [portfolioForm, setPortfolioForm] = useState({
    name_app: "",
    repository: "",
    type: "",
  });
  const [portfolioImage, setPortfolioImage] = useState();

  const handleChangePortfolio = (e) => {
    e.preventDefault();
    setPortfolioForm({
      ...portfolioForm,
      [e.target.name]: e.target.value,
    });
    console.log(portfolioForm);
  };

  const handleUploadPortfolio = (e) => {
    e.preventDefault();
    const file = e.target.files;
    setPortfolioImage(file);
  };

  const handleSubmitPortfolio = async (e) => {
    Swal.fire({
      title: "loading...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    e.preventDefault();
    const data = new FormData();
    data.append("name_app", portfolioForm.name_app);
    data.append("repository", portfolioForm.repository);
    data.append("type", portfolioForm.type);
    for (let img of portfolioImage) {
      console.log(img);
      data.append("image", img);
    }
    console.log(data);
    await axios
      .put(`${process.env.NEXT_APP_API_URL}/portfolio/${portfolioId}`, data, {
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
          confirmButtonText: "Oke",
        }).then((res) => {
          if (res.isConfirmed) {
            return window.location.reload();
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
        });
        console.log(err);
      });
  };

  const getPortfolioByID = (id_port) => {
    return axios
      .get(`${process.env.NEXT_APP_API_URL}/portfolio/${id_port}`)
      .then((res) => {
        console.log(res.data.data);
        setPortfolioData(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const handleDeletePortfolio = (portfolioId) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#32C33B",
      confirmButtonText: "Deleted",
    }).then((result) => {
      if (result.isConfirmed) {
        return axios
          .delete(`${process.env.NEXT_APP_API_URL}/portfolio/${portfolioId}`)
          .then((res) => {
            console.log(res);
            Swal.fire({
              icon: "success",
              title: res.data.message,
              confirmButtonText: "Oke",
            }).then((res) => {
              if (res.isConfirmed) {
                return window.location.reload();
              }
            });
          });
      }
    });
  };

  useEffect(() => {
    getPortfolioByID();
  }, []);

  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 align-items-center g-3">
        {data?.map((item, index) => (
          <div className="col categories" key={index}>
            <div className="card card-3">
              <div className="row">
                <div className="d-flex row mt-5">
                  <div class="row">
                    <div className="col">
                      <button
                        className="btn btn-danger ms-3"
                        onClick={() => {
                          Swal.fire({
                            title: "loading...",
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            showConfirmButton: false,
                          });
                          handleDeletePortfolio(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="col d-flex justify-content-end">
                      <div
                        className="edit-icon"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#updatePorto"
                      >
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setPortfolioId(item.id);
                            getPortfolioByID(item.id);
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <a className="d-flex justify-content-center ms-4">
                      <h5>{item.name_app}</h5>
                    </a>
                  </div>

                  <div
                    className="modal fade"
                    id="updatePorto"
                    tabIndex="-1"
                    aria-labelledby="editPhotoLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="editPhotoLabel">
                            Update Portfolio
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className="modal-body">
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
                                defaultValue={portfolioData?.name_app}
                                name="name_app"
                                className="form-input form-control"
                                id="nama"
                                placeholder="Masukan nama aplikasi"
                                onChangeCapture={handleChangePortfolio}
                              />
                            </div>

                            <div className="mb-2">
                              <label htmlFor="nama" className="form-label">
                                Link repository
                              </label>
                              <input
                                type="text"
                                defaultValue={portfolioData?.repository}
                                name="repository"
                                className="form-input form-control"
                                id="nama"
                                placeholder="Masukan link repository"
                                onChangeCapture={handleChangePortfolio}
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
                                    onChangeCapture={handleChangePortfolio}
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
                                    // checked
                                    value="Aplikasi Web"
                                    onChangeCapture={handleChangePortfolio}
                                  />
                                  <label
                                    className="form-check-label"
                                    // for="flexRadioDefault2"
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
                                // name="image"
                                className="form-control"
                                onChange={handleUploadPortfolio}
                                multiple
                              ></input>
                            </div>
                            <div className="row justify-content-center"></div>
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
                            type="submit"
                            id="close"
                            data-bs-dismiss="modal"
                            onClick={handleSubmitPortfolio}
                            className="btn bg-primary text-white"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {item.image.map((image, index) => {
                  console.log(image);
                  return (
                    <>
                      <div className="col-5 m-auto mt-4" key={index}>
                        <Image
                          className="mb-2 "
                          src={image}
                          width={10}
                          height={10}
                          layout="responsive"
                          alt="portofolio"
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portofolio;
