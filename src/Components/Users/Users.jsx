import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { PropTypes } from "prop-types";
import axios from "axios";
import "./user.css";

const Users = () => {
  const [user, setUser] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setUser(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      cellStyle: { color: "red", fontWeight: "bold" },
      headerClassName: "header",
    },
    {
      field: "title",
      headerName: "Title",
      width: 505,
      cellStyle: { color: "green", fontStyle: "italic" },
      headerClassName: "header",
    },
    {
      field: "body",
      headerName: "Body",
      width: 505,

      headerClassName: "header",
    },
  ];

  const rows = user.map((userData) => ({
    id: userData.id,
    title: userData.title,
    body: userData.body,
  }));
  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          style={{ fontFamily: "Poppins" }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          checkboxSelection
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
};

Users.propTypes = {
  user: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string,
    })
  ),
};
export default Users;
