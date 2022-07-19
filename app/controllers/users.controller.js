const
  asyncHandler = require("../helpers/asyncMiddleware"),
  secure = require('../helpers/secure'),

  User_detail = require("../models").User_detail,
  User_feature = require("../models").userFeature,
  Token = require("../models").Token,
  user_verification = require("../models").verification,
  crypto = require("crypto"),
  http = require("http"),
  querystring = require("querystring"),
  sendMail = require("../helpers/sendMail"),
  smsHelper = require("../helpers/sms");
CodeGenerator = require("../helpers/CodeGenerator"),
  path = require("path"),
  twilio = require("twilio"),
  Twilio_feedbackwow_credentials = require("../models").Twilio_feedbackwow_credentials,
  // _ = require("lodash"),
  Recipient = require("../models").Email_recipient;
const User = require("../models").User;

const uniqueUsername = asyncHandler(async (req, res) => {
  const username = await User.findOne({ where: { username: req.body.username } });
  console.log('---------------');
  console.log(username);
  console.log('---------------');

  if (username)
    return res.status(200).send({ data: secure.encrypt({ status: true }) })

  return res.status(200).send({ data: secure.encrypt({ status: false }) });
})
const uniqueEmail = asyncHandler(async (req, res) => {
  const email = await User.findOne({ where: { email: req.body.email } });
  console.log('---------------');
  console.log(email);
  console.log('---------------');

  if (email)
    return res.status(200).send({ data: secure.encrypt({ status: true }) })

  return res.status(200).send({ data: secure.encrypt({ status: false }) });
})
const uniqueNumber = asyncHandler(async (req, res) => {
  const number = await User_detail.findOne({ where: { mobile_no: req.body.mobile_no } });
  console.log('---------------');
  console.log(req.body.mobile_no);
  console.log(number);
  console.log('---------------');

  if (number)
    return res.status(200).send({ data: secure.encrypt({ status: true }) })

  return res.status(200).send({ data: secure.encrypt({ status: false }) });
})

const social = asyncHandler(async (req, res) => {
  console.log(`------------------------------------------- TYPE : ${req.body.provider} --------------------------------------`);

  const UserDetail = await User.findOne({ where: { email: req.body.email } });
  let logInInfo
  console.log('UserDetail---****')
  let dataRes
  if (UserDetail) {

    console.log("User exist")
    logInInfo = socialLoginTrunOn(UserDetail).then(function (ResData) {
      console.log('socialLoginTrunOn')
      console.log(ResData)
      dataRes = ResData
      return res.status(200).send({ new: 'data', res: dataRes });
    })

  } else {

  }

  console.log('UserDosetail---****')
  console.log(logInInfo)

  // let options = {
  //   hostname: "localhost",
  //   port: 8081,
  //   path: "http://localhost:8081/users/signUp",
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" }
  // };
  // let request = http.request(options, response => {
  //   var data = [];
  //   response.on("data", chunk => data.push(chunk)).on("end", () => {
  //     console.log("signup data :", JSON.parse(Buffer.concat(data).toString()));
  //   });
  // });
  // request.on("error", err =>
  //   console.log("problem with request: " + err.message)
  // );
  // request.write(fields);
  // request.end();

});

function socialLoginTrunOn(UserDetail) {
  // console.log(UserDetail['dataValues'])
  // console.log(UserDetail.createdAt)

  var data_json = {
    'email': UserDetail.email,
    'username': UserDetail.username,
    'type': 'google',
    'google_id': 'null',
    'fb_id': 'null'
  }

  const formData = querystring.stringify(data_json);
  options = {
    hostname: "localhost",
    port: 8081,
    path: "http://localhost:8081/users/login",
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };
  console.log(options.path)
  return new Promise(async (resolve, reject) => {
    request = http.request(options, function (response) {
      var data = [];
      response.on("data", function (chunk) {
        data.push(chunk)

      }).on("end", () => {

        user = Buffer.concat(data).toString();
        console.log("login data :");
        console.log("login data :", user);

        // response.setHeader("Authorization", "Bearer " + user.access_token);
        resolve({ data: user });
      });
    });
    request.on("error", err =>
      console.log("problem with request: " + err.message)
    );
    request.write(formData);
    request.end();
  })

}

const login = asyncHandler(async (req, res) => {
  var fields = req.body;
  var userExist;
  var checkUser_verified;
  // console.log(fields)
  // console.log('fields')

  if (fields.refresh_token) {
    console.log('refresh_token')
    userTokenExist = await Token.findOne({
      where: { refreshToken: fields.refresh_token }
    });

    if (!userTokenExist) throw { data: secure.encrypt('Something went wrong!') };

    userExist = await User.findById(userTokenExist.user_id);
    fields.grant_type = "refresh_token";
  } else {

    if (fields.type && fields.type == "local") {
      userExist = await User.findOne({
        where: { email: fields.email, password: fields.password }
      })

      // console.log(User)
      // console.log('User')
      // userExist = await User.findOne({ where: { email: fields.email, password: fields.password } });
      // userExist = await User.findAll({ logging: true });
      // userExist = await _User.findAll();

      // console.log('111')
      // console.log(userExist)
      // console.log('userExist')
      var userExist_mobile_no = await User_detail.findOne({
        where: { user_id: userExist.id }
      });
      userExist.dataValues.mobile_no = userExist_mobile_no.mobile_no;
    }

    // if (fields.type && fields.type == "facebook")
    //   userExist = await User.findOne({
    //     where: { email: fields.email, fb_id: fields.fb_id }
    //   });
    var data_json
    if (fields.provider == "google") {
      debugger;
      console.log('google login')
      userExist = await User.findOne({
        where: { email: fields.email, google_id: fields.id }
      });
      // console.log(userExist)
      data_json = {
        'email': fields.email,
        'google_id': fields.id,
        'grant_type': "password",
        'type': "google",
      }
      // console.log('data_json')
      // console.log(data_json)
    }
    fields.grant_type = "password";
    // if(userExist && userExist.id){
    //   checkUser_verified= await user_verification.findOne({
    //     where:{user_id : userExist.id}
    //   });
    //
    // }

  }
  if (!userExist) throw { data: secure.encrypt({ status: 'incorrect', message: 'Email or password is incorrect' }) };

  // if (!checkUser_verified.is_sms_verified) throw { data: secure.encrypt({status: 'unverified', user_id: userExist.id, message: 'You are not verified'})};

  //  REDIRECT ON VERIFY SMS API... MAKE A HELPER FUNCTION FOR SMS

  let formData
  if (fields.provider == "google") {
    formData = querystring.stringify(data_json);
  } else if (fields.type == "local") {
    formData = querystring.stringify(fields);
  }
  // console.log(formData);
  console.log('I am generating token')
  const options = {
    hostname: "localhost",
    port: 8081,
    path: "http://localhost:8081/oauth/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + userExist.clientSecret64
    }
  };

  let request = http.request(options, response => {
    var data = [];
    response
      .on("data", body => {
        data.push(body);
      })
      .on("end", () => {
        token = JSON.parse(Buffer.concat(data).toString());
        console.log('access_token is: ', token.access_token)
        res.setHeader("Authorization", "Bearer " + token.access_token);
        return res.status(200).send({ data: secure.encrypt({ token, userExist }) });
      });
  });
  // request.on("error", err => console.log("problem with request: " + e.message));
  request.write(formData);
  request.end();
});

const signUp = asyncHandler(async (req, res) => {   // Local sigin up + google sign up 
  console.log("Entering signup")
  console.log(req.body)
  if (!req.body.email) {
    throw { data: secure.encrypt({ status: 0, message: "You must provide email, password and type" }) };
  }

  let fields = req.body;
  // console.log('fields :', fields);
  const clientId = crypto.randomBytes(8).toString("hex");
  const secret = crypto.randomBytes(8).toString("hex");
  const clientSecret64 = Buffer.from(clientId + ":" + secret, "ascii").toString("base64");
  var userExist = await User.findOne({ where: { email: fields.email } });
  userExist = JSON.parse(JSON.stringify(userExist));
  // console.log('userExist: ', userExist)
  if (userExist && fields.type != "local") {
    // throw { data: secure.encrpyt({ status: 0, message: "User exists already" }) }
    return res.status(200).send({ data: secure.encrypt({ status: 0, message: "User exists already" }) });
  }

  // CHECKS FOR EXISTING MOBILE NUMBER
  if (fields && fields.mobile_no) {
    console.log('6')
    fields.mobile_no = fields.mobile_no.replace(' ', '+');
    const checkMobileNo = await User_detail.findOne({ where: { mobile_no: fields.mobile_no } });
    console.log('checkMobileNo: ', checkMobileNo)
    if (checkMobileNo) {
      throw { data: secure.encrypt({ status: 0, message: "This number is already in use. Please enter a different number." }) }
    }
  }
  // console.log('7')
  fields.clientId = clientId;
  fields.secret = secret;
  fields.clientSecret64 = clientSecret64;

  // console.log('------------------------- FIELD TYPE ---------------------------- \n', fields.type, '\n ------------------------- FIELD TYPE ----------------------------');
  if (fields.type == "null" || (fields.type != 'facebook' && fields.type != 'google')) {
    // without verification of sms code user cannot login
    fields.is_verified = false;
    fields.type = 'local';
  }
  // console.log('------------------------- FIELD TYPE ---------------------------- \n', fields.type, '\n ------------------------- FIELD TYPE ----------------------------');
  (fields.type === 'facebook' || fields.type === 'google') ? fields.is_verified = true : null;
  // console.log('------------------------- FIELD TYPE ---------------------------- \n', fields.type, '\n ------------------------- FIELD TYPE ----------------------------');
  // const data = await User.create(userFields);
  const data = await User.create(fields);
  if (!data)
    // throw "THIS NUMBER IS ALREADY IN USE. PLEASE ENTER A DIFFERENT NUMBER";
    throw { data: secure.encrpyt({ status: 0, message: "Signup unseccessful. Please try again." }) }

  const user_details = await User_detail.create({
    // full_name: fields.full_name,
    mobile_no: fields.mobile_no,
    user_id: data.id
  });
  const userFeature = await User_feature.create({
    // full_name: fields.full_name,
    FeatureJson: JSON.stringify({ "text": true, "mcq": true }),
    totalsms: "500",
    totalemail: "500",
    UserID: data.id
  });

  if (!user_details)
    throw { data: secure.encrypt({ status: 0, message: "Could not add mobile number. Please try again." }) }

  if (fields.type === 'local') {

    // if(fields && fields.mobile_no){
    //   const verification = await CodeGenerator.generate(data.id, fields.mobile_no, fields.email);
    //   if (!verification)
    //   throw { data: secure.encrpyt({ status:0, message: "Something went wrong. Please try again." })}
    //
    //   // console.log(data);
    //   // console.log(verification);
    //   console.log("verification--------------------- ", verification);
    //   console.log("data==================================  ", data);
    //   var login_via_signuppp=await login_via_signup(data);
    //
    //   // login_via_signup(data).then(result => {
    //   //   if(result){
    //   //
    //   //     console.log('<<<<----------------------->>>', result);
    //   //     // console.log('<<<<<----------------------->>>');
    //   //
    //   //   }else {
    //   //     // console.log('----------------------->>> :', result);
    //   //   }
    //   //
    //   // })
    //
    //   return res.status(200).send({data: secure.encrypt({data, verification})});
    //
    // }
    if (fields && fields.email) {
      const verification = await CodeGenerator.generate(
        {
          userId: data.id,
          num: fields.mobile_no,
          email: fields.email,
          is_email_veri: null,
          is_sms_veri: null,
          regen: null
        }
      );
      if (!verification) {
        throw { data: secure.encrpyt({ status: 0, message: "Something went wrong. Please try again." }) }
      }
      console.log("verification--------------------- ", verification);
      // console.log("data==================================  ", data);
      // console.log(verification);
      var login_via_signuppp = await login_via_signup(data, res).then(function (ResData) {
        console.log(ResData)
        console.log('Sign up successfullly done');
        return res.status(200).send({ data: secure.encrypt({ ResData, verification }) });
      });
    }
  }
  else {
    console.log('Sign up through google')

    if (fields && fields.email) {
      const verification = await CodeGenerator.generate(
        {
          userId: data.id,
          num: fields.mobile_no,
          email: fields.email,
          is_email_veri: null,
          is_sms_veri: null,
          regen: null
        }
      );
      if (!verification) {
        throw { data: secure.encrypt({ status: 0, message: "Something went wrong. Please try again." }) }
      }
      // console.log("verification--------------------- ", verification);
      // console.log("data==================================  ", data);
      // console.log(verification);
      var _social_login_via_signup = await social_login_via_signup(data, res).then(function (ResData) {
        console.log(ResData)
        console.log('Sign up successfullly done');
        return res.status(200).send({ data: secure.encrypt({ ResData, verification }) });
      });
    }

  }

});

const login_via_signup = async function (user, res) {
  console.log('function run: login_via_signup')
  if (user && user.email && user.password) {

    let userExist = await User.findOne({
      where: { email: user.email, password: user.password }
    });
    // console.log("user to get token-------------------------------    ", user);
    var data_json = {
      'email': user.email,
      'password': user.password,
      'grant_type': "password",
      'type': "local",
    }
    const formData = querystring.stringify(data_json);
    const options = {
      hostname: "localhost",
      port: 8081,
      path: "http://localhost:8081/oauth/token",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + userExist.clientSecret64
      }
    };

    return new Promise(function (resolve, reject) {
      const ClientRequest = http.request(options, function (response) {
        var data = [];
        response.on("data", function (body) {
          data.push(body);
          console.log('Data push on getting token')

        }).on("end", function () {
          token = JSON.parse(Buffer.concat(data).toString());
          // console.log('token')
          // console.log(token)
          res.setHeader("Authorization", "Bearer " + token.access_token);
          resolve({ data: { token, userExist } });
        });
      });
      ClientRequest.on("error", err => {
        // reject on bad status
        console.log("problem with request: " + e.message)
      });
      ClientRequest.write(formData);
      ClientRequest.end();
    })
  }
}

const social_login_via_signup = async function (user, res) {
  console.log('function run: login_via_signup google')
  if (user && user.email) {

    let userExist = await User.findOne({
      where: { email: user.email }
    });
    // console.log("user to get token-------------------------------    ", user);
    // console.log("userExist to get token-------------------------------    ", userExist);

    var data_json = {
      'email': user.email,
      'google_id': user.google_id,
      'grant_type': "password",
      'type': "google",
    }
    const formData = querystring.stringify(data_json);
    const options = {
      hostname: "localhost",
      port: 8081,
      path: "http://localhost:8081/oauth/token",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + userExist.clientSecret64
      }
    };

    return new Promise(function (resolve, reject) {
      const ClientRequest = http.request(options, function (response) {
        var data = [];
        response.on("data", function (body) {
          data.push(body);
          console.log('Data push on getting token')

        }).on("end", function () {
          token = JSON.parse(Buffer.concat(data).toString());
          // console.log('token')
          // console.log(token)
          res.setHeader("Authorization", "Bearer " + token.access_token);
          resolve({ data: { token, userExist } });
        });
      });
      ClientRequest.on("error", err => {
        // reject on bad status
        console.log("problem with request: " + e.message)
      });
      ClientRequest.write(formData);
      ClientRequest.end();
    })
  }
}

const list = asyncHandler(async (req, res) => {
  try {
    data = await User.findOne();
  } catch (error) {
    console.log(error)
  }
  return res.status(200).send({ data: secure.encrypt(data), new: data });
});
// select * from user
const list_two = async (req, res) => {

  let data
  try {
    data = await User.findAll({ logging: true });
  } catch (error) {
    console.log(error)
  }
  return res.status(200).send({ new: data });
};

// this api will hit when user come to profile page
const userInfobyId = asyncHandler(async (req, res) => {
  // user id as PARAMETER
  // let userId= req.id;
  let userId = 1; // for developmet only remove it
  let UserData = await User.findOne({ where: { id: userId } });
  return res.status(200).send(UserData);

})

const changeuserInfobyId = asyncHandler(async (req, res) => {

  if (!req.body && !req.body.id && (!req.body.username && !req.body.email))
    throw "NO PARAMETERS FOUND";
  let UserData = await User.findOne({ where: { id: req.body.id } });
  let userUpdate = await User.update(req.body, { where: { id: req.body.id }, returning: true });
  let userUpdate_num = await User_detail.update({ "mobile_no": req.body.mobile_no }, { where: { user_id: req.body.id }, returning: true });

  if (!userUpdate)
    throw "USER UPDATE FAILED";
  let UpdatedUserData = await User.findOne({ where: { id: UserData.id } });
  let UpdatedUserData_mobilenum = await User_detail.findOne({ where: { user_id: UserData.id } });
  console.log("UpdatedUserData  >>>>>>  ", UpdatedUserData.dataValues);
  console.log("UpdatedUserData_mobilenum  >>>>>>  ", UpdatedUserData_mobilenum.dataValues);
  UpdatedUserData.dataValues.mobile_no = UpdatedUserData_mobilenum.dataValues.mobile_no;
  return res.status(200).send({ data: secure.encrypt(UpdatedUserData) });

})

const changePassword = asyncHandler(async (req, res) => {
  if (!req.boody && !req.body.id && (!req.body.current_password || !req.body.new_password))
    throw "NO PARAMETERS FOUND";

  let userData = await User.findOne({ where: { id: req.body.id, password: req.body.current_password } });
  if (!userData)
    throw { status: 0, message: "INVALID CURRENT PASSWORD" };
  let userUpdate = await User.update({ password: req.body.new_password }, {
    where: { id: req.body.id, password: req.body.current_password }, returning: true
  });
  if (!userUpdate)
    throw "USER UPDATE FAILED";

  return res.status(200).send({ data: secure.encrypt({ status: "true", message: "User updated successfully" }) });
})

const forgetPass = asyncHandler(async (req, res) => {
  if (!req.body && !req.body.mobile_no)
    throw { data: secure.encrypt({ status: 0, err: 'NO PARAMETERS FOUND' }) }

  let phoneNum = await User_detail.findOne({ where: { mobile_no: req.body.mobile_no } });
  if (!phoneNum)
    throw { data: secure.encrypt({ status: 0, err: 'This number is not associated with any account.' }) }


  const crypto = require('crypto');
  let newpass = crypto.randomBytes(4).toString('hex');
  const credentials = await Twilio_feedbackwow_credentials.findOne();
  if (!credentials)
    throw { data: secure.encrypt({ status: 0, err: 'Something went wrong. Please try again later.' }) }

  const client = require("twilio")(credentials.sid, credentials.auth_token);
  let changePass = await User.update({ password: newpass }, { where: { id: phoneNum.id }, returning: true });
  if (!changePass)
    throw { data: secure.encrypt({ status: 0, err: 'Failed to update password. Please try again.' }) }

  let obj = {
    to: phoneNum.mobile_no,
    from: "+18329811222",
    body: "Your password has been change, your new password is: " + newpass,
  }

  const sendPassword = await smsHelper.sendPassword(obj, true);

  return res.status(200).send({ data: secure.encrypt({ status: 1 }) });
})

module.exports = {
  login_via_signup,
  forgetPass,
  changePassword,
  changeuserInfobyId,
  userInfobyId,
  login,
  signUp,
  social,
  list,
  list_two,
  uniqueUsername,
  uniqueEmail,
  uniqueNumber
};
