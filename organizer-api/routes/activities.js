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
    const filters = {};
    const { date } = request.query;
    const requestedDate = new Date(date);
    const nextDayDate = new Date(date);
    nextDayDate.setDate(nextDayDate.getDate() + 1);

    if (date) {
        filters.date = {
            $gte: requestedDate.toISOString().slice(0, 10),
            $lt: nextDayDate.toISOString().slice(0, 10),
        };
    }

    try {
        const activities = await Activity.find(filters).sort({ title: 1 });
        response.json(activities);
    } catch (error) {
        next(error);
    }
});

router.get('/groups', async (request, response, next) => {
    try {
        const activityGroups = await Activity.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    date: '$_id',
                    count: 1,
                },
            },
            {
                $sort: { date: 1 },
            },
        ]);
        response.json(activityGroups);
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
