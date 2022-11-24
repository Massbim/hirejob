import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import React, { Fragment, useState } from "react";
import iconOffice from "../../assets/image/iconOffice.svg";

const Experiences = ({ data }) => {
  console.log(data);
  const token = Cookies.get("token");
  const [formExperiences, setformExperiences] = useState({
    position: "",
    name_company: "",
    month_year: "",
    job_description: "",
    id: "",
  });
  const [Photo, setPhoto] = useState();
  console.log(formExperiences.id);
  const handleChange = (e) => {
    e.preventDefault();
    setformExperiences({
      ...formExperiences,
      [e.target.name]: e.target.value,
    });
    console.log(formExperiences);
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setPhoto(file);
  };
  const handleSubmitUpdate = async (e) => {
    Swal.fire({
      title: "loading...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    e.preventDefault();
    const formData = new FormData();
    // if (image) {
    formData.append("position", formExperiences.position);
    formData.append("name_company", formExperiences.name_company);
    formData.append("job_description", formExperiences.job_description);
    formData.append("month_year", formExperiences.month_year);
    formData.append("image", Photo);
    if (
      formExperiences.position !== "" ||
      formExperiences.name_company !== "" ||
      formExperiences.job_description !== "" ||
      formExperiences.month_year !== ""
    ) {
      await axios
        .put(
          `${process.env.NEXT_APP_API_URL}/experience/${formExperiences.id}`,
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
              return window.location.reload();
            }
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Error guys",
          });
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Lengkapi data!!!",
      });
    }
  };

  const handleDelete = (Id) => {
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
          .delete(`${process.env.NEXT_APP_API_URL}/experience/${Id}`)
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

  return (
    <div>
      <div className="row">
        {data.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className="col-2 pt-4">
                <Image
                  src={item.image ? item.image : iconOffice}
                  className="bg-white"
                  layout="responsive"
                  width="150"
                  height="150"
                  alt="Profile"
                />
              </div>
              <div className="col-lg-8 col-7">
                <h3>{item.position}</h3>
                <h5>{item.name_company}</h5>
                <p>{item.month_year}</p>
                <p>{item.job_description}</p>
              </div>
              <div className="col-lg-2 col-3">
                <div
                  className="edit-icon"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#updateExperiences"
                >
                  <button
                    className="btn btn-primary w-100 mb-4 "
                    onClick={() => {
                      setformExperiences({ ...formExperiences, id: item.id });
                    }}
                  >
                    Update
                  </button>
                </div>

                <div
                  className="modal fade"
                  id="updateExperiences"
                  tabIndex="-1"
                  aria-labelledby="editPhotoLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="editPhotoLabel">
                          Update Experiences
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        <form className="w-100 form-sign-up">
                          <div className="mb-2">
                            <label htmlFor="nama" className="form-label">
                              Position
                            </label>
                            <input
                              type="text"
                              name="position"
                              className="form-input form-control"
                              id="nama"
                              placeholder="position"
                              onChangeCapture={handleChange}
                            />
                          </div>

                          <div className="mb-2">
                            <label htmlFor="nama" className="form-label">
                              Nama Perusahaan
                            </label>
                            <input
                              type="text"
                              name="name_company"
                              className="form-input form-control"
                              id="nama"
                              placeholder="Perusahaan"
                              onChangeCapture={handleChange}
                            />
                          </div>

                          <div className="mb-2">
                            <label htmlFor="nama" className="form-label">
                              Bulan, Tahun
                            </label>
                            <input
                              type="text"
                              name="month_year"
                              className="form-input form-control"
                              id="nama"
                              placeholder="january, 2022"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="mb-2">
                            <label htmlFor="nama" className="form-label">
                              Description
                            </label>
                            <input
                              type="text"
                              name="job_description"
                              className="form-input form-control"
                              id="nama"
                              placeholder="description"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-2">
                            <label htmlFor="nama" className="form-label">
                              Upload Gambar
                            </label>
                            <input
                              type="file"
                              name="image"
                              className="form-control"
                              onChange={handleUpload}
                              multiple
                            ></input>
                          </div>
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
                          onClick={handleSubmitUpdate}
                          className="btn bg-primary text-white"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-danger w-100"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Experiences;
