const db = require('../db/connection');

function viewAllDepartments () {
    db.query('SELECT * FROM DEPARTMENT', (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
});
}






module.exports = {viewAllDepartments};