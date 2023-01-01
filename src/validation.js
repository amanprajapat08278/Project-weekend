function checkDate(str) {
    var re = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-[0-9]{4}$/ 
    let result = re.test(str);
    if(result){
        let currDate = new Date();
        let strDate = new Date(str);
        result = (currDate>strDate)?true:false;
    }
    return result
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    return re.test(email);
}

function checkPhone(str) {
    var re = /^(\+\d{1,3}[- ]?)?\d{10}$/
    return re.test(str);
}

function isValidname(firstname){
    return (typeof firstname !== "string" ||/^[a-zA-Z]+$/.test(firstname))?true:false
}


const isValidAddress =function(name){
    const  nameRegex =/^[a-zA-Z0-9,( \)]{2,20}$/
   return nameRegex.test(name.trim())
}

const isValidUUID =function(name){
    const  nameRegex =/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
   return nameRegex.test(name.trim())
}

function checkName(str) {
    var re =/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
    return re.test(str.trim());
}

module.exports = {checkDate, validateEmail, checkPhone, isValidname, isValidAddress, isValidUUID, checkName}






