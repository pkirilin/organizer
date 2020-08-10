const { Router } = require('express');
const { Activity } = require('../models');

const router = Router();

router.param('id', async (request, response, next, id) => {
    try {
        const activity = await Activity.findById(id);

        if (!activity) {
            response.status(404).end();
        }

        request.activity = activity;
        next();
    } catch (error) {
        next(error);
    }
});

router.get('/', async (request, response, next) => {
    try {
        const activities = await Activity.find({});
        response.json(activities);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (request, response) => {
    response.json(request.activity);
});

router.post('/', async (request, response, next) => {
    const { date, title } = request.body;
    const activity = new Activity({
        date,
        title,
    });

    try {
        await activity.save();
        response.end();
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (request, response, next) => {
    const { date, title } = request.body;
    request.activity.date = date;
    request.activity.title = title;

    try {
        await request.activity.save();
        response.end();
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (request, response, next) => {
    try {
        await request.activity.remove();
        response.end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
