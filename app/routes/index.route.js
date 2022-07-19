let express = require('express'),
  router = express.Router(),
  oauth = require('../helpers/oauth-server'),
  helmet = require('helmet');


router.use('/users', require('./users.route'));

router.use('/oauth/allow', oauth.authorise(), (req, res) => { return res.status(200).send({ success: true }) })
router.use(helmet());
router.all('/oauth/token', oauth.grant());
router.get('*', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
  });
});

module.exports = router;
