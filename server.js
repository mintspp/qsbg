const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.json());
var path = require("path");
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(
    cors(),
    bodyparser.json(),
    bodyparser.urlencoded({
        extended: true
    })
);
var mysqlConnection = mysql.createConnection({
    // host: '',
    user: 'root',
    port: '3306',
    password: '',
    database: 'qsbg',
    multipleStatements: true
});

app.listen(port);

app.post('/selecttype', (req, res) => {

    mysqlConnection.query(`SELECT * FROM type`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/selectbrand', (req, res) => {

    mysqlConnection.query(`SELECT * FROM brand`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/selectMEMBER', (req, res) => {

    mysqlConnection.query(`SELECT * FROM member`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/selectPRODUCTadmin', (req, res) => {
    const {
        body
    } = req;
    mysqlConnection.query(`SELECT * FROM product
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
    JOIN member ON product.MEMBER_ID = member.MEMBER_ID `, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/selectmemberproduct', (req, res) => {

    mysqlConnection.query(`SELECT * FROM member`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/insertPRODUCT', (req, res) => {
    const {
        body
    } = req;
    // console.log(body);
    mysqlConnection.query(`insert into product (PRODUCT_CODE,BRAND_ID,PRODUCT_GEN,TYPE_ID,PRODUCT_EXP,PC_CPU,PC_RAM,PC_HD,PC_WINDOW,MEMBER_ID) 
            values ('${body.PRODUCT_CODE}','${body.BRAND_ID}','${body.PRODUCT_GEN}','${body.TYPE_ID}','${body.PRODUCT_EXP}','${body.PC_CPU}','${body.PC_RAM}','${body.PC_HD}','${body.PC_WINDOW}','${body.MEMBER_ID}') `, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/updatePRODUCT', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    mysqlConnection.query(`UPDATE product
    SET PRODUCT_CODE = '${body.PRODUCT_CODE}'
    , BRAND_ID = '${body.BRAND_ID}'
    , PRODUCT_GEN = '${body.PRODUCT_GEN}'
    , PRODUCT_EXP = '${body.PRODUCT_EXP}'
    , PC_CPU = '${body.PC_CPU}'
    , PC_RAM = '${body.PC_RAM}'
    , PC_HD = '${body.PC_HD}'
    ,PC_WINDOW = '${body.PC_WINDOW}'
    ,MEMBER_ID = '${body.MEMBER_ID}'
    WHERE PRODUCT_ID='${body.PRODUCT_ID}';`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    }) 
});

app.post('/deletePRODUCT', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    mysqlConnection.query(`DELETE FROM product
    WHERE PRODUCT_ID = '${body.PRODUCT_ID}'`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    }) 
});

app.post('/insertMEMBER', (req, res) => {
    const {
        body
    } = req;
    // console.log(body);
    mysqlConnection.query(`insert into member (MEMBER_NAME,MEMBER_STATUS,MEMBER_USERNAME,MEMBER_PASSWORD,MEMBER_TELL,MEMBER_EMAIL,MEMBER_WORK) 
            values ('${body.MEMBER_NAME}','${body.MEMBER_STATUS}','${body.MEMBER_USERNAME}','${body.MEMBER_PASSWORD}','${body.MEMBER_TELL}','${body.MEMBER_EMAIL}','${body.MEMBER_WORK}') `, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/updateMEMBER', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    mysqlConnection.query(`UPDATE member
    SET MEMBER_NAME = '${body.MEMBER_NAME}'
    , MEMBER_STATUS = '${body.MEMBER_STATUS}'
    , MEMBER_USERNAME = '${body.MEMBER_USERNAME}'
    , MEMBER_PASSWORD = '${body.MEMBER_PASSWORD}'
    , MEMBER_TELL = '${body.MEMBER_TELL}'
    , MEMBER_EMAIL = '${body.MEMBER_EMAIL}'
    , MEMBER_WORK = '${body.MEMBER_WORK}'
    WHERE MEMBER_ID='${body.MEMBER_ID}';`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    }) 
});



app.post('/deleteMEMBER', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    mysqlConnection.query(`DELETE FROM member
    WHERE MEMBER_ID = '${body.MEMBER_ID}'`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    }) 
});


app.post('/selectBRAND', (req, res) => {
    const {
        body
    } = req;
    mysqlConnection.query(`SELECT * FROM brand`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/selectTYPE', (req, res) => {
    const {
        body
    } = req;
    mysqlConnection.query(`SELECT * FROM type`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});


app.post('/selectPRODUCT', (req, res) => {
    const {
        body
    } = req;
    mysqlConnection.query(`SELECT * FROM product
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
     WHERE PRODUCT_ID = ${body.PRODUCT_ID}`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/selectFIX', (req, res) => {
    const {
        body
    } = req;
    mysqlConnection.query(`SELECT * FROM fix 
    JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID 
    JOIN product ON fix.PRODUCT_ID = product.PRODUCT_ID 
    JOIN member ON fix.MEMBER_ID = member.MEMBER_ID 
WHERE fixhistory.FIX_STATUS = 'รอการยืนยัน' OR fixhistory.FIX_STATUS = 'กำลังดำเนินการ' OR fixhistory.FIX_STATUS = 'เสร็จเเล้ว'
    `, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/selectfixcount', (req, res) => {
    mysqlConnection.query(`SELECT * FROM fix 
    JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID
    WHERE fixhistory.FIX_STATUS != 'การรับคืนสำเร็จ'`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/selectprofileuser', (req, res) => {
    const {
        body
    } = req;
    mysqlConnection.query(`SELECT * FROM member WHERE MEMBER_ID = ${body.MEMBER_ID}`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/selectPRODUCTMEMBER', (req, res) => {
    const {
        body
    } = req;
    mysqlConnection.query(`SELECT * FROM product
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
     WHERE MEMBER_ID = ${body.MEMBER_ID}`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/insertFIX', (req, res) => {
    const {
        body
    } = req;
    // console.log(body);
    mysqlConnection.query(`insert into fix (PRODUCT_ID,MEMBER_ID,FIX_DETAIL,BACK_MEMBER) 
            values ('${body.PRODUCT_ID}','${body.MEMBER_ID}','${body.FIX_DETAIL}','${body.BACK_MEMBER}') `, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            console.log(rows.insertId);
            mysqlConnection.query(`insert into fixhistory (FIX_ID,FIX_STATUS) 
            values (${rows.insertId},'${body.FIX_STATUS}') `)
    // })
        } else {
            console.log(err);
        }
    })

    
});

app.post('/selectPRODUCTFIX', (req, res) => {
    const {
        body
    } = req;
    mysqlConnection.query(`SELECT * FROM product
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID WHERE MEMBER_ID = ${body.MEMBER_ID} AND PRODUCT_CODE LIKE '%${body.search}%'`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});



app.post('/selectfixdetail', (req, res) => {
    const {
        body
    } = req;
    mysqlConnection.query(`SELECT * FROM fix
    JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID
    JOIN product ON fix.PRODUCT_ID = product.PRODUCT_ID
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
    WHERE fix.MEMBER_ID = ${body.MEMBER_ID} AND fixhistory.FIX_STATUS != "การรับคืนสำเร็จ"`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/selectfixdetails', (req, res) => {
    const {
        body
    } = req;
    mysqlConnection.query(`SELECT * FROM fix
    JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID
    JOIN product ON fix.PRODUCT_ID = product.PRODUCT_ID
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
    WHERE fix.MEMBER_ID = ${body.MEMBER_ID} AND fixhistory.FIX_STATUS = "การรับคืนสำเร็จ"`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});


app.post('/updatestatus', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    mysqlConnection.query(`UPDATE fixhistory
    SET FIX_STATUS = '${body.FIX_STATUS}'
    WHERE FIXHISTORY_ID='${body.FIXHISTORY_ID}';`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    }) 
});
app.post('/updatestatus1', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    mysqlConnection.query(`UPDATE fixhistory
    SET FIX_STATUS = '${body.FIX_STATUS}'
    WHERE FIXHISTORY_ID='${body.FIXHISTORY_ID}';`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    }) 
});
app.post('/updatestatus2', async (req, res) => {
    const {
        body
    } = req;
    // console.log(body+"updatestatus2");
    mysqlConnection.query(`UPDATE fix
    SET BACK_MEMBER = '${body.BACK_MEMBER}',
    BACK_DATE = '${body.BACK_DATE}',
    BACK_ADMIN = ${body.BACK_ADMIN}
    WHERE FIX_ID= ${body.FIX_ID};`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});


app.post('/insertBRAND', (req, res) => {
    const {
        body
    } = req;
    // console.log(body);
    mysqlConnection.query(`insert into brand (BRAND_NAME) 
            values ('${body.BRAND_NAME}') `, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/deleteBRAND', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    mysqlConnection.query(`DELETE FROM brand
    WHERE BRAND_ID = '${body.BRAND_ID}'`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    }) 
});

app.post('/updateBRAND', async (req, res) => {
    const {
        body
    } = req;
    console.log(body);
    mysqlConnection.query(`UPDATE brand
    SET BRAND_NAME = '${body.BRAND_NAME}'
    WHERE BRAND_ID = '${body.BRAND_ID}';`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    }) 
});

app.post('/insertTYPE', (req, res) => {
    const {
        body
    } = req;
    // console.log(body);
    mysqlConnection.query(`insert into type (TYPE_NAME) 
            values ('${body.TYPE_NAME}') `, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/deleteTYPE', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    mysqlConnection.query(`DELETE FROM type
    WHERE TYPE_ID = '${body.TYPE_ID}'`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    }) 
});

app.post('/updateTYPE', async (req, res) => {
    const {
        body
    } = req;
    console.log(body);
    mysqlConnection.query(`UPDATE type
    SET TYPE_NAME = '${body.TYPE_NAME}'
    WHERE TYPE_ID = '${body.TYPE_ID}';`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    }) 
});

app.post('/selecthistoryfixadmin', (req, res) => {
    const {
        body
    } = req;
    mysqlConnection.query(`SELECT * FROM fix
    JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID
    JOIN product ON fix.PRODUCT_ID = product.PRODUCT_ID
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN member ON fix.MEMBER_ID = member.MEMBER_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
    WHERE fixhistory.FIX_STATUS = "การรับคืนสำเร็จ"`, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});
