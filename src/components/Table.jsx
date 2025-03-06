import React, { useEffect, useState } from "react";

const tableHeaders = [
    {
      key: "human_user",
      label: "Human User",
      valueFormatter: (value) => value,
    },
    {
      key: "create_date",
      label: "Create Date",
      valueFormatter: (value) => formatDate(value),
    },
    {
      key: "password_changed_date",
      label: "Password Changed Date",
      valueFormatter: (value) => formatDate(value),
    },
    {
      key: "days_since_last_password_change",
      label: "Days since last password change",
      valueFormatter: (value) => `${value}`,
    },
    {
      key: "last_access_date",
      label: "Last Access Date",
      valueFormatter: (value) => formatDate(value),
    },
    {
      key: "days_since_last_access",
      label: "Days since Last Access",
      valueFormatter: (value) => `${value}`,
    },
    {
      key: "mfa_enabled",
      label: "MFA Enabled",
      valueFormatter: (value) => (value ? "Yes" : "No"),
    },
  ];

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const calculateDaysSince = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const timeDiff = now - date;
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("api_data.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data data",data)
        const updatedData = data.map((row) => ({
          ...row,
          days_since_last_password_change: calculateDaysSince(row.password_changed_date),
          days_since_last_access: calculateDaysSince(row.last_access_date),
        }));
        setData(updatedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>User Data Table</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className="paddingsm"
                style={{
                  border: "2px solid #000",
                  textAlign: "left",
                }}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ border: "1px solid #000" }}>
              {tableHeaders.map((header, colIndex) => (
                <td
                  className="paddingsm"
                  key={colIndex}
                  style={{
                    border: "1px solid #000",
                    textAlign: "left",
                  }}
                >
                  {header.valueFormatter(row[header.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;