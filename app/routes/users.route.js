const express = require("express"),
  router = express.Router(),
  oauth = require("../helpers/oauth-server");
secure = require("../helpers/secure");

const usersController = require("../controllers/users.controller");

router.route("/signup").post((req, res) => usersController.signUp(secure.decrypt(req), res));
router.route("/login").post((req, res) => usersController.login(secure.decrypt(req), res));
router.route("/social").post((req, res) => usersController.social(secure.decrypt(req), res));
router.route("/uniqueusername").post((req, res) => usersController.uniqueUsername(secure.decrypt(req), res));
router.route("/uniqueemail").post((req, res) => usersController.uniqueEmail(secure.decrypt(req), res));
router.route("/uniquenumber").post((req, res) => usersController.uniqueNumber(secure.decrypt(req), res));
router.route("/").get((req, res) => usersController.list(secure.decrypt(req), res));
router.route("/test").get(async (req, res) => {
  let a = await usersController.list_two(req, res)
});
router.route("/oauth").get(oauth.authorise(), (req, res) => { return res.status(200).send({ success: true }) });
router.route("/getuserbyid").post((req, res) => usersController.userInfobyId(secure.decrypt(req), res));
router.use('/distribute', oauth.authorise()).route("/update-user").post((req, res) => usersController.changeuserInfobyId(secure.decrypt(req), res));

router.use('/distribute', oauth.authorise()).route("/update-password").post((req, res) => usersController.changePassword(secure.decrypt(req), res));
router.route("/forgot-password").post((req, res) => usersController.forgetPass(secure.decrypt(req), res));


module.exports = router;


//back up
// router.route("/signup").post((req, res) => usersController.signUp(secure.decrypt(req), res));
// router.route("/login").post((req, res) => usersController.login(secure.decrypt(req), res));
// router.route("/social").post((req, res) => usersController.social(secure.decrypt(req), res));
// router.route("/uniqueusername").post((req, res) => usersController.uniqueUsername(secure.decrypt(req), res));
// router.route("/uniqueemail").post((req, res) => usersController.uniqueEmail(secure.decrypt(req), res));
// router.route("/uniquenumber").post((req, res) => usersController.uniqueNumber(secure.decrypt(req), res));
// router.route("/").get(oauth.authorise(), (req, res) => usersController.list(secure.decrypt(req), res));
// router.route("/oauth").get(oauth.authorise(), (req, res) => { return res.status(200).send({success: true}) });
// router.route("/getuserbyid").post((req, res) => usersController.userInfobyId(secure.decrypt(req), res));
// router.route("/update-user").post((req, res) => usersController.changeuserInfobyId(secure.decrypt(req), res));
//
// router.route("/update-password").post((req, res) => usersController.changePassword(secure.decrypt(req), res));
// router.route("/forgot-password").post((req, res) => usersController.forgetPass(secure.decrypt(req), res));
