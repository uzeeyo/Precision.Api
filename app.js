const express = require('express');
const app = express();
const PORT = 9009;
const dotenv = require('dotenv');
const { validateToken } = require('./middleware/auth.js');
const { getPerms } = require('./middleware/perms.js');

dotenv.config();

//Route imports
const customers = require('./routes/customerRouter.js')
const devices = require('./routes/deviceRouter.js')
const invoices = require('./routes/invoiceRouter.js')
const tickets = require('./routes/ticketRouter');
const register = require('./routes/register.js')
const login = require('./routes/loginRouter.js');




app.use(express.json());
app.use('/api/login', login);

//Authenticated routes
app.use(validateToken);
app.use(getPerms)
app.use('/api/customers', customers);
app.use('/api/devices', devices);
app.use('/api/invoices', invoices);
app.use('/api/tickets', tickets);
app.use('/api/register', register);

//Start server
app.listen(PORT, () => console.log('Server is running.'));
