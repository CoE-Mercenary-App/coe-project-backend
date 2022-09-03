/**
 * 
 * Service Controller
 * methods:
 *  getServices,
 *  newService,
 *  updateService,
 *  deleteService
 * 
 */

const { response } = require('express');
const { ServiceModel } = require('../../models');
const Logger = require('../../log/logger');

const getServices = async(req, res = response) => {

    Logger.logRequest(req);

    const [_service, total] = await Promise.all([

        ServiceModel
        .find()
        .sort({ service: 1 })
        .populate('user', 'name img'),

        ServiceModel.countDocuments()

    ]);

    if (total === 0) {
        return res.status(200).json({
            ok: true,
            msg: 'No Data',
            total: total,
            services: _service
        });
    }

    res.json({
        ok: true,
        msg: 'List of Services',
        total: total,
        services: _service
    });

};


const newService = async(req, res = response) => {

    Logger.logRequest(req);

    const uid = req.uid;
    const _service = new ServiceModel({
        user: uid,
        active: '1',
        created_at: new Date(),
        updated_at: new Date(),
        ...req.body
    });


    try {

        const serviceDB = await _service.save();

        res.json({
            ok: true,
            msg: 'Registered Service',
            service: serviceDB
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error... Service-POST'
        });

    }

};


const updateService = async(req, res = response) => {

    Logger.logRequest(req);


    const id = req.params.id;
    const uid = req.uid;

    try {

        const serviceDB = await ServiceModel.findById(id);

        if (!serviceDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Service not found by ID'
            });

        }

        const _serviceChanges = {
            ...req.body,
            user: uid,
            updated_at: new Date()
        };


        const _serviceUpdated = await ServiceModel.findByIdAndUpdate(id, _serviceChanges, { new: true });


        res.json({
            ok: true,
            msg: 'Service Updated',
            service: _serviceUpdated
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error... Service-PUT'
        });

    }



};


const deleteService = async(req, res = response) => {

    Logger.logRequest(req);

    const id = req.params.id;

    try {

        const serviceDB = await ServiceModel.findById(id);

        if (!serviceDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Service not found by ID'
            });

        }


        await ServiceModel.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'Service Deleted'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error... Service-Delete'
        });

    }

};


Object.assign(module.exports, {
    getServices,
    newService,
    updateService,
    deleteService
});