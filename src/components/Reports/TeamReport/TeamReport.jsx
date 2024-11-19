// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';
import { useDispatch, useSelector, connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { FiUsers } from 'react-icons/fi';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';
import { rootReducers } from '../../../store.js';
import { ENDPOINTS } from 'utils/URL';
import { getTeamDetail } from '../../../actions/team';
import {
  getAllUserTeams,
  postNewTeam,
  deleteTeam,
  updateTeam,
  getTeamMembers,
  deleteTeamMember,
  addTeamMember,
} from '../../../actions/allTeamsAction';

import { getTeamReportData } from './selectors';
import './TeamReport.css';
import { ReportPage } from '../sharedComponents/ReportPage';
import UserLoginPrivileges from './components/UserLoginPrivileges';

const parser = (val) => {
  try {
    return JSON.parse(val);
  } catch (error) {
    console.error("Failed to parse state:", error);
    return null;
  }
};

const persistConfig = {
  key: 'root',
  storage,
  serialize: (outboundState) => compressToUTF16(JSON.stringify(outboundState)),
  deserialize: (inboundState) => parser(decompressFromUTF16(inboundState))
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export function TeamReport({ match }) {
  const darkMode = useSelector(state => state.theme.darkMode);

  const dispatch = useDispatch();
  const { team } = useSelector(getTeamReportData);
  const user = useSelector(state => state.auth.user);
  const [teamMembers, setTeamMembers] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [allTeamsMembers, setAllTeamsMembers] = useState([]);
  const [searchParams, setSearchParams] = useState({
    teamName: '',
    createdAt: moment('01-01-2015', 'MM-DD-YYYY').toDate(),
    modifiedAt: moment('01-01-2015', 'MM-DD-YYYY').toDate(),
    isActive: false,
    isInactive: false,
  });

  const [selectedTeams, setSelectedTeams] = useState([]);

  // Create a state variable to store the selected radio input
  // eslint-disable-next-line no-unused-vars
  const [selectedInput, setSelectedInput] = useState('isManager');

  // Event handler for when a radio input is selected
  const handleInputChange = event => {
    // Update the selectedInput state variable with the value of the selected radio input
    setSelectedInput(event.target.value);
  };

  const handleStatus = useMemo(
    () =>
      // eslint-disable-next-line react/no-unstable-nested-components,func-names
      function(isActive) {
        return isActive ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              className="dot"
              style={{ backgroundColor: '#00ff00', width: '0.7rem', height: '0.7rem' }}
            />
            <strong>Active</strong>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              className="dot"
              style={{ backgroundColor: 'red', width: '0.7rem', height: '0.7rem' }}
            />
            <strong>Inactive</strong>
          </div>
        );
      },
    [],
  );

  const handleSelectTeam = useCallback((event, selectedTeam, index) => {
    if (event.target.checked) {
      if (selectedTeams.length < 4) {
        setSelectedTeams([...selectedTeams, { selectedTeam, index }]);
      }
    } else {
      setSelectedTeams(prevSelectedTeams =>
        prevSelectedTeams.filter(team => team.selectedTeam._id !== selectedTeam._id),
      );
    }
  }, [selectedTeams]);

  const debounceSearchByName = debounce((value) => {
    setSearchParams(prevParams => ({
      ...prevParams,
      teamName: value,
    }));
   }, 300);
   
   function handleSearchByName(event) {
     event.persist();
     debounceSearchByName(event.target.value);
   }

  function handleCheckboxChange(event) {
    const { id, checked } = event.target;

    if (id === 'active' && checked) {
      setSearchParams(prevParams => ({
        ...prevParams,
        isActive: true,
      }));
    } else if (id === 'active' && !checked) {
      setSearchParams(prevParams => ({
        ...prevParams,
        isActive: false,
      }));
    } else if (id === 'inactive' && checked) {
      setSearchParams(prevParams => ({
        ...prevParams,
        isInactive: true,
      }));
    } else if (id === 'inactive' && !checked) {
      setSearchParams(prevParams => ({
        ...prevParams,
        isInactive: false,
      }));
    }
  }

  const memoizedSearchResults = useMemo(() => {
    return allTeams.filter(team => {
      const isMatchedName = team.teamName.toLowerCase().includes(searchParams.teamName.toLowerCase());
      const isMatchedCreatedDate = moment(team.createdDatetime).isSameOrAfter(
        moment(searchParams.createdAt).startOf('day'),
      );
      const isMatchedModifiedDate = moment(team.modifiedDatetime).isSameOrAfter(
        moment(searchParams.modifiedAt).startOf('day'),
      );
      const isActive = team.isActive === searchParams.isActive;
      const isInactive = team.isActive !== searchParams.isInactive;
      return isMatchedName && isMatchedCreatedDate && isMatchedModifiedDate && (isActive || isInactive);
    });
  }, [allTeams, searchParams]);

  function handleDate(date) {
    const formattedDates = {};
    // eslint-disable-next-line no-shadow
    const getFormattedDate = date => {
      if (!formattedDates[date]) {
        formattedDates[date] = moment(date).format('MM-DD-YYYY');
      }
      return formattedDates[date];
    };

    return getFormattedDate(date);
  }

  useEffect(() => {
    let isMounted = true; // flag to check component mount status
  
    if (match) {
      dispatch(getTeamDetail(match.params.teamId));
  
      dispatch(getTeamMembers(match.params.teamId)).then(result => {
        if (isMounted) { // Only update state if component is still mounted
          setTeamMembers([...result]);
        }
      });
  
      dispatch(getAllUserTeams())
        .then(result => {
          if (isMounted) {
            setAllTeams([...result]);
          }
          return result;
        })
        .then(result => {
          const allTeamMembersPromises = result.map(team => dispatch(getTeamMembers(team._id)));
          Promise.all(allTeamMembersPromises).then(results => {
            if (isMounted) { // Only update state if component is still mounted
              setAllTeamsMembers([...results]);
            }
          });
        });
    }
  
    return () => {
      isMounted = false; // Set the flag as false when the component unmounts
    };
  }, [dispatch, match]); // include all dependencies in the dependency array  

  // Get Total Tangible Hours this week [main TEAM]
  const [teamMembersWeeklyEffort, setTeamMembersWeeklyEffort] = useState([]);
  const [totalTeamWeeklyWorkedHours, setTotalTeamWeeklyWorkedHours] = useState('');

  const calculateTotalHrsForPeriod = timeEntries => {
    const hours = { totalTangibleHrs: 0, totalIntangibleHrs: 0 };
    if (timeEntries.length < 1) return hours;

    for (let i = 0; i < timeEntries.length; i += 1) {
      const timeEntry = timeEntries[i];
      if (timeEntry.isTangible) {
        hours.totalTangibleHrs += parseFloat(timeEntry.hours) + parseFloat(timeEntry.minutes) / 60;
      } else {
        hours.totalIntangibleHrs +=
          parseFloat(timeEntry.hours) + parseFloat(timeEntry.minutes) / 60;
      }
    }
    return hours;
  };

  async function getWeeklyTangibleHours(member) {
    const startOfWeek = moment()
      .tz('America/Los_Angeles')
      .startOf('week')
      .format('YYYY-MM-DD');
    const endOfWeek = moment()
      .tz('America/Los_Angeles')
      .endOf('week')
      .format('YYYY-MM-DD');

    try {
      const res = await axios.get(
        ENDPOINTS.TIME_ENTRIES_PERIOD(member._id, startOfWeek, endOfWeek),
      );
      const timeEntries = res.data;
      const output = calculateTotalHrsForPeriod(timeEntries);
      const totalTangibleHrs = output.totalTangibleHrs.toFixed(2);
      if (parseFloat(totalTangibleHrs) > 0) {
        return totalTangibleHrs;
      }
      return 0; // Added return statement
    } catch (networkError) {
      // eslint-disable-next-line no-console
      console.log('Network error:', networkError.message);
      throw networkError;
    }
  }

  useEffect(() => {
    const getTeamMembersWeeklyEffort = async () => {
      try {
        const weeklyEfforts = await Promise.all(
          teamMembers.map(member => getWeeklyTangibleHours(member)),
        );
        setTeamMembersWeeklyEffort(weeklyEfforts.filter(effort => !!effort));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.message);
      }
    };
    getTeamMembersWeeklyEffort();
  }, [teamMembers]);

  useEffect(() => {
    const totalWeeklyEffort = teamMembersWeeklyEffort.reduce(
      (accumulator, effort) => accumulator + effort,
      0,
    );
    setTotalTeamWeeklyWorkedHours(Number(totalWeeklyEffort));
  }, [teamMembersWeeklyEffort]);

  // Get Total Tangible Hours this week [SELECTED TEAM]
  // eslint-disable-next-line no-unused-vars
  const [selectedTeamsMembers, setSelectedTeamsMembers] = useState([]);
  const [selectedTeamsWeeklyEffort, setSelectedTeamsWeeklyEffort] = useState([]);

  useEffect(() => {
    const setSelectedTeamsMembersAndEffort = async () => {
      // eslint-disable-next-line no-shadow
      const members = selectedTeams.map(team => allTeamsMembers[team.index]);
      setSelectedTeamsMembers(members);

      if (members) {
        const weeklyEfforts = await Promise.all(
          // eslint-disable-next-line no-shadow
          members.map(team => Promise.all(team.map(member => getWeeklyTangibleHours(member)))),
        );
        // eslint-disable-next-line no-shadow
        const totalWeeklyEfforts = weeklyEfforts.map(team =>
          team.reduce((accumulator, effort) => {
            let localEffort = effort;

            if (localEffort === undefined) {
              localEffort = 0;
            }

            return accumulator + Number(localEffort);
          }, 0),
        );

        setSelectedTeamsWeeklyEffort(totalWeeklyEfforts);
      }
    };

    setSelectedTeamsMembersAndEffort();
  }, [selectedTeams]);

  if (!team) {
    return <h3>Team not found!</h3>;
  }

  return (
    <ReportPage
      contentClassName="team-report-blocks"
      darkMode={darkMode}
      renderProfile={() => (
        <ReportPage.ReportHeader isActive={team.isActive} avatar={<FiUsers />} name={team.teamName} darkMode={darkMode}>
          <div className={darkMode ? 'text-light' : ''}>
            <h5>{moment(team.createdDatetime).format('MMM-DD-YY')}</h5>
            <p>Created Date</p>
          </div>
        </ReportPage.ReportHeader>
      )}
    >
      <ReportPage.ReportBlock className="team-report-main-info-wrapper" darkMode={darkMode}>
        <div className="team-report-main-info-id">
          <div style={{ wordBreak: 'break-all', color: darkMode ? 'white' : ''}} className="update-date">
            <div>
              <span className="team-report-star">&#9733;</span> Team ID: {team._id}
            </div>
            {/*
          This LoginPrivilegesSimulation component will be removed once the backend team link the login privileges.
          It is just to simulate the toggle between the login privileges. The logic is
          inside the userLoginPrivileges.jsx file.
          */}
            {/* <LoginPrivileges selectedInput={selectedInput} handleInputChange={handleInputChange} />  */}
            Last updated:
            {moment(team.modifiedDatetime).format('MMM-DD-YY')}
          </div>
        </div>
      </ReportPage.ReportBlock>
      <UserLoginPrivileges
        role={user.role}
        handleInputChange={handleInputChange}
        teamName={team.teamName}
        teamMembers={teamMembers}
        totalTeamWeeklyWorkedHours={totalTeamWeeklyWorkedHours}
        selectedTeams={selectedTeams}
        selectedTeamsWeeklyEffort={selectedTeamsWeeklyEffort}
        allTeamsMembers={allTeamsMembers}
        darkMode={darkMode}
      />
      <div className="table-mobile">
        <ReportPage.ReportBlock darkMode={darkMode}>
          <div className="input-group input-group-sm d-flex flex-nowrap justify-content-between active-inactive-container">
            <div className="d-flex align-items-center">
              <div className="d-flex flex-column">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="search-by-name" className={`text-left ${darkMode ? 'text-light' : ''}`}>
                  Name
                </label>
                <input
                  type="text"
                  className="form-control rounded-1 mr-3 w-auto"
                  placeholder="Search team name"
                  id="search-by-name"
                  onChange={event => handleSearchByName(event)}
                />
              </div>
              <div className="date-picker-container">
                <div id="task_startDate" className="date-picker-item">
                  <div className="d-flex flex-column">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="search-by-startDate" className={`text-left ${darkMode ? 'text-light' : ''}`}>
                      Created After
                    </label>
                    <DatePicker
                      selected={searchParams.createdAt}
                      onChange={date =>
                        setSearchParams(prevParams => ({
                          ...prevParams,
                          createdAt: new Date(date),
                        }))
                      }
                      className="form-control w-auto"
                      id="search-by-startDate"
                    />
                  </div>
                </div>
                <div id="task_EndDate" className="date-picker-item">
                  <div className="d-flex flex-column">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="search-by-endDate" className={`text-left ${darkMode ? 'text-light' : ''}`}>
                      Modified After
                    </label>
                    <DatePicker
                      selected={searchParams.modifiedAt}
                      onChange={date =>
                        setSearchParams(prevParams => ({
                          ...prevParams,
                          modifiedAt: new Date(date),
                        }))
                      }
                      className="form-control  w-auto"
                      id="search-by-endDate"
                    />
                  </div>
                </div>
                <div className="active-inactive-container">
                  <div className="active-inactive-container-item mr-2">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="active" className={darkMode ? 'text-light' : ''}>Active</label>
                    <input
                      onChange={event => handleCheckboxChange(event)}
                      type="checkbox"
                      placeholder="Search team name"
                      id="active"
                      checked={searchParams.isActive}
                    />
                  </div>
                  <div className="active-inactive-container-item">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="inactive" className={darkMode ? 'text-light' : ''}>Inactive</label>
                    <input
                      onChange={event => handleCheckboxChange(event)}
                      type="checkbox"
                      placeholder="Search team name"
                      id="inactive"
                      checked={searchParams.isInactive}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
  style={{
    width: '100%', 
    maxHeight: 'calc(5 * 40px + 40px)', 
    overflowY: 'auto', 
    overflowX: 'hidden',
  }}
>
  <table
    style={{
      width: '100%', 
      borderCollapse: 'collapse', 
    }}
  >
    <thead>
      <tr>
        <th>All</th>
        <th>Team</th>
        <th>Status</th>
        <th>Team Members</th>
        <th>ID</th>
        <th>Created At</th>
        <th>Modified At</th>
      </tr>
    </thead>
    <tbody>
      {memoizedSearchResults.map((team, index) => (
        <tr key={team._id}>
          <td>
            <input
              type="checkbox"
              onChange={(event) => handleSelectTeam(event, team, index)}
              checked={selectedTeams.some((st) => st.selectedTeam._id === team._id)}
              disabled={
                selectedTeams.length === 4 &&
                !selectedTeams.some((st) => st.selectedTeam._id === team._id)
              }
            />
          </td>
          <td>{team.teamName}</td>
          <td>{handleStatus(team.isActive)}</td>
          <td>{}</td>
          <td>{team._id}</td>
          <td>{handleDate(team.createdDatetime)}</td>
          <td>{handleDate(team.modifiedDatetime)}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </ReportPage.ReportBlock>
      </div>
    </ReportPage>
  );
}

const mapStateToProps = state => ({ state });
export default connect(mapStateToProps, {
  getAllUserTeams,
  postNewTeam,
  deleteTeam,
  updateTeam,
  getTeamMembers,
  deleteTeamMember,
  addTeamMember,
})(TeamReport);
