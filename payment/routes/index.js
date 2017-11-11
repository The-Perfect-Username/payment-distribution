var express = require('express');
var router = express.Router();

var data = {
        video_id: 2832,
        collaborators: [
            {
                id: "20328",
                channel: "The-Perfect-Username",
                views: (237 + 75 + 27),
                revenue: (0.21 + 0.00 + 0.00),
                creation: "2017-11-10 07:23:45"
            },
            {
                id: "50284",
                channel: "NewUser",
                views: (728 + 123 + 302),
                revenue: (0.73 + 0.03 + 0.00),
                creation: "2017-11-10 04:35:15"
            },
            {
                id: "10378",
                channel: "Whodeanii",
                views: (829 + 13 + 7492),
                revenue: (0.88 + 0.00 + 4.67),
                creation: "2017-11-10 03:34:00"
            }
        ]
    };

var monthly = [
    {
        id: 1,
        channel_id: "20328",
        channel: "The-Perfect-Username",
        views: 237,
        revenue: 0.21,
        creation: "2017-11-10 07:23:45"
    },
    {
        id: 2,
        channel_id: "50284",
        channel: "NewUser",
        views: 728,
        revenue: 0.73,
        creation: "2017-11-10 04:35:15"
    },
    {
        id: 3,
        channel_id: "10378",
        channel: "Whodeanii",
        views: 829,
        revenue: 0.88,
        creation: "2017-11-10 03:34:00"
    },
    {
        id: 4,
        channel_id: "20328",
        channel: "The-Perfect-Username",
        views: 75,
        revenue: 0.00,
        creation: "2017-11-10 07:23:45"
    },
    {
        id: 5,
        channel_id: "50284",
        channel: "NewUser",
        views: 123,
        revenue: 0.03,
        creation: "2017-11-10 04:35:15"
    },
    {
        id: 6,
        channel_id: "10378",
        channel: "Whodeanii",
        views: 13,
        revenue: 0.00,
        creation: "2017-11-10 03:34:00"
    },
    {
        id: 7,
        channel_id: "20328",
        channel: "The-Perfect-Username",
        views: 27,
        revenue: 0.00,
        creation: "2017-11-10 07:23:45"
    },
    {
        id: 8,
        channel_id: "50284",
        channel: "NewUser",
        views: 302,
        revenue: 0.01,
        creation: "2017-11-10 04:35:15"
    },
    {
        id: 9,
        channel_id: "10378",
        channel: "Whodeanii",
        views: 7492,
        revenue: 4.67,
        creation: "2017-11-10 03:34:00"
    }
]

/* GET home page. */
router.get('/', function(req, res, next) {
    var totals = {revenue: 0, views: 0, collaborators: 0};

    for (var i = 0; i < data.collaborators.length; i++) {
        totals['revenue'] += data.collaborators[i].revenue;
        totals['views'] += data.collaborators[i].views;
        totals['collaborators'] += 1;
    }

    res.locals.totals = totals;
    res.render('index', { title: 'Express' });
});

router.get('/collaborators', function(req, res, next) {
    res.status(200).json(data);
});

router.get('/reports', function(req, res, next) {
    res.status(200).json(monthly);
});

module.exports = router;
