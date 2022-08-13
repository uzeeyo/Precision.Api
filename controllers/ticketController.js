const { json } = require("express");
const { pool } = require("../config/dbconfig");

const getTickets = async (req, res) => {
    if (!req.perms.getTickets) return res.status(403).send('Not authorized.');

    try {
        const p = await pool.connect();
        const rows = await p.request()
            .execute('getTickets')
        res.send(rows.recordset)
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.')
    }
}

const getTicketsByCustomer  = async (req, res) => {
    if (!req.perms.getTickets) return res.status(403).send('Not authorized.');
    const id = req.params.id;

    try {
        const p = await pool.connect();
        const rows = await p.request()
            .input('customerID', id)
            .execute('getTicketsFromCustomer')

        //JSON formatting
        var tickets = [];
        var currentTicketID = 0;
        var ticket = {}
        rows.recordset.forEach((result, index) => {
            if (result.TicketID != currentTicketID){
                ticket = {};
                ticket.ticketID = result.TicketID;
                ticket.createdAt = result.CreationDate;
                ticket.description = result.Description;
                ticket.devices = [{
                    ticketDeviceID: result.EntryID,
                    deviceID: result.DeviceID,
                    make: result.Make,
                    model: result.Model
                }];
                if ((rows.recordset.length - 1) == index) tickets.push(ticket);
            }
            else {
                    ticket.devices.push({
                    ticketDeviceID: result.EntryID,
                    deviceID: result.DeviceID,
                    make: result.Make,
                    model: result.Model
                })
                tickets.push(ticket);
            }
            currentTicketID = result.TicketID;
        })
        res.send(tickets);

    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

const getTicketDetails = async (req, res) => {
    if (!req.perms.getTickets) return res.status(403).send('Not authorized.');
    const id = req.params.id;

    try {
        const p = await pool.connect();
        const rows = await p.request()
            .input('id', id)
            .execute('getTicketDetails')
        const t = rows.recordset[0];

        //These will all be the same in each row, create them once.
        var ticket = {
            ticketID: t.TicketID,
            createdAt: t.CreationDate,
            invoiceID: t.InvoiceID,
            customer: {
                firstName: t.FirstName,
                lastName: t.LastName,
                phoneNumber: t.PhoneNumber,
                emailAddress: t.EmailAddress,
            },
            description: t.Description,
            notes: [],
            devices: []
        }

        var devices = [];
        var notes = [];
        rows.recordset.forEach((result, index) =>{
            if (!notes.includes(result.NoteID)) {
                ticket.notes.push({
                    noteID: result.NoteID,
                    date: result.CreatedAt,
                    text: result.Text,
                })
                notes += result.NoteID;
            }
            if (!devices.includes(result.DeviceID)) {
                ticket.devices.push({
                    entryID: result.EntryID,
                    deviceID: result.DeviceID,
                    make: result.Make,
                    model: result.Model,
                });
                devices += result.DeviceID;
            }
        })
        res.send(ticket);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

const addTicket = async (req, res) => {
    if (!req.perms.addTickets) return res.status(403).send('Not authorized.');
    const ticket = req.body;
    if (!(ticket.customerID)) return res.status(400).send('Invalid input.');


    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('customerID', ticket.customerID)
            .input('description', ticket.description)
            .input('createdAt', new Date())
            .execute('addTicket')
            res.send(`${affected.rowsAffected} ticket added.`);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

const addTicketNote = async (req, res) => {
    if (!req.perms.addTickets) return res.status(403).send('Not authorized.');
    const note = req.body;
    if (!(note.ticketID && note.text)) return res.status(400).send('Invalid input.');


    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('ticketID', note.ticketID)
            .input('text', note.text)
            .input('createdAt', new Date())
            .execute('addTicketNote')
            res.send(`${affected.rowsAffected} product added to ticket.`);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

const addTicketDevice = async (req, res) => {
    if (!req.perms.addTickets) return res.status(403).send('Not authorized.');
    const note = req.body;
    if (!(note.ticketID && note.deviceID)) return res.status(400).send('Invalid input.');


    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('ticketID', note.ticketID)
            .input('deviceID', note.deviceID)
            .execute('addTicketDevice')
            res.send(`${affected.rowsAffected} device added to ticket.`);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

const deleteTicket = async (req, res) => {
    if (!req.perms.deleteTickets) return res.status(403).send('Not authorized.');
    id = req.params.id;

    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('ticketID', note.ticketID)
            .execute('deleteTicket')
            res.send(`${affected.rowsAffected} ticket deleted.`);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

const deleteTicketNote = async (req, res) => {
    if (!req.perms.editTickets) return res.status(403).send('Not authorized.');
    id = req.params.id;

    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('noteID', id)
            .execute('deleteTicketNote')
            res.send(`${affected.rowsAffected} note deleted.`);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

const deleteTicketDevice = async (req, res) => {
    if (!req.perms.editTickets) return res.status(403).send('Not authorized.');
    id = req.params.id;

    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('noteID', id)
            .execute('deleteTicketNote')
            res.send(`${affected.rowsAffected} device deleted.`);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

module.exports = { getTickets, getTicketsByCustomer, getTicketDetails, addTicket, addTicketNote, addTicketDevice, deleteTicket, deleteTicketNote, deleteTicketDevice }