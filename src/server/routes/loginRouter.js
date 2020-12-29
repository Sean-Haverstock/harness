const express = require('express');

const router = express.router;

router.post('/', passport.authenticate, (req, res) => {});
