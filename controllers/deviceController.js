const { pool } = require("../config/dbconfig.js")

const getDevices = async (req, res) => {
    if (req.perms.getDevices != true || req.perms.getDevices == undefined) return res.status(403).send('Not authorized.')
    try {
        const p = await pool.connect();
        const rows = await p.request()
            .execute('getDevices')
        res.send(rows.recordset);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

const addDevice = async (req, res) => {
    if (req.perms.addDevices != true || req.perms.addDevices == undefined) return res.status(403).send('Not authorized.')
    const device = req.body;
    if (!(device.make && device.model && device.osType)) return res.status(400).send('Invalid input.');


    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('make', device.make)
            .input('model', device.model)
            .input('ostype', device.osType)
            .input('createdAt', new Date())
            .execute('addDevice')
            res.send(`${affected.rowsAffected} device added.`);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

const editDevice = async (req, res) => {
    if (req.perms.editDevices != true || req.perms.editDevices == undefined) return res.status(403).send('Not authorized.');
    const deviceID = device.deviceID;
    const device = req.body;
    if (!(device.make && device.model && device.osType)) return res.status(400).send('Invalid input.');

    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('deviceID', deviceID)
            .input('make', device.make)
            .input('model', device.model)
            .input('ostype', device.osType)
            .input('updatedAt', new Date())
            .execute('editDevice');
        res.send(`${affected.rowsAffected} device updated.`);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

const deleteDevice = async (req, res) => {
    if (req.perms.deleteDevices != true || req.perms.deleteDevices == undefined) return res.status(403).send('Not authorized.')
    const id = req.params.id;

    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('id', id)
            .execute('deleteDevice');
        
        res.send(`${affected.rowsAffected} device deleted.`);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

module.exports = { getDevices, addDevice, editDevice, deleteDevice }