const APIEndpoint =
  process.env.REACT_APP_APIENDPOINT || 'https://hgn-rest-beta.azurewebsites.net/api';
const GeocodeAPIEndpoint = 'https://api.opencagedata.com/geocode/v1/json';

export const ENDPOINTS = {
  APIEndpoint: () => APIEndpoint,
  USER_PROFILE: userId => `${APIEndpoint}/userprofile/${userId}`,
  USER_PROFILE_PROPERTY: userId => `${APIEndpoint}/userprofile/${userId}/property`,
  USER_PROFILES: `${APIEndpoint}/userprofile/`,
  INFO_COLLECTIONS: `${APIEndpoint}/informations`,
  INFO_COLLECTION: infoId => `${APIEndpoint}/informations/${infoId}`,
  USER_PROFILE_BY_NAME: userName => `${APIEndpoint}/userProfile/name/${userName}`,
  USER_TEAM: userId => `${APIEndpoint}/userprofile/teammembers/${userId}`,
  USER_REFRESH_TOKEN: userId => `${APIEndpoint}/refreshToken/${userId}`,
  LOGIN: `${APIEndpoint}/login`,
  PROJECTS: `${APIEndpoint}/projects`,
  TEAM: `${APIEndpoint}/team`,
  TEAM_DATA: teamId => `${APIEndpoint}/team/${teamId}`,
  TEAM_USERS: teamId => `${APIEndpoint}/team/${teamId}/users`,
  USER_PROJECTS: userId => `${APIEndpoint}/projects/user/${userId}`,
  PROJECT: `${APIEndpoint}/project/`,
  PROJECT_BY_ID: projectId => `${APIEndpoint}/project/${projectId}`,

  PROJECT_MEMBER: projectId => `${APIEndpoint}/project/${projectId}/users`,
  UPDATE_PASSWORD: userId => `${APIEndpoint}/userprofile/${userId}/updatePassword`,
  FORCE_PASSWORD: `${APIEndpoint}/forcepassword`,
  LEADER_BOARD: userId => `${APIEndpoint}/dashboard/leaderboard/${userId}`,
  ORG_DATA: `${APIEndpoint}/dashboard/leaderboard/org/data`,
  TIME_ENTRIES_PERIOD: (userId, fromDate, toDate) =>
    `${APIEndpoint}/TimeEntry/user/${userId}/${fromDate}/${toDate}`,
  TIME_ENTRIES_USER_LIST: `${APIEndpoint}/TimeEntry/users`,
  TIME_ENTRIES_LOST_USER_LIST: `${APIEndpoint}/TimeEntry/lostUsers`,
  TIME_ENTRIES_LOST_PROJ_LIST: `${APIEndpoint}/TimeEntry/lostProjects`,
  TIME_ENTRIES_LOST_TEAM_LIST: `${APIEndpoint}/TimeEntry/lostTeams`,
  TIME_ENTRY: () => `${APIEndpoint}/TimeEntry`,
  TIME_ENTRY_CHANGE: timeEntryId => `${APIEndpoint}/TimeEntry/${timeEntryId}`,
  WBS_ALL: `${APIEndpoint}/wbs`,
  WBS: projectId => `${APIEndpoint}/wbs/${projectId}`,
  WBS_USER: userId => `${APIEndpoint}/wbs/user/${userId}`,
  GET_WBS: wbsId => `${APIEndpoint}/wbsId/${wbsId}`,
  TASKS: (wbsId, level, mother) => `${APIEndpoint}/tasks/${wbsId}/${level}/${mother || '0'}`,
  TASK: wbsId => `${APIEndpoint}/task/${wbsId}`,
  TASK_IMPORT: wbsId => `${APIEndpoint}/task/import/${wbsId}`,
  TASK_WBS_DELETE: wbsId => `${APIEndpoint}/task/wbs/del/${wbsId}`,
  TASK_WBS: wbsId => `${APIEndpoint}/task/wbs/${wbsId}`,
  TASKS_UPDATE: `${APIEndpoint}/tasks/update`,
  TASKS_BY_USERID: userId => `${APIEndpoint}/tasks/user/${userId}`,
  // TASKS_BY_userID: userId => `${APIEndpoint}/tasks/userProfile/${userId}`,
  TASK_DEL: (taskId, motherId) => `${APIEndpoint}/task/del/${taskId}/${motherId}`,
  GET_TASK: taskId => `${APIEndpoint}/task/${taskId}`,
  TASK_UPDATE: taskId => `${APIEndpoint}/task/update/${taskId}`,
  TASK_UPDATE_STATUS: taskId => `${APIEndpoint}/task/updateStatus/${taskId}`,
  DELETE_CHILDREN: taskId => `${APIEndpoint}/task/delete/children/${taskId}`,
  GET_USER_BY_NAME: name => `${APIEndpoint}/userprofile/name/${name}`,
  FIX_TASKS: wbsId => `${APIEndpoint}/tasks/${wbsId}`,
  UPDATE_PARENT_TASKS: wbsId => `${APIEndpoint}/task/updateAllParents/${wbsId}`,
  MOVE_TASKS: wbsId => `${APIEndpoint}/tasks/moveTasks/${wbsId}`,
  WEEKLY_SUMMARIES_REPORT: () => `${APIEndpoint}/reports/weeklysummaries`,
  POPUP_EDITORS: `${APIEndpoint}/popupeditors/`,
  POPUP_EDITOR_BY_ID: id => `${APIEndpoint}/popupeditor/${id}`,
  POPUP_EDITOR_BACKUP_BY_ID: id => `${APIEndpoint}/backup/popupeditor/${id}`,

  TEAM_MEMBERS: teamId => `${APIEndpoint}/team/${teamId}/users`,
  TEAM_BY_ID: teamId => `${APIEndpoint}/team/${teamId}`,
  USER_UNREAD_TASK_NOTIFICATIONS: userId => `${APIEndpoint}/tasknotification/user/${userId}`,
  BADGE: () => `${APIEndpoint}/badge`,
  BADGE_ASSIGN: userId => `${APIEndpoint}/badge/assign/${userId}`,
  BADGE_BY_ID: badgeId => `${APIEndpoint}/badge/${badgeId}`,

  TEAM_MEMBER_TASKS: userId => `${ENDPOINTS.APIEndpoint()}/user/${userId}/teams/tasks`,
  CREATE_OR_UPDATE_TASK_NOTIFICATION: taskId =>
    `${ENDPOINTS.APIEndpoint()}/task/${taskId}/tasknotification`,
  DELETE_TASK_NOTIFICATION: taskNotificationId =>
    `${APIEndpoint}/tasknotification/${taskNotificationId}`,

  DELETE_TASK_NOTIFICATION_BY_USER_ID: (taskId, userId) =>
    `${APIEndpoint}/tasknotification/${userId}/${taskId}`,
  TASK_EDIT_SUGGESTION: () => `${APIEndpoint}/taskeditsuggestion`,
  REJECT_TASK_EDIT_SUGGESTION: taskEditSuggestionId =>
    `${APIEndpoint}/taskeditsuggestion/${taskEditSuggestionId}`,

  TIMER_SERVICE: `${APIEndpoint.replace('http', 'ws').replace('api', 'timer-service')}`,
  TIMEZONE_KEY: `${APIEndpoint}/timezone`,
  GEOCODE_URI: (location, key) =>
    `${GeocodeAPIEndpoint}?key=${key}&q=${encodeURIComponent(location)}&pretty=1&limit=1`,

  ROLES: () => `${APIEndpoint}/roles`,
  ROLES_BY_ID: roleId => `${APIEndpoint}/roles/${roleId}`,

  PRESETS: () => `${APIEndpoint}/rolePreset`,
  PRESETS_BY_ID: (roleNameOrPresetId) => `${APIEndpoint}/rolePreset/${roleNameOrPresetId}`,

  OWNERMESSAGE: () => `${APIEndpoint}/ownerMessage`,

  AI_PROMPT: () => `${APIEndpoint}/dashboard/aiPrompt`,
  SETUP_NEW_USER: () =>
    `${APIEndpoint}/getInitialSetuptoken`,
  VALIDATE_TOKEN: () =>
    `${APIEndpoint}/validateToken`,
  SETUP_NEW_USER_PROFILE: () =>
    `${APIEndpoint}/ProfileInitialSetup`,
  TIMEZONE_KEY_BY_TOKEN: () => `${APIEndpoint}/getTimeZoneAPIKeyByToken`,
  MAP_LOCATIONS_BY_TOKEN: () => `${APIEndpoint}/mapLocationsToken`,
  ALL_MAP_LOCATIONS: () => `${APIEndpoint}/mapLocations`,



  //reasons endpoints
  CREATEREASON: () => {
    return `${APIEndpoint}/reason/`
  },
  GETALLUSERREASONS: (userId) => {
    return `${APIEndpoint}/reason/${userId}`
  },
  GETSINGLEREASONBYID: (userId) => {
    return `${APIEndpoint}/reason/single/${userId}`
  },
  PATCHUSERREASONBYID: (userId) => {
    return `${APIEndpoint}/reason/${userId}`
  },
  DELETEUSERREASONBYID: (userId) => {
    return `${APIEndpoint}/reason/${userId}`
  },

  MOUSEOVERTEXT: () => `${APIEndpoint}/mouseoverText`,
  MOUSEOVERTEXT_BY_ID: mouseoverTextId => `${APIEndpoint}/mouseoverText/${mouseoverTextId}`,
  PERMISSION_CHANGE_LOGS: (userId) => `${APIEndpoint}/permissionChangeLogs/${userId}`,

  GET_TOTAL_COUNTRY_COUNT: () => `${APIEndpoint}/getTotalCountryCount`,

  // bm dashboard endpoints
  BM_LOGIN: `${APIEndpoint}/bm/login`,
  BM_MATERIAL_TYPES: `${APIEndpoint}/bm/invtypes/materials`,
  BM_MATERIAL_TYPE: `${APIEndpoint}/bm/invtypes/material`,
  BM_MATERIALS: `${APIEndpoint}/bm/materials`,
  BM_CONSUMABLES: `${APIEndpoint}/bm/consumables`,
  BM_PROJECTS: `${APIEndpoint}/bm/projects`,
  BM_TOOLS: `${APIEndpoint}/bm/tools`,
  BM_UPDATE_MATERIAL: `${APIEndpoint}/bm/updateMaterialRecord`,
  BM_UPDATE_MATERIAL_BULK: `${APIEndpoint}/bm/updateMaterialRecordBulk`,
  POST_LESSON: `${APIEndpoint}/bm/lessons/new`,
  BM_INVENTORY_UNITS: `${APIEndpoint}/bm/inventoryUnits`,
  BM_INVTYPE_ROOT: `${APIEndpoint}/bm/invtypes`,
  BM_TOOL_BY_ID: singleToolId => `${APIEndpoint}/bm/tools/${singleToolId}`,
  BM_INVTYPE_TYPE: (type) => `${APIEndpoint}/bm/invtypes/${type}`,
  BM_UPDATE_MATERIAL_BULK: `${APIEndpoint}/bm/updateMaterialRecordBulk`,
  BM_PROJECTS: `${APIEndpoint}/bm/projects`,
  GET_TIME_OFF_REQUESTS: () => `${APIEndpoint}/getTimeOffRequests`,
  ADD_TIME_OFF_REQUEST: () => `${APIEndpoint}/setTimeOffRequest`,
  UPDATE_TIME_OFF_REQUEST: (id) => `${APIEndpoint}/updateTimeOffRequest/${id}`,
  DELETE_TIME_OFF_REQUEST: (id) => `${APIEndpoint}/deleteTimeOffRequest/${id}`
};

export const ApiEndpoint = APIEndpoint;
