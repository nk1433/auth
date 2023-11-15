const Table = ({ data }) => (
  <div>
    <h2>Data Table</h2>
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={tableCellStyle}>user</th>
          <th style={tableCellStyle}>role</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td style={tableCellStyle}>{item.username}</td>
            <td style={tableCellStyle}>{item.role.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

export default Table;
