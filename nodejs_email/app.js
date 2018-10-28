var constants = require('../constants');
var nodemailer = require('nodemailer');  

var smtpTransport = nodemailer.createTransport('smtps://' + constants.senderGmailIdForSES() + '%40gmail.com:' + constants.senderGmailPasswordForSES() + '@smtp.gmail.com');

var mailOptions = {  
    from: 'REET <' + constants.senderGmailIdForSES() + '@gmail.com>',
    to: constants.receiverGmailIdForSES() + '@gmail.com',
    subject: '[REET] 인증번호 발송',
    html:'<h1>HTML 보내기 테스트</h1><p><img src="http://www.nodemailer.com/img/logo.png"/></p>'
};

smtpTransport.sendMail(mailOptions, function(error, response){
    if (error){
        console.log(error);
    } else {
        console.log("Message sent : " + response.message);
    }
    smtpTransport.close();
});

