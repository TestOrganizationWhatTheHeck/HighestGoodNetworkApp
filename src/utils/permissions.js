const permissions = {
    'Administrator' : [
        'seeWeeklySummaryReports',
        'seeUserManagement',
        'seeBadgeManagement',
        'seePopupManagement',
        'deleteOwnBadge',
        'modifyOwnBadgeAmount',
        'toggleWeeklySummary',
        'editTimelogInfo',
        'addTimeEntryOthers',
        'toggleTangibleTime',
        'changeIntangibleTimeEntryDate',
        'editTimeEntry',
        'deleteTimeEntry',
        'deleteWbs',
        'addTask',
        'deleteTask',
        'editTask',
        'addWbs',
        'addProject',
        'deleteProject',
        'editProject',
    ],
    'Volunteer': [
        'V'
    ],
    'Core Team': [
        'seeWeeklySummaryReports',
    ],
    'Manager': [
        'seeWeeklySummaryReports',
    ],
    'Mentor': [
        'M'
    ],
    'Owner': [
        'seeWeeklySummaryReports',
        'seeUserManagement',
        'seeBadgeManagement',
        'seePopupManagement',
        'deleteOwnBadge',
        'modifyOwnBadgeAmount',
        'toggleWeeklySummary',
        'editTimelogInfo',
        'addTimeEntryOthers',
        'toggleTangibleTime',
        'changeIntangibleTimeEntryDate',
        'editTimeEntry',
        'deleteTimeEntry',
        'deleteWbs',
        'addTask',
        'deleteTask',
        'editTask',
        'addWbs',
        'addProject',
        'deleteProject',
        'editProject',
    ],
};

const hasPermission = (role, action) => {
    let isAllowed;
    console.log('user role permissions: ', permissions[role]);
    if (permissions[role].includes(action)) {
        isAllowed = true;
    } else {
        isAllowed = false;
    }
    return isAllowed;
};

export default hasPermission;
