var express = require('express');
var router = express.Router();

var data = {
        video_id: 2832,
        collaborators: [
            {
                id: "20328",
                channel: "The-Perfect-Username",
                views: 2075,
                revenue: 0.47,
                creation: "2017-11-10 07:23:45"
            },
            {
                id: "50284",
                channel: "NewUser",
                views: 302893,
                revenue: 35.73,
                creation: "2017-11-10 04:35:15"
            },
            {
                id: "10378",
                channel: "Whodeanii",
                views: 93023,
                revenue: 12.18,
                creation: "2017-11-10 03:34:00"
            }
        ]
    };

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

module.exports = router;
