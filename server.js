const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.json());
var path = require("path");
require("dotenv").config();
// const port = process.env.PORT || 5000;
const port = 80;

app.use(express.static(__dirname + "/dist/"));
app.get(/.*/, function (req, res) {
    res.sendfile(__dirname + "/dist/index.html");
});

//webbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
app.use(bodyparser.json());
var path = require("path");
const cors = require('cors');
app.use(
    cors(),
    bodyparser.json(),
    bodyparser.urlencoded({
        extended: true
    })
);

const {
    query_command
} = require("./utilities/query_command")

console.log("Server started...");
var mysqlConnection = mysql.createConnection({
    host: '128.199.214.155',
    user: 'savemom',
    port: '3306',
    password: 'savemom@aclab1201',
    database: 'line_bot',
    multipleStatements: true
});



app.post('/selecttype', async (req, res) => {
    var query = await query_command(`SELECT * FROM type`)
    //console.log(query)
    res.send(query)
});

app.post('/selectbrand', async (req, res) => {
    var query = await query_command(`SELECT * FROM brand`)
    //console.log(query)
    res.send(query)
});

app.post('/selectMEMBER', async (req, res) => {
    var query = await query_command(`SELECT * FROM member`)
    // console.log(query)
    res.send(query)
});

app.post('/selectPRODUCTadmin', async (req, res) => {
    const {
        body
    } = req;

    var query = await query_command(`SELECT * FROM product
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
    JOIN member ON product.MEMBER_ID = member.MEMBER_ID
    WHERE product.STATUS = '1' 
    ORDER BY product.PRODUCT_ID `)
    //console.log(query)
    res.send(query)

});

app.post('/selectmemberproduct', async (req, res) => {

    var query = await query_command(`SELECT * FROM member`)
    //console.log(query)
    res.send(query)

});

app.post('/insertPRODUCT', async (req, res) => {
    const {
        body
    } = req;
    // console.log(body);

    var query = await query_command(`insert into product (PRODUCT_CODE,BRAND_ID,PRODUCT_GEN,TYPE_ID,PRODUCT_EXP,PC_CPU,PC_RAM,PC_HD,PC_WINDOW,MEMBER_ID,STATUS) 
    values ('${body.PRODUCT_CODE}','${body.BRAND_ID}','${body.PRODUCT_GEN}','${body.TYPE_ID}','${body.PRODUCT_EXP}','${body.PC_CPU}','${body.PC_RAM}','${body.PC_HD}','${body.PC_WINDOW}','${body.MEMBER_ID}','${body.STATUS}') `)
    //console.log(query)
    res.send(query)
});

app.post('/insertFIXCOMMENT', async (req, res) => {
    const {
        body
    } = req;
    //  console.log(body);
    var query = await query_command(`insert into comments (FIX_ID,COMMENT,COMMENT_STAR,COMMENT_TYPE) 
    values ('${body.FIX_ID}','${body.COMMENT}','${body.COMMENT_STAR}','${body.COMMENT_TYPE}') `)
    //console.log(query)
    res.send(query)
});

app.post('/updatePRODUCT', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    var query = await query_command(`UPDATE product
    SET PRODUCT_CODE = '${body.PRODUCT_CODE}'
    , BRAND_ID = '${body.BRAND_ID}'
    , PRODUCT_GEN = '${body.PRODUCT_GEN}'
    , PRODUCT_EXP = '${body.PRODUCT_EXP}'
    , PC_CPU = '${body.PC_CPU}'
    , PC_RAM = '${body.PC_RAM}'
    , PC_HD = '${body.PC_HD}'
    ,PC_WINDOW = '${body.PC_WINDOW}'
    ,MEMBER_ID = '${body.MEMBER_ID}'
    WHERE PRODUCT_ID='${body.PRODUCT_ID}';`)
    //console.log(query)
    res.send(query)

});

app.post('/deletePRODUCT', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    var query = await query_command(`DELETE FROM product
    WHERE PRODUCT_ID = '${body.PRODUCT_ID}'`)
    //console.log(query)
    res.send(query)

});

app.post('/insertMEMBER', async (req, res) => {
    const {
        body
    } = req;
    // console.log(body);
    var query = await query_command(`insert into member (MEMBER_NAME,MEMBER_STATUS,MEMBER_USERNAME,MEMBER_PASSWORD,MEMBER_TELL,MEMBER_EMAIL,MEMBER_WORK) 
    values ('${body.MEMBER_NAME}','${body.MEMBER_STATUS}','${body.MEMBER_USERNAME}','${body.MEMBER_PASSWORD}','${body.MEMBER_TELL}','${body.MEMBER_EMAIL}','${body.MEMBER_WORK}') `)
    //console.log(query)
    res.send(query)

});

app.post('/updateMEMBER', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    var query = await query_command(`UPDATE member
    SET MEMBER_NAME = '${body.MEMBER_NAME}'
    , MEMBER_STATUS = '${body.MEMBER_STATUS}'
    , MEMBER_USERNAME = '${body.MEMBER_USERNAME}'
    , MEMBER_PASSWORD = '${body.MEMBER_PASSWORD}'
    , MEMBER_TELL = '${body.MEMBER_TELL}'
    , MEMBER_EMAIL = '${body.MEMBER_EMAIL}'
    , MEMBER_WORK = '${body.MEMBER_WORK}'
    WHERE MEMBER_ID='${body.MEMBER_ID}';`)
    //console.log(query)
    res.send(query)

});



app.post('/deleteMEMBER', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    var query = await query_command(`DELETE FROM member
    WHERE MEMBER_ID = '${body.MEMBER_ID}'`)
    //console.log(query)
    res.send(query)

});


app.post('/selectBRAND', async (req, res) => {
    const {
        body
    } = req;
    var query = await query_command(`SELECT * FROM brand`)
    //console.log(query)
    res.send(query)

});

app.post('/selectTYPE', async (req, res) => {
    const {
        body
    } = req;
    var query = await query_command(`SELECT * FROM type`)
    //console.log(query)
    res.send(query)

});


app.post('/selectPRODUCT', async (req, res) => {
    const {
        body
    } = req;
    var query = await query_command(`SELECT * FROM product
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
     WHERE PRODUCT_ID = ${body.PRODUCT_ID}`)
    //console.log(query)
    res.send(query)

});

app.post('/commentsss', async (req, res) => {
    const {
        body
    } = req;
    var query = await query_command(`SELECT * FROM comments
    LEFT JOIN fix ON fix.FIX_ID = comments.FIX_ID
    LEFT JOIN fixhistory ON fixhistory.FIX_ID = fix.FIX_ID
    LEFT JOIN product ON product.PRODUCT_ID = fix.PRODUCT_ID
    LEFT JOIN brand ON brand.BRAND_ID = product.BRAND_ID
    LEFT JOIN member ON member.MEMBER_ID = fix.MEMBER_ID`)
    //console.log(query)
    res.send(query)

});

app.post('/notification', async (req, res) => {
    const {
        body
    } = req;
    var query = await query_command(`SELECT *FROM product
    LEFT JOIN type ON type.TYPE_ID = product.TYPE_ID
    LEFT JOIN brand ON brand.BRAND_ID = product.BRAND_ID
    `)
    //console.log(query) 
    var product = []
    for (let index = 0; index < query.length; index++) {
        const element = query[index];
        // console.log(new Date() > new Date(element.PRODUCT_EXP));
        if (new Date() > new Date(element.PRODUCT_EXP)) {
            console.log(element);
            product.push(element)
        }
    }
    res.send(product)

});

var cron = require('node-cron');
notificationLINE();
async function notificationLINE() {
    mysqlConnection.query(`SELECT *FROM product
    LEFT JOIN type ON type.TYPE_ID = product.TYPE_ID
    LEFT JOIN brand ON brand.BRAND_ID = product.BRAND_ID
    `, (err, rows, fields) => {
        if (!err) {
            var cron = require('node-cron');
            //5 0 * * * คือ ให้ทำงานเมื่อเวลาผ่านไป 5นาที หลังเที่ยงคืน ในทุกๆ วัน
            cron.schedule('5 0 * * *', () => {
                var product = []
                for (let index = 0; index < rows.length; index++) {
                    const element = rows[index];
                    // console.log(new Date() > new Date(element.PRODUCT_EXP));
                    if (new Date() > new Date(element.PRODUCT_EXP)) {
                        console.log(element);
                        product.push(element)
                    }
                }
                //LINE 
                const lineNotify = require('line-notify-nodejs')('DDFt6k1KVs0Hpauk7B6yiYyz4l7FIcJO3q912rB4BMN');
                lineNotify.notify({
                    message: '\n' + 'เลขครุภัณฑ์' + ' ' + product.map((x) => {
                        return x.PRODUCT_CODE
                    }) + ' ' + 'หมดอายุ' + '\n' + 'วันที่หมดอายุ : ' + product.map((x) => {
                        return x.PRODUCT_EXP
                    }) + '\n' + 'ประเภท : ' + product.map((x) => {
                        return x.TYPE_NAME
                    }) + '\n' + 'ยี่ห้อ : ' + product.map((x) => {
                        return x.BRAND_NAME
                    }),
                }).then(() => {
                    console.log('send completed!');
                }).catch((err) => {
                    console.log(err);
                });
                //END
            });
        } else {
            console.log(err);
        }
    })
};


app.post('/selectFIX',async (req, res) => {
    const {
        body
    } = req;
    var query = await query_command(`SELECT * FROM fix 
    JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID 
    JOIN product ON fix.PRODUCT_ID = product.PRODUCT_ID 
    LEFT JOIN brand ON brand.BRAND_ID = product.BRAND_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
    JOIN member ON fix.MEMBER_ID = member.MEMBER_ID 
WHERE fixhistory.FIX_STATUS = 'รอการยืนยัน' OR fixhistory.FIX_STATUS = 'กำลังดำเนินการ' OR fixhistory.FIX_STATUS = 'เสร็จเเล้ว'
ORDER BY fixhistory.DATE DESC
    `)
    //console.log(query)
    res.send(query)
   
});

app.post('/selectFIXSTATUS',async (req, res) => {
    const {
        body
    } = req;
    var query = await query_command(`SELECT * FROM fix 
    JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID 
    JOIN product ON fix.PRODUCT_ID = product.PRODUCT_ID 
    LEFT JOIN brand ON brand.BRAND_ID = product.BRAND_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
    JOIN member ON fix.MEMBER_ID = member.MEMBER_ID 
WHERE fixhistory.FIX_STATUS = '${body.FIX_STATUS}'
ORDER BY fixhistory.DATE DESC
    `)
    //console.log(query)
    res.send(query)
   
});

app.post('/selectfixcount',async (req, res) => {
    var query = await query_command(`SELECT * FROM fix 
    JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID
    WHERE fixhistory.FIX_STATUS != 'การรับคืนสำเร็จ' AND fixhistory.FIX_STATUS != 'ไม่สามารถซ่อมได้' AND fixhistory.FIX_STATUS != 'จำหน่าย'`)
    //console.log(query)
    res.send(query)
   
});

app.post('/selectdistributor',async (req, res) => {
    var query = await query_command(`SELECT * FROM distributor
    LEFT JOIN product ON distributor.PRODUCT_ID = product.PRODUCT_ID
    LEFT JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    ORDER BY distributor.DATE DESC`)
    //console.log(query)
    res.send(query)
   
});

app.post('/selectprofileuser',async (req, res) => {
    const {
        body
    } = req;
    var query = await query_command(`SELECT * FROM member WHERE MEMBER_ID = ${body.MEMBER_ID}`)
    //console.log(query)
    res.send(query)
   
});

app.post('/selectPRODUCTMEMBER',async (req, res) => {
    const {
        body
    } = req;
    var query = await query_command(`SELECT * FROM product
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
     WHERE MEMBER_ID = ${body.MEMBER_ID} AND product.STATUS = '1' `)
    //console.log(query)
    res.send(query)
   
});

app.post('/insertFIX',async (req, res) => {
    const {
        body
    } = req;
    console.log(body);
    var query = await query_command(`insert into fix (PRODUCT_ID,MEMBER_ID,FIX_DETAIL,BACK_MEMBER) 
    values ('${body.PRODUCT_ID}','${body.MEMBER_ID}','${body.FIX_DETAIL}','${body.BACK_MEMBER}') `)
    console.log(query);
    var query1 = await query_command(`insert into fixhistory (FIX_ID,FIX_STATUS) 
    values (${query.insertId},'${body.FIX_STATUS}') `)
    console.log(query1)
    res.send(query)
   
});

app.post('/selectPRODUCTFIX',async (req, res) => {
    const {
        body
    } = req;
    var query = await query_command(`SELECT * FROM product
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID WHERE MEMBER_ID = ${body.MEMBER_ID} AND PRODUCT_CODE LIKE '%${body.search}%'`)
    //console.log(query)
    res.send(query)
  
});



app.post('/selectfixdetail', async(req, res) => {
    const {
        body
    } = req;
    var query = await query_command(`SELECT * FROM fix
    JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID
    JOIN product ON fix.PRODUCT_ID = product.PRODUCT_ID
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
    WHERE fix.MEMBER_ID = ${body.MEMBER_ID} AND fixhistory.FIX_STATUS != "การรับคืนสำเร็จ"
    ORDER BY fixhistory.DATE DESC`)
    //console.log(query)
    res.send(query)
   
});

app.post('/selectfixdetailstatus',async (req, res) => {
    const {
        body
    } = req;
    var query = await query_command(`SELECT * FROM fix
    JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID
    JOIN product ON fix.PRODUCT_ID = product.PRODUCT_ID
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
    WHERE fix.MEMBER_ID = ${body.MEMBER_ID} AND fixhistory.FIX_STATUS = '${body.FIX_STATUS}'
    ORDER BY fixhistory.DATE DESC`)
    //console.log(query)
    res.send(query)
   
});

app.post('/selectfixdetails',async (req, res) => {
    const {
        body
    } = req;
    var query = await query_command(`SELECT CONCAT(fix.FIX_ID) AS fixid,fix.PRODUCT_ID,fix.MEMBER_ID,fix.FIX_DETAIL,fix.BACK_MEMBER,fix.BACK_DATE,fix.BACK_DATE,BACK_ADMIN,fixhistory.*,product.*,brand.*,type.*,comments.* FROM fix
    JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID
    JOIN product ON fix.PRODUCT_ID = product.PRODUCT_ID
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
    LEFT JOIN comments ON fix.FIX_ID = comments.FIX_ID
    WHERE fix.MEMBER_ID = ${body.MEMBER_ID} AND fixhistory.FIX_STATUS = "การรับคืนสำเร็จ"
    ORDER BY fixhistory.DATE DESC`)
    //console.log(query)
    res.send(query)
   
});


app.post('/updatestatus', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    var query = await query_command(`UPDATE fixhistory
    SET FIX_STATUS = '${body.FIX_STATUS}'
    WHERE FIXHISTORY_ID='${body.FIXHISTORY_ID}';`)
    //console.log(query)
    res.send(query)
   
});

app.post('/upprofile', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    var query = await query_command(`UPDATE member
    SET MEMBER_NAME = '${body.MEMBER_NAME}',
    MEMBER_TELL = '${body.MEMBER_TELL}',
    MEMBER_EMAIL = '${body.MEMBER_EMAIL}',
    MEMBER_USERNAME = '${body.MEMBER_USERNAME}',
    MEMBER_PASSWORD = '${body.MEMBER_PASSWORD}'
    WHERE MEMBER_ID ='${body.MEMBER_ID}';`)
    //console.log(query)
    res.send(query)
  
});

app.post('/updatestatus1', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    var query = await query_command(`UPDATE fixhistory
    SET FIX_STATUS = '${body.FIX_STATUS}'
    WHERE FIXHISTORY_ID='${body.FIXHISTORY_ID}';`)
    //console.log(query)
     //LINE
     const lineNotify = require('line-notify-nodejs')('j0nFuC6Polr3iYD7fDD7DNed2jbyrIP4CO4MCqkycce');
     lineNotify.notify({
         message: '\n' + 'เลขครุภัณฑ์ : ' + ' ' + body.PRODUCT_CODE + '\n' + 'ประเภท : ' + ' ' + body.TYPE_NAME + '\n' + 'ยี่ห้อ : ' + ' ' + body.BRAND_NAME + '\n' + 'สถานะ : ' + body.FIX_STATUS
     }).then(() => {
         console.log('send completed!');
     }).catch((err) => {
         console.log(err);
     });
     //END
    res.send(query)
  
});
app.post('/updatestatus2', async (req, res) => {
    const {
        body
    } = req;
    
    var query = await query_command(`UPDATE fix
    SET BACK_MEMBER = '${body.BACK_MEMBER}',
    BACK_DATE = '${body.BACK_DATE}',
    BACK_ADMIN = ${body.BACK_ADMIN}
    WHERE FIX_ID= ${body.FIX_ID};`)
    //console.log(query)
    res.send(query)
   
});


app.post('/insertBRAND',async (req, res) => {
    const {
        body
    } = req;
    // console.log(body);
    var query = await query_command(`insert into brand (BRAND_NAME) 
    values ('${body.BRAND_NAME}') `)
    //console.log(query)
    res.send(query)
  
});

app.post('/insertdistributor',async (req, res) => {
    const {
        body
    } = req;
    // console.log(body);
    var query = await query_command(`insert into distributor (NOTE,PRODUCT_ID) 
    values ('${body.NOTE}',${body.PRODUCT_ID}) `)
    console.log(query)
    var query1 = await query_command(`UPDATE product
    SET STATUS = '${body.STATUS}'
    WHERE PRODUCT_ID='${body.PRODUCT_ID}';`)
    console.log(query1)
    res.send(query)
   
});

app.post('/deleteBRAND', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    var query = await query_command(`DELETE FROM brand
    WHERE BRAND_ID = '${body.BRAND_ID}'`)
    //console.log(query)
    res.send(query)
   
});

app.post('/updateBRAND', async (req, res) => {
    const {
        body
    } = req;
    console.log(body);
    var query = await query_command(`UPDATE brand
    SET BRAND_NAME = '${body.BRAND_NAME}'
    WHERE BRAND_ID = '${body.BRAND_ID}';`)
    //console.log(query)
    res.send(query)
   
});

app.post('/insertTYPE',async (req, res) => {
    const {
        body
    } = req;
    // console.log(body);
    var query = await query_command(`insert into type (TYPE_NAME) 
    values ('${body.TYPE_NAME}') `)
    //console.log(query)
    res.send(query)
   
});

app.post('/deleteTYPE', async (req, res) => {
    const {
        body
    } = req;
    //console.log(body);
    var query = await query_command(`DELETE FROM type
    WHERE TYPE_ID = '${body.TYPE_ID}'`)
    //console.log(query)
    res.send(query)
   
});

app.post('/updateTYPE', async (req, res) => {
    const {
        body
    } = req;
    console.log(body);
    var query = await query_command(`UPDATE type
    SET TYPE_NAME = '${body.TYPE_NAME}'
    WHERE TYPE_ID = '${body.TYPE_ID}';`)
    //console.log(query)
    res.send(query)
   
});

app.post('/selecthistoryfixadmin',async (req, res) => {
    const {
        body
    } = req;
    var query = await query_command(`SELECT * FROM fix
    JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID
    JOIN product ON fix.PRODUCT_ID = product.PRODUCT_ID
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN member ON fix.MEMBER_ID = member.MEMBER_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
    WHERE fixhistory.FIX_STATUS = "การรับคืนสำเร็จ"
    ORDER BY fixhistory.DATE DESC`)
    //console.log(query)
    res.send(query)
   
});

app.post('/selecthistoryfixadminnot',async (req, res) => {
    const {
        body
    } = req;
    var query = await query_command(`SELECT * FROM fix
    JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID
    JOIN product ON fix.PRODUCT_ID = product.PRODUCT_ID
    JOIN brand ON product.BRAND_ID = brand.BRAND_ID
    JOIN member ON fix.MEMBER_ID = member.MEMBER_ID
    JOIN type ON product.TYPE_ID = type.TYPE_ID
    WHERE fixhistory.FIX_STATUS = "ไม่สามารถซ่อมได้"
    ORDER BY fixhistory.DATE DESC`)
    //console.log(query)
    res.send(query)
   
});

app.post('/selectfixdashboard',async (req, res) => {
    const {
        body
    } = req;
    console.log(body);
    if (body.month == '0') {
        var query = await query_command(`SELECT COUNT(fix.FIX_ID)fixcount,CONCAT(member.MEMBER_WORK)workmb FROM fix
        LEFT JOIN member ON fix.MEMBER_ID = member.MEMBER_ID
        LEFT JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID
        WHERE fixhistory.FIX_STATUS = "การรับคืนสำเร็จ" AND CONCAT(YEAR(fixhistory.DATE)+543) = "${body.year}"
        GROUP BY member.MEMBER_WORK`)
        //console.log(query)
        res.send(query)
    } else {
        var query = await query_command(`SELECT COUNT(fix.FIX_ID)fixcount,CONCAT(member.MEMBER_WORK)workmb ,
        CASE
          WHEN MONTH(fixhistory.DATE) = '1' THEN 'มกราคม'
          WHEN MONTH(fixhistory.DATE) = '2' THEN 'กุมภาพันธ์'
          WHEN MONTH(fixhistory.DATE) = '3' THEN 'มีนาคม'
          WHEN MONTH(fixhistory.DATE) = '4' THEN 'เมษายน'
          WHEN MONTH(fixhistory.DATE) = '5' THEN 'พฤษภาคม'
          WHEN MONTH(fixhistory.DATE) = '6' THEN 'มิถุนายน'
          WHEN MONTH(fixhistory.DATE) = '7' THEN 'กรกฎาคม'
          WHEN MONTH(fixhistory.DATE) = '8' THEN 'สิงหาคม'
          WHEN MONTH(fixhistory.DATE) = '9' THEN 'กันยายน'
          WHEN MONTH(fixhistory.DATE) = '10' THEN 'ตุลาคม'
          WHEN MONTH(fixhistory.DATE) = '11' THEN 'พฤศจิกายน'
          WHEN MONTH(fixhistory.DATE) = '12' THEN 'ธันวาคม'
          ELSE 'ไม่มี'
          END AS monthfix
        FROM fix
        LEFT JOIN member ON fix.MEMBER_ID = member.MEMBER_ID
        LEFT JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID
        WHERE fixhistory.FIX_STATUS = "การรับคืนสำเร็จ" 
        AND CONCAT(YEAR(fixhistory.DATE)+543) = "${body.year}"
        AND MONTH(fixhistory.DATE) = '${body.month}'
        GROUP BY member.MEMBER_WORK,fixhistory.DATE`)
        //console.log(query)
        res.send(query)
       
    }


});


app.post('/selectfixtype',async (req, res) => {
    const {
        body
    } = req;
    console.log(body);
    if (body.month == '0') {
        var query = await query_command(`SELECT COUNT(fix.FIX_ID)typefixcount,CONCAT(type.type_NAME)typename FROM fix
        LEFT JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID
        LEFT JOIN product ON fix.PRODUCT_ID = product.PRODUCT_ID
        LEFT JOIN type ON product.TYPE_ID = type.TYPE_ID
        WHERE fixhistory.FIX_STATUS = "การรับคืนสำเร็จ" AND CONCAT(YEAR(fixhistory.DATE)+543) = "${body.year}"
        GROUP BY typename`)
        //console.log(query)
        res.send(query)
       
    } else {
        var query = await query_command(`SELECT COUNT(fix.FIX_ID)typefixcount,CONCAT(type.type_NAME)typename,
        CASE
          WHEN MONTH(fixhistory.DATE) = '1' THEN 'มกราคม'
          WHEN MONTH(fixhistory.DATE) = '2' THEN 'กุมภาพันธ์'
          WHEN MONTH(fixhistory.DATE) = '3' THEN 'มีนาคม'
          WHEN MONTH(fixhistory.DATE) = '4' THEN 'เมษายน'
          WHEN MONTH(fixhistory.DATE) = '5' THEN 'พฤษภาคม'
          WHEN MONTH(fixhistory.DATE) = '6' THEN 'มิถุนายน'
          WHEN MONTH(fixhistory.DATE) = '7' THEN 'กรกฎาคม'
          WHEN MONTH(fixhistory.DATE) = '8' THEN 'สิงหาคม'
          WHEN MONTH(fixhistory.DATE) = '9' THEN 'กันยายน'
          WHEN MONTH(fixhistory.DATE) = '10' THEN 'ตุลาคม'
          WHEN MONTH(fixhistory.DATE) = '11' THEN 'พฤศจิกายน'
          WHEN MONTH(fixhistory.DATE) = '12' THEN 'ธันวาคม'
          ELSE 'ไม่มี'
          END AS monthfix
         FROM fix
        LEFT JOIN fixhistory ON fix.FIX_ID = fixhistory.FIX_ID
        LEFT JOIN product ON fix.PRODUCT_ID = product.PRODUCT_ID
        LEFT JOIN brand ON product.BRAND_ID = brand.BRAND_ID
        LEFT JOIN type ON product.TYPE_ID = type.TYPE_ID
        WHERE fixhistory.FIX_STATUS = "การรับคืนสำเร็จ" 
        AND CONCAT(YEAR(fixhistory.DATE)+543) = "${body.year}"
        AND MONTH(fixhistory.DATE) = '${body.month}'
        GROUP BY type.type_NAME,fixhistory.DATE`)
        //console.log(query)
        res.send(query)
       
    }
});


app.listen(port);