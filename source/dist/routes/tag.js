var express = require('express'),
    router = express.Router(),
    Tag = require('../models/tag'),
    jwtAuth = require('../config/jwtAuth.js'),
    setting = require('../config/setting.js');

router
    .get('/api/tags', function (req, res, next) {
        var options = {
            sortBy: {displayOrder:1},
            page: req.query.page - 1,
            count: req.query.count
        };
        Tag.list(options, function (err, tags) {
            Tag.count({}, function (err, total) {
                res.send({
                    rows: tags,
                    pagination: {
                        count: parseInt(req.query.count),
                        page: parseInt(req.query.page),
                        pages: Math.round(total / req.query.count),
                        size: total
                    }
                });
            });
        });
    })
    .get('/api/tags/all', function (req, res, next) {
        var options = {
            filter: {enabled: true},
            sortBy: {displayOrder:1}
        };
        Tag.getAllByFilters(options, function (err, tags) {
            res.send({
                error: err,
                data: tags
            });
        });
    })
    .get('/api/tags/:id', function (req, res, next) {
        Tag.getById(req.params.id, function (err, tag) {
            res.send({
                error: err,
                data: tag
            });
        });
    })
    .post('/api/tags', jwtAuth, function (req, res, next) {
        var tag = new Tag(req.body);
        tag.save(function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    })
    .put('/api/tags/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        Tag.update2(req.params.id, modify, function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    })
    .delete('/api/tags/:id', jwtAuth, function (req, res, next) {
        Tag.delete(req.params.id, function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    });

module.exports = router;