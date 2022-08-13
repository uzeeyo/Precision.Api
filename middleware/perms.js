const jwt = require('jsonwebtoken')

const roles = {
    //Admin role, all privileges
    '0': {
        getUsers: true,
        addUserAdmins: true,
        addUserLevelOne: true,
        addUserLevelTwo: true,
        editUsers: true,
        deleteUsers: true,
        getCustomers: true,
        addCustomers: true,
        editCustomers: true,
        deleteCustomers: true,
        getDevices: true,
        addDevices: true,
        editDevices: true,
        deleteDevices: true,
        getTickets: true,
        addTickets: true,
        editTickets: true,
        deleteTickets: true,
        getInvoices: true,
        addInvoices: true,
        editInvoices: true,
        deleteInvoices: true,
    },

    //Basic user, lowest privileges 
    '1': {
        getUsers: true,
        addUserAdmins: false,
        addUserLevelOne: false,
        addUserLevelTwo: false,
        editUsers: false,
        deleteUsers: false,
        getCustomers: true,
        addCustomers: true,
        editCustomers: true,
        deleteCustomers: false,
        getDevices: true,
        addDevices: true,
        editDevices: true,
        deleteDevices: false,
        getTickets: true,
        addTickets: true,
        editTickets: true,
        deleteTickets: false,
        getInvoices: true,
        addInvoices: true,
        editInvoices: true,
        deleteInvoices: false,
    },

    //Advanced user
    '2': {
        getUsers: true,
        addUserAdmin: false,
        addUserLevelOne: true,
        addUserLevelTwo: true,
        editUsers: true,
        deleteUsers: false,
        getCustomers: true,
        addCustomers: true,
        editCustomers: true,
        deleteCustomers: false,
        getDevices: true,
        addDevices: true,
        editDevice: true,
        deleteDevices: false,
        getTickets: true,
        addTickets: true,
        editTickets: true,
        deleteTickets: false,
        getInvoices: true,
        addInvoices: true,
        editInvoices: true,
        deleteInvoices: false,
    },

    '9': {
        
    }
}

function searchPerms(id) {
    const perms = roles[id];
    return perms;
}

const getPerms = async (req, res, next) => {
    const token = jwt.decode(req.headers["auth-token"]);
    const perms = searchPerms(token.userLevel);
    req.perms = perms;
    next();
}



module.exports = { searchPerms, getPerms }