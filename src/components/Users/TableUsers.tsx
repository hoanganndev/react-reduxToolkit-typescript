import _, { debounce } from "lodash";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";

import { fetchUsersData } from "../../services/userService";
import ModalAdd from "./Modals/ModalAdd";
import ModalDelelte from "./Modals/ModalDelelte";
import ModalEdit from "./Modals/ModalEdit";

// types
export interface User {
  id: number;
  email?: string;
  first_name: string;
  last_name?: string;
}

const TableUsers = () => {
  // default
  const listUsersDefault: User[] = [];
  const userDefault: User = {
    id: -1,
    email: "",
    first_name: "",
    last_name: "",
  };

  // state
  const [listUsers, setListUsers] = useState(listUsersDefault);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalDel, setIsShowModalDel] = useState(false);
  const [dataUserDel, setDataUserDel] = useState(userDefault);
  //
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState(userDefault);
  //
  const [isShowModalUser, setIsShowModalUser] = useState(false);

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page: number) => {
    let res = await fetchUsersData(page);
    if (res && res.data) {
      const { data, total, total_pages } = res;
      setListUsers(data);
      setTotalUsers(total);
      setTotalPages(total_pages);
    }
  };

  // ReactPaginate
  const handlePageClick = (e: any) => {
    const currentPage = +e.selected + 1;
    getUsers(currentPage);
  };
  // add new user
  const handleOpenModal = () => {
    setIsShowModalUser(true);
  };

  const handleCloseModalUser = () => {
    setIsShowModalUser(false);
  };

  const handleUpdateTableUsers = (user: User) => {
    setListUsers([user, ...listUsers]);
  };

  // Edit user
  const handleEditUser = (user: User) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setIsShowModalEdit(false);
  };

  const handleEditUserFromModal = (user: User) => {
    let _listUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex(item => item.id === user.id);
    _listUsers[index].first_name = user.first_name;
    setListUsers(_listUsers);
  };

  // Delete user

  const confirmDeleteUser = (user: User) => {
    let _listUsers = _.cloneDeep(listUsers);
    _listUsers = _listUsers.filter(item => item.id !== user.id);
    setListUsers(_listUsers);
    setIsShowModalDel(false);
    setDataUserDel(userDefault);
  };

  const handleDeleteUser = (user: User) => {
    setIsShowModalDel(true);
    setDataUserDel(user);
  };

  const handleCloseModalDel = () => {
    setIsShowModalDel(false);
    setDataUserDel(userDefault);
  };

  // Search
  const handleSearch = debounce(e => {
    let value = e.target.value;
    if (value) {
      let _listUsers = _.cloneDeep(listUsers);
      _listUsers = _listUsers.filter(item => {
        if (item.email) return item.email.includes(value);
      });
      setListUsers(_listUsers);
    } else {
      getUsers(1);
    }
  }, 500);

  // Sort
  const handleSort = (sortBy: any, sortField: string) => {
    let _listUsers = _.cloneDeep(listUsers);
    _listUsers = _.orderBy(_listUsers, [sortField], [sortBy]);
    setListUsers(_listUsers);
  };

  return (
    <>
      <div className="my-3 add-new-user d-sm-flex">
        <span className="">
          <h4>List Users</h4>
        </span>
        <div className="mt-2 mt-sm-0">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => handleOpenModal()}
          >
            <i className="fa-solid fa-circle-plus add-new"></i> Add user
          </button>
        </div>
      </div>
      <div className="col-12 col-sm-4 my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by email ..."
          onChange={e => handleSearch(e)}
        />
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span> ID</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long  i-sort"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long  i-sort"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>
              <div className="sort-header">
                <span>Email</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long i-sort"
                    onClick={() => handleSort("desc", "email")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long i-sort"
                    onClick={() => handleSort("asc", "email")}
                  ></i>
                </span>
              </div>
            </th>
            <th>first_name</th>
            <th>last_name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.map((user, index) => {
              return (
                <tr key={`user-${user.id}`}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td className="d-flex">
                    <button
                      className="btn btn-outline-warning mx-3"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteUser(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel="< previous"
        marginPagesDisplayed={2}
        //React paginate css
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAdd
        show={isShowModalUser}
        handleClose={handleCloseModalUser}
        handleUpdateTableUsers={handleUpdateTableUsers}
      />
      <ModalDelelte
        openModal={isShowModalDel}
        closeModal={handleCloseModalDel}
        userDel={dataUserDel}
        confirmDelete={confirmDeleteUser}
      />
      <ModalEdit
        show={isShowModalEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleCloseModalEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />
    </>
  );
};

export default TableUsers;
