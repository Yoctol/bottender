/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of fbsamples/messenger-bot-samples.
 */

// ===== MODULES ===============================================================
const { Router } = require('express');

const router = Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

module.exports = router;
