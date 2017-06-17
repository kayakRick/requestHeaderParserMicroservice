var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let accLang = req.get("Accept-Language");
    let commaAt = accLang.search(",");

    let userAgent = req.get("User-Agent");
    let open = userAgent.search(/\(/);
    let close = userAgent.search(/\)/);
    let software = null;

    if(open >= 0 && close > 0 && close - open > 1)
        software = userAgent.substring(open + 1, close);
    else
        software = userAgent;

    res.send({"ipaddress": req.ip,
        "language": commaAt > 0 ? accLang.substring(0, commaAt) : accLang,
        "software": software});
});

module.exports = router;
