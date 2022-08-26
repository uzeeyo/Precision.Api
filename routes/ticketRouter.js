const express = require('express');

const { 
    getTickets, 
    getTicketsByCustomer, 
    getTicketDetails, 
    addTicket, 
    addTicketNote, 
    addTicketDevice, 
    deleteTicket, 
    deleteTicketNote, 
    deleteTicketDevice, 
    editTicketNote
} = require('../controllers/ticketController.js');

const router = express.Router();

router.get('/', getTickets);
router.get('/:id', getTicketDetails);
router.get('/customer/:id', getTicketsByCustomer);
router.post('/', addTicket);
router.post('/notes', addTicketNote);
router.post('/devices', addTicketDevice);
router.put('/notes/:id', editTicketNote)
router.delete('/', deleteTicket);
router.delete('/notes/:id', deleteTicketNote);
router.delete('/devices/:id', deleteTicketDevice);


module.exports = router