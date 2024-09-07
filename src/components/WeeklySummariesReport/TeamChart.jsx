import { useEffect } from 'react';
import './TeamChart.css';

function TeamRow({ rowData }) {
  const { type, data } = rowData;
  if (type === 'team') {
    return (
      <tr>
        <td colSpan="3" style={{ backgroundColor: data.color, color: 'white' }}>
          {data.team}
        </td>
      </tr>
    );
  }
  if (type === 'member') {
    return (
      <tr>
        <td>
          <a href={`/userprofile/${data.id}`}>{data.name}</a>
        </td>
        <td>
          <a href={`/userprofile/${data.id}`}>{data.role}</a>
        </td>
        <td>{data.length}</td> {/* Leave an empty cell for the total members */}
      </tr>
    );
  }

  return null;
}

function TeamChart({ teamData, darkMode }) {
  const tableData = [];
  useEffect(() => {}, [teamData]);

  teamData?.forEach(team => {
    tableData.push({ type: 'team', data: team });

    team.members.forEach(member => {
      tableData.push({ type: 'member', data: member });
    });
  });

  return (
    <table>
      <thead>
        <tr>
          <th
            style={{
              backgroundColor: darkMode ? 'oxide-dark' : 'oxide',
              color: darkMode ? 'white' : 'black',
            }}
          >
            Name
          </th>
          <th
            style={{
              backgroundColor: darkMode ? 'oxide-dark' : 'oxide',
              color: darkMode ? 'white' : 'black',
            }}
          >
            Role
          </th>
          <th
            style={{
              backgroundColor: darkMode ? 'oxide-dark' : 'oxide',
              color: darkMode ? 'white' : 'black',
            }}
          >
            Total Members
          </th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((rowData, index) => (
          /* eslint-disable react/no-array-index-key */
          <TeamRow key={index} rowData={rowData} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2">Overall Total</td>
          <td>{teamData?.reduce((acc, team) => acc + team.members.length, 0)}</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default TeamChart;
