import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Profile from "../../assets/image/npp.jpg";
import style from "../../styles/Detail.module.css";
import Footer from "../../components/Footer/Footer";
import Maps from "../../assets/image/detail/location.svg";
import Navbar from "../../components/Navbar/NavbarDetail";
import Pagination from "../../components/Pagination/index";
import React, { Fragment, useEffect, useState } from "react";

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_APP_API_URL}/worker`);
  return {
    props: { data: res.data.data },
  };
}

const Detail = ({ data }) => {
  console.log(data);
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [page, setPage] = useState(1);
  const [workerPerPage] = useState(5);

  const handleSearch = (e) => {
    e.preventDefault();
    fetch();
  };
  console.log(search);
  const fetch = async () => {
    const result = await axios.get(
      `${process.env.NEXT_APP_API_URL}/worker?search=${search}`
    );
    setDataSearch(result.data.data);
  };
  const fetchSort = async (sortBy, sort) => {
    const result = await axios.get(
      `${process.env.NEXT_APP_API_URL}/worker?sorby=${sortBy}&sort=${sort}`
    );
    setDataSearch(result.data.data);
  };

  const increment = () => {
    if (page == 2) {
      return;
    } else if (page >= 1) {
      setPage(page + 1);
      fetch();
    }
  };
  const decrement = () => {
    if (page <= 1) {
      return;
    } else {
      setPage(page - 1);
      fetch();
    }
  };

  useEffect(() => {
    fetch();
  }, [page]);

  console.log(data);
  const indexOfLastPost = page * workerPerPage;
  const indexOfFirstPost = indexOfLastPost - workerPerPage;
  const currentPosts = dataSearch.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setPage(pageNumber);
  return (
    <Fragment>
      <div className="body">
        <Head>
          <title>Peworld - Semua Pengguna</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/icon-logo.ico" />
        </Head>
        <Navbar />
        <div className={`${style.bg_top}`}>
          <div className="d-flex">
            <p className="fw-bold text-white mt-3">Top Jobs</p>
          </div>
        </div>
        <div></div>
        <div className={style.mainbody}>
          <div className={style.container}>
            <div className={style.searchbar}>
              <input
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <div
                className={`${style.sort} dropdown d-flex flex-row justify-content-center align-items-center`}
              >
                <button
                  className="btn btn-transparent dropdown-toggle me-4"
                  type="button"
                  id="registerDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort By
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="registerDropdown"
                >
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        fetchSort("fullname", "asc");
                      }}
                    >
                      Name
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        fetchSort("jobs", "desc");
                      }}
                    >
                      Position
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        fetchSort("skill", "asc");
                      }}
                    >
                      Skill
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        fetchSort("address", "desc");
                      }}
                    >
                      Location
                    </a>
                  </li>
                </ul>
              </div>
              <button onClick={handleSearch}>Search</button>
            </div>
            <div className={style.main}>
              {search ? (
                currentPosts?.map((data, index) => {
                  console.log(data.image);
                  return (
                    <div className={style.card} key={index}>
                      <div className={style.profile}>
                        <Image
                          src={
                            data.image
                              ? `https://drive.google.com/thumbnail?id=${data.image}&sz=s1080`
                              : Profile
                          }
                          width="125"
                          height="125"
                          alt="profile"
                          className={`${style.profile_img} rounded-circle`}
                        />
                      </div>

                      <div className={style.profiledetail}>
                        <p
                          className="font-weight-bold "
                          style={{ fontSize: "20px", cursor: "pointer" }}
                        >
                          {data.fullname}
                        </p>

                        <p className="text-muted">
                          {data.jobs === undefined ? "Unknown" : data.jobs}
                        </p>
                        <p className="text-muted">
                          <Image src={Maps} alt="location" />
                          <span className="ml-2">
                            {" "}
                            {data.address === undefined
                              ? "Unknown"
                              : data.address}
                          </span>
                        </p>
                        <div className={style.skills}>
                          {data.skill?.split(",").map((data, index) => {
                            return (
                              <div className={style.skill} key={index}>
                                {data}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <Link href={`detail/${data.id}`}>
                        <div className={`m-auto me-5 `}>
                          <button className={` ${style.btn_profiledetail}`}>
                            Lihat Profile
                          </button>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <>
                  {currentPosts?.map((data, index) => {
                    console.log(data.image);

                    return (
                      <div className={style.card} key={index}>
                        <div className={style.profile}>
                          <Image
                            src={
                              data.image
                                ? `https://drive.google.com/thumbnail?id=${data.image}&sz=s1080`
                                : Profile
                            }
                            width="125"
                            height="125"
                            alt="profile"
                            className={`${style.profile_img} rounded-circle`}
                          />
                        </div>

                        <div className={style.profiledetail}>
                          <p
                            className="font-weight-bold "
                            style={{ fontSize: "20px", cursor: "pointer" }}
                          >
                            {data.fullname}
                          </p>

                          <p className="text-muted">
                            {data.jobs === undefined ? "Unknown" : data.jobs}
                          </p>
                          <p className="text-muted d-flex ">
                            <Image src={Maps} alt="location" />
                            <span className="ml-2 align-self-center ms-2">
                              {data.address == null ? "Unknown" : data.address}
                            </span>
                          </p>
                          <div className={style.skills}>
                            {data.skill?.split(",").map((data, index) => {
                              return (
                                <div className={style.skill} key={index}>
                                  {data}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <Link href={`/details/${data.id}`}>
                          <div className={`m-auto me-5 `}>
                            <button className={` ${style.btn_profiledetail}`}>
                              Lihat Profile
                            </button>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <div className={style.pagination}>
            <Pagination
              increment={increment}
              decrement={decrement}
              workerPerPage={workerPerPage}
              totalWorker={dataSearch.length}
              paginate={paginate}
            />
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Detail;
