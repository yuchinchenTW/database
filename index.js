"use strict";
const keepAlive = require('./server');
var TinyURL = require('tinyurl');
const QuickChart = require('quickchart-js');
let fetch = require('node-fetch');
//var shortUrl = require('node-url-shortener');
var short = require('easy-short-url');
var mysql = require('mysql');

const mySecret = process.env['password'];

const usr = process.env['USERNAME']

const db = process.env['DATABASE']
const { MongoClient } = require('mongodb');

const host = process.env['HOST']

const mongo_pass = process.env['mongopassword']
const uri = "mongodb+srv://newuser-48:" + mongo_pass + "@dbbot.uqz32.mongodb.net/bot";
var time1 = new Date(Date.UTC(2021, 9, 24, 0, 0, 0, 0));
var utcDate = new Date(Date.UTC(2021, 9, 22, 16, 0, 0, 0));
var time2 = new Date(Date.UTC(2021, 9, 24, 23, 59, 59, 0));
var rr = new Date(Date.UTC(2019, 8, 27, 0, 0, 0));
var now = new Date(2021, 10, 22);
var now_utc = new Date(now.toUTCString().slice(0, -4));
console.log(now_utc)
Date.prototype.addHours = function(h) {
  this.setHours(this.getHours() + h);
  return this;
}
var isoDateString = new Date().addHours(8).toISOString();
console.log(isoDateString);


//time:{$gte:time1,$lt:time2}






let {
  Client,
  Intents
} = require('discord.js');

const {
  input
} = require("./input.json")

const {
  token
} = process.env.DISCORD_TOKEN // use the require method


const client = new Client({
  intents: [Intents.FLAGS.GUILDS]
});





function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function money(bestprice) {


  var con = mysql.createConnection({
    host: host,
    user: usr,
    password: mySecret,
    database: db
  });

  con.connect(function(err) {
    if (err) {
      console.log(err)
      return
    }
    console.log("Connected to database!");
  });
  let quer = "INSERT INTO `money`(`bestprice`) VALUES ( '" + bestprice+ "')";
  console.log(quer)
  //INSERT INTO `prizes`( `objName`, `avgprize`, `bestprize`, `url`) VALUES ([value-2],[value-3],[value-4],[value-5])
  //"SELECT " + "CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00') AS `currentTime` " + " FROM prizes"

  con.query(quer, (err, result) => {
    if (err) {
      throw err
    }
    console.log(result)
  })
  quer = "UPDATE `money` SET `time`=CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')";
  con.query(quer, (err, result) => {
    if (err) {
      throw err
    }
    // console.log(result)
  })
  con.end();
  await console.log("connection done");
}



async function uiop(obj, avgprize, bestprize, url) {


  var con = mysql.createConnection({
    host: host,
    user: usr,
    password: mySecret,
    database: db
  });

  con.connect(function(err) {
    if (err) {
      console.log(err)
      return
    }
    console.log("Connected to database!");
  });
  let quer = "INSERT INTO `prizes`( `objName`, `avgprize`, `bestprize`, `url`) VALUES ( '" + obj + "'," + "'" + avgprize + "'," + "'" + bestprize + "'," + "'" + url + "')";
  console.log(quer)
  //INSERT INTO `prizes`( `objName`, `avgprize`, `bestprize`, `url`) VALUES ([value-2],[value-3],[value-4],[value-5])
  //"SELECT " + "CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00') AS `currentTime` " + " FROM prizes"

  con.query(quer, (err, result) => {
    if (err) {
      throw err
    }
    console.log(result)
  })
  quer = "UPDATE `prizes` SET `time`=CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')";
  con.query(quer, (err, result) => {
    if (err) {
      throw err
    }
    // console.log(result)
  })
  con.end();
  await console.log("connection done");
}

async function currentp(obj, avgprize, bestprize, url) {


  var con = mysql.createConnection({
    host: host,
    user: usr,
    password: mySecret,
    database: db
  });

  con.connect(function(err) {
    if (err) {
      console.log(err)
      return
    }
    console.log("Connected to database!");
  });
  let quer = "INSERT INTO `current_prizes`( `objName`, `avgprize`, `bestprize`, `url`) VALUES ( '" + obj + "'," + "'" + avgprize + "'," + "'" + bestprize + "'," + "'" + url + "')";
  console.log(quer)
  //INSERT INTO `prizes`( `objName`, `avgprize`, `bestprize`, `url`) VALUES ([value-2],[value-3],[value-4],[value-5])
  //"SELECT " + "CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00') AS `currentTime` " + " FROM prizes"

  con.query(quer, (err, result) => {
    if (err) {
      throw err
    }
    console.log(result)
  })
  quer = "UPDATE `current_prizes` SET `time`=CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')";
  con.query(quer, (err, result) => {
    if (err) {
      throw err
    }
    // console.log(result)
  })
  con.end();
  await console.log("connection done");
}
async function op() {
  while (true) {
    await uiop();
    await sleep(1212100);
  }
}
let array = [];
// function to get the raw data
const getRawData = (URL) => {
  URL = encodeURI(URL);
  return fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};

// URL for data
let item = "????????????";
let section = 0;
let blank = 0;
let bool = true
let URL = "https://www.8591.com.tw/mallList-list.html?id=859&%251=&gst=2&searchKey=" + item + "&firstRow=" + section;
let maxrange = 7000;
let minrange = 2000;
let count = 0;
let map = new Map();
let result = "";
let msging = true;
// start of the program


keepAlive()
client.on("ready", () => {
  client.login(token);
  console.log(`Logged in as ${client.user.tag}!`)
})


client.on("message", async msg => {
  if (msg.channel.id === "345038542285832193" ||
    msg.channel.id === "345038542285832193") {
    let item = "";
    let section = 0;
    let blank = 0;
    let bool = true
    let URL = "https://www.8591.com.tw/mallList-list.html?id=859&%251=&gst=2&searchKey=" + item + "&firstRow=" + section;
    let maxrange = 50000;
    let minrange = 2000;
    let count = 0;
    let map = new Map();
    let result = "";
    var check = "&&1743";
    let search = false;
    let q_objname = "";
    let q_avg = 0;
    let q_best = 0;
    let new_objname = "";
    let new_avg = 0;
    let new_best = 0;


    function return_result() {
      return result;
    }
    const tyt = async function(item, maxrange, minrange) {
      result = "";

      // start of the program

      result = "";

      while (bool) {
        await sleep(200);
        const ttempp = "https://cors-anywhere.herokuapp.com/";
        URL = "https://www.8591.com.tw/mallList-list.html?id=859&%251=&gst=2&searchKey=" + item + "&firstRow=" + section;
        //URL=ttempp.concat(URL);
        console.log(URL);
        var _constdata ="";
        try {
            _constdata = await getRawData(URL);
        } catch (error) {
          await sleep(1000);
        _constdata = await getRawData(URL);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
        }

        let data = _constdata;
        for (let i = 0; i < 26; i++) {

          let index_bottom = data.search("???</b>");
          data = data.substr(index_bottom - 10);
          let index_top = data.search("<b>") + 3;
          index_bottom = data.search("</b>") - 1;
          //console.log(data.substr(index_top, index_bottom - index_top));
          let temp = data.substr(index_top, index_bottom - index_top);

          temp = temp.replace(',', '');
          temp = parseInt(temp);

          if (temp > minrange && temp < maxrange && temp != 8591) {
            count++;
            if (data.substr(index_top, index_bottom - index_top) != "") array.push(temp);
          }
          if (data.substr(index_top, index_bottom - index_top) == "") blank++;
          data = data.substr(index_bottom + 100);

        }
        if (blank < 20) {
          section += 21;
          blank = 0;
        };
        if (blank >= 20) bool = false;
        if (section > 1200) bool = false;
      }
      array.sort(compareDecimals);
      console.log(array);
      let avg = 0;
      for (let i = 0; i < array.length; i++) {
        avg += array[i];
      }
      console.log(item + " ?????????:" + count + " ?????????:" + (avg / count));
      result += item + " ?????????:" + count + " ????????????:" + (avg / count) + "\r";
      if (count < 50) {
        console.log("???????????????50 ????????????????????????");
        result += "???????????????50 ????????????????????????\r";
      }
      new_objname = item;
      new_avg = avg / count;

      for (let i = 0; i < array.length; i++) {
        if (map.has(array[i])) {
          let num = map.get(array[i]);
          num++;
          map.set(array[i], num);
        }
        if (!map.has(array[i])) {
          map.set(array[i], 1);
        }

      }
      if (array.length > 0) {
        let time = parseInt(array.length / 15);
        let max = 0;
        let times = 0;
        let arr = [];


        let mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));

        for (const [key, value] of mapSort1.entries()) {
          if (times != mapSort1.size && times <= time && value > 1) {
            arr.push(key);
            mapSort1.delete(key);
            times++;

          }

        }
        let arr_avg = 0;
        arr.sort(compareDecimals)
        //if (arr.length > 3) arr.pop();
        arr.reverse();
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
          max += arr[i];
        }
        arr_avg = max / (arr.length);
        if (arr.length >= 3) {
          max = 0;
          let arrlen = arr.length;
          let ct = 0;

          let index = arr.length / 2;
          if (index < 2) {
            arr_avg = arr[1];

          } else if (index >= 2) {

            index = Math.floor(index);
            index = (index + arr.length - 1) / 2
            index = Math.floor(index)
            if (arr[index] / arr[index + 1] < 2) arr_avg = (arr[index] + arr[index + 1]) / 2;
            if (arr[index] / arr[index + 1] >= 2) arr_avg = arr[index];
          }
          if (arr.length > 25) {
            index = arr.length / 2;
            index = Math.floor(index);
            arr_avg = (arr[index] + arr[index + 1]) / 2;

          }

          //arr_avg=arr_avg/arr.length;
          console.log(arr_avg)
          for (let i = 0; i < 10; i++) {
            ct = 0;
            while (ct < arr.length) {

              if (arr[ct] / arr_avg >= 2) {
                arr.splice(ct, 1);

              } else if (arr[ct] / arr_avg <= 0.5) {
                arr.splice(ct, 1);

              } else if (arr[ct] / arr_avg < 2 || arr[ct] / arr_avg > 0.5) {
                if (i == 9) max += arr[ct]
                ct++;

              }



            }

          }
        }
        console.log(arr)

        mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
        let keys = Array.from(mapSort1.keys());
        keys.sort(compareDecimals);
        result += "\r\n?????????????????????????????????:\r\n" + Math.floor((max / (arr.length)) * 8) + "~" + Math.floor((max / (arr.length)) * 3 / 100);
        let possible_pr = 0;
        if (max / (arr.length) > arr_avg) possible_pr = (max / (arr.length)) * 0.9
        if (max / (arr.length) <= arr_avg) possible_pr = (max / (arr.length))
        result += "\r\n??????????????????:\r\n" + possible_pr;
        new_best = possible_pr;
        // result += "\r\n??????????????????:\r\n"
        /* if (keys.length >= 20) {
           for (let i = 0; i < 20; i++) {
             result += "\r\n" + keys[i];
           }
         } else if (keys.length < 20) {
           for (let i = 0; i < keys.length; i++) {
             result += "\r\n" + keys[i];
           }
         }*/
        array.length = 0

      }


      console.log(map)
      return map;

    };







    function reset() {
      section = 0;
      blank = 0;
      bool = true;
      map.clear();
      count = 0;
      result = "";

    }
    const fyi = async function(item, maxrange, minrange) {
      result = "";

      // start of the program
      let array = []
      result = "";

      while (bool) {
        await sleep(200);

        //URL = "https://www.8591.com.tw/mallList-list.html?id=859&%251=&gst=2&searchKey=" + item + "&firstRow=" + section;
        URL = "https://www.8591.com.tw/mallList-list.html?searchGame=859&buyStatus=1&searchKey=" + item + "&firstRow=" + section;
        //URL=ttempp.concat(URL);
        console.log(URL);
         var _constdata ="";
        try {
            _constdata = await getRawData(URL);
        } catch (error) {
          await sleep(1000);
        _constdata = await getRawData(URL);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
        }
        let data = _constdata;
        for (let i = 0; i < 26; i++) {

          let index_bottom = data.search("???</b>");
          data = data.substr(index_bottom - 10);
          let index_top = data.search("<b>") + 3;
          index_bottom = data.search("</b>") - 1;
          //console.log(data.substr(index_top, index_bottom - index_top));
          let temp = data.substr(index_top, index_bottom - index_top);

          temp = temp.replace(',', '');
          temp = parseInt(temp);

          if (temp > minrange && temp < maxrange && temp != 8591) {
            count++;
            if (data.substr(index_top, index_bottom - index_top) != "") array.push(temp);
          }
          if (data.substr(index_top, index_bottom - index_top) == "") blank++;
          data = data.substr(index_bottom + 100);
        }
        if (blank < 20) {
          section += 21;
          blank = 0;
        };
        if (blank >= 20) bool = false;
        if (section > 1000) bool = false;
      }
      array.sort(compareDecimals);
      console.log(array);
      let avg = 0;
      for (let i = 0; i < array.length; i++) {
        avg += array[i];
      }
      console.log(item + " ?????????:" + count + " ?????????:" + (avg / count));
      result += item + " ?????????:" + count + " ????????????:" + (avg / count) + "\r";
      if (count < 50) {
        console.log("???????????????50 ????????????????????????");
        result += "???????????????50 ????????????????????????\r";
      }
      q_objname = item
      q_avg = (avg / count);

      for (let i = 0; i < array.length; i++) {
        if (map.has(array[i])) {
          let num = map.get(array[i]);
          num++;
          map.set(array[i], num);
        }
        if (!map.has(array[i])) {
          map.set(array[i], 1);
        }

      }
      if (array.length > 0) {
        let time = parseInt(array.length / 15);
        let max = 0;
        let times = 0;
        let arr = [];


        let mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));

        for (const [key, value] of mapSort1.entries()) {
          if (times != mapSort1.size && times <= time && value > 1) {
            arr.push(key);
            mapSort1.delete(key);
            times++;

          }

        }
        let arr_avg = 0;
        arr.sort(compareDecimals)
        //if (arr.length > 3) arr.pop();
        arr.reverse();
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
          max += arr[i];
        }
        arr_avg = max / (arr.length);
        if (arr.length >= 3) {
          max = 0;
          let arrlen = arr.length;
          let ct = 0;

          let index = arr.length / 2;
          if (index < 2) {
            arr_avg = arr[1];

          } else if (index >= 2) {

            index = arr.length / 2;
            index = Math.floor(index);
            arr_avg = (arr[index] + arr[index + 1]) / 2;
          }
          if (arr.length > 25) {
            index = arr.length / 2;
            index = Math.floor(index);
            arr_avg = (arr[index] + arr[index + 1]) / 2;

          }

          //arr_avg=arr_avg/arr.length;
          console.log(arr_avg)
          for (let i = 0; i < 10; i++) {
            ct = 0;
            while (ct < arr.length) {

              if (arr[ct] / arr_avg >= 1.5) {
                arr.splice(ct, 1);

              } else if (arr[ct] / arr_avg <= 0.67) {
                arr.splice(ct, 1);

              } else if (arr[ct] / arr_avg < 1.5 || arr[ct] / arr_avg > 0.67) {
                if (i == 9) max += arr[ct]
                ct++;

              }



            }

          }
        }
        console.log(arr)

        mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
        let keys = Array.from(mapSort1.keys());
        keys.sort(compareDecimals);
        result += "\r\n?????????????????????????????????:\r\n" + Math.floor((max / (arr.length)) * 8) + "~" + Math.floor((max / (arr.length)) * 3 / 100);
        let possible_pr = 0;
        if (max / (arr.length) > arr_avg) possible_pr = (max / (arr.length)) * 0.9
        if (max / (arr.length) <= arr_avg) possible_pr = (max / (arr.length))
        result += "\r\n??????????????????:\r\n" + possible_pr;
        q_best = possible_pr;
        /* result += "\r\n??????????????????:\r\n"
         if (keys.length >= 20) {
           for (let i = 0; i < 20; i++) {
             result += "\r\n" + keys[i];
           }
         } else if (keys.length < 20) {
           for (let i = 0; i < keys.length; i++) {
             result += "\r\n" + keys[i];
           }
         }*/
        array.length = 0

      }
      console.log(result)

      console.log(map)
      return map;
    };
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    if (msg.content === "????????????") {
      item = "????????????";
      maxrange = 7000;
      minrange = 2000;
      check = "????????????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 80000;
      minrange = 25000;
      check = "??????";
      search = true;
    } else if (msg.content === "????????????") {
      item = "????????????";
      maxrange = 7000;
      minrange = 3000;
      check = "????????????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 10000;
      minrange = 500;
      check = "??????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 10000;
      minrange = 500;
      check = "??????";
      search = true;

    } else if (msg.content === "????????????") {
      item = "????????????";
      maxrange = 10000;
      minrange = 1000;
      check = "????????????";
      search = true;
    } else if (msg.content === "????????????") {
      item = "????????????";
      maxrange = 10000;
      minrange = 1000;
      check = "????????????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 10000;
      minrange = 1000;
      check = "??????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 10000;
      minrange = 1000;
      check = "??????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 15000;
      minrange = 1000;
      check = "??????";
      search = true;
    } else if (msg.content === "???????????????") {
      item = "???????????????";
      maxrange = 15000;
      minrange = 1000;
      check = "???????????????";
      search = true;
    } else if (msg.content === "????????????") {
      item = "????????????";
      maxrange = 10000;
      minrange = 1000;
      check = "????????????";
      search = true;

    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 15000;
      minrange = 1000;
      check = "??????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 8000;
      minrange = 1000;
      check = "??????";
      search = true;
    } else if (msg.content === "MX131") {
      item = "MX131";
      maxrange = 5000;
      minrange = 1000;
      check = "MX131";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 7000;
      minrange = 1000;
      check = "??????";
      search = true;
    } else if (msg.content === "????????????") {
      item = "????????????";
      maxrange = 2000;
      minrange = 100;
      check = "????????????";
      search = true;
    } else if (msg.content === "????????????") {
      item = "????????????";
      maxrange = 4000;
      minrange = 500;
      check = "????????????";
      search = true;
    } else if (msg.content === "?????????") {
      item = "?????????";
      maxrange = 10000;
      minrange = 4500;
      check = "?????????";
      search = true;
    } else if (msg.content === "?????????") {
      item = "?????????";
      maxrange = 10000;
      minrange = 4500;
      check = "?????????";
      search = true;
    } else if (msg.content === "?????????") {
      item = "?????????";
      maxrange = 23000;
      minrange = 8500;
      check = "?????????";
      search = true;
    } else if (msg.content === "?????????") {
      item = "?????????";
      maxrange = 23000;
      minrange = 8500;
      check = "?????????";
      search = true;
    } else if (msg.content === "?????????") {
      item = "?????????";
      maxrange = 19000;
      minrange = 2500;
      check = "?????????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 3000;
      minrange = 1000;
      check = "??????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 3000;
      minrange = 1000;
      check = "??????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 200000;
      minrange = 70000;
      check = "??????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 200000;
      minrange = 70000;
      check = "??????";
      search = true;
    } else if (msg.content === "?????????") {
      item = "?????????";
      maxrange = 5000;
      minrange = 2500;
      check = "?????????";
      search = true;
    } else if (msg.content === "md") {
      item = "md";
      maxrange = 25000;
      minrange = 14000;
      check = "md";
      search = true;
    } else if (msg.content === "p???") {
      item = "p???";
      maxrange = 8000;
      minrange = 2000;
      check = "p???";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 3000;
      minrange = 300;
      check = "??????";
      search = true;
    } else if (msg.content === "20???") {
      item = "20???";
      maxrange = 5500;
      minrange = 2000;
      check = "20???";
      search = true;
    } else if (msg.content === "19???") {
      item = "19???";
      maxrange = 2000;
      minrange = 800;
      check = "19???";
      search = true;
    } else if (msg.content === "??????100") {
      item = "??????100";
      maxrange = 4000;
      minrange = 1800;
      check = "??????100";
      search = true;
    } else if (msg.content === "??????50") {
      item = "??????50";
      maxrange = 2000;
      minrange = 500;
      check = "??????50";
      search = true;
    } else if (msg.content === "??????30") {
      item = "??????30";
      maxrange = 1500;
      minrange = 200;
      check = "??????30";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 6000;
      minrange = 2000;
      check = "??????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 6000;
      minrange = 2000;
      check = "??????";
      search = true;
    } else if (msg.content === "?????????") {
      item = "?????????";
      maxrange = 6000;
      minrange = 2000;
      check = "?????????";
      search = true;
    } else if (msg.content === "?????????") {
      item = "?????????";
      maxrange = 27000;
      minrange = 2000;
      check = "?????????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 8000;
      minrange = 1000;
      check = "??????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 130;
      minrange = 40;
      check = "??????";
      search = true;
    } else if (msg.content === "?????????") {
      item = "?????????";
      maxrange = 26000;
      minrange = 2000;
      check = "?????????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 29000;
      minrange = 5000;
      check = "??????";
      search = true;
    } else if (msg.content === "???????????????") {
      item = "???????????????";
      maxrange = 10000;
      minrange = 1000;
      check = "???????????????";
      search = true;
    } else if (msg.content === "????????????") {
      item = "????????????";
      maxrange = 1000;
      minrange = 300;
      check = "????????????";
      search = true;
    } else if (msg.content === "30%??????") {
      item = "30%??????";
      maxrange = 8000;
      minrange = 4000;
      check = "30%??????";
      search = true;
    } else if (msg.content === "33%??????") {
      item = "33%??????";
      maxrange = 8000;
      minrange = 4500;
      check = "33%??????";
      search = true;
    } else if (msg.content === "36%??????") {
      item = "36%??????";
      maxrange = 9000;
      minrange = 5000;
      check = "36%??????";
      search = true;
    } else if (msg.content === "39%??????") {
      item = "39%??????";
      maxrange = 14000;
      minrange = 6800;
      check = "39%??????";
      search = true;
    } else if (msg.content === "33%??????") {
      item = "33%??????";
      maxrange = 10000;
      minrange = 4000;
      check = "33%??????";
      search = true;
    } else if (msg.content === "36%??????") {
      item = "36%??????";
      maxrange = 12000;
      minrange = 5000;
      check = "36%??????";
      search = true;
    } else if (msg.content === "39%??????") {
      item = "39%??????";
      maxrange = 14000;
      minrange = 6000;
      check = "39%??????";
      search = true;
    } else if (msg.content === "33%??????") {
      item = "33%??????";
      maxrange = 10000;
      minrange = 4000;
      check = "33%??????";
      search = true;
    } else if (msg.content === "36%??????") {
      item = "36%??????";
      maxrange = 12000;
      minrange = 5000;
      check = "36%??????";
      search = true;
    } else if (msg.content === "39%??????") {
      item = "39%??????";
      maxrange = 14000;
      minrange = 6000;
      check = "39%??????";
      search = true;
    } else if (msg.content === "36%??????") {
      item = "36%??????";
      maxrange = 6000;
      minrange = 2000;
      check = "36%??????";
      search = true;
    } else if (msg.content === "33%??????") {
      item = "33%??????";
      maxrange = 3000;
      minrange = 500;
      check = "33%??????";
      search = true;
    } else if (msg.content === "30%??????") {
      item = "30%??????";
      maxrange = 3000;
      minrange = 500;
      check = "30%??????";
      search = true;
    } else if (msg.content === "39%??????") {
      item = "39%??????";
      maxrange = 8000;
      minrange = 3000;
      check = "39%??????";
      search = true;
    } else if (msg.content === "36%??????") {
      item = "36%??????";
      maxrange = 6000;
      minrange = 1500;
      check = "36%??????";
      search = true;
    } else if (msg.content === "33%??????") {
      item = "33%??????";
      maxrange = 2000;
      minrange = 500;
      check = "33%??????";
      search = true;
    } else if (msg.content === "33%??????") {
      item = "33%??????";
      maxrange = 2000;
      minrange = 500;
      check = "33%??????";
      search = true;
    } else if (msg.content === "36%??????") {
      item = "36%??????";
      maxrange = 4000;
      minrange = 1000;
      check = "36%??????";
      search = true;
    } else if (msg.content === "39%??????") {
      item = "39%??????";
      maxrange = 6000;
      minrange = 1500;
      check = "39%??????";
      search = true;
    } else if (msg.content === "????????????") {
      item = "????????????";
      maxrange = 40000;
      minrange = 10000;
      check = "????????????";
      search = true;
    } else if (msg.content === "36%?????????") {
      item = "36%?????????";
      maxrange = 12000;
      minrange = 4000;
      check = "36%?????????";
      search = true;
    } else if (msg.content === "33%?????????") {
      item = "33%?????????";
      maxrange = 7000;
      minrange = 3000;
      check = "33%?????????";
      search = true;
    } else if (msg.content === "30%?????????") {
      item = "30%?????????";
      maxrange = 5000;
      minrange = 3000;
      check = "30%?????????";
      search = true;
    } else if (msg.content === "??????") {
      item = "??????";
      maxrange = 40000;
      minrange = 10000;
      check = "??????";
      search = true;
    } else if (msg.content === "??????100%") {
      item = "??????100%";
      maxrange = 1800;
      minrange = 300;
      check = "??????100%";
      search = true;
    } else if (msg.content === "??????50%") {
      item = "??????50%";
      maxrange = 1000;
      minrange = 300;
      check = "??????50%";
      search = true;
    } else if (msg.content === "HD??????") {
      item = "HD??????";
      maxrange = 600;
      minrange = 150;
      check = "HD??????";
      search = true;
    } else if (msg.content === "30%??????") {
      item = "30%??????";
      maxrange = 8000;
      minrange = 4000;
      check = "30%??????";
      search = true;
    } else if (msg.content === "33%??????") {
      item = "33%??????";
      maxrange = 11000;
      minrange = 5000;
      check = "33%??????";
      search = true;
    } else if (msg.content === "36%??????") {
      item = "36%??????";
      maxrange = 15000;
      minrange = 6000;
      check = "36%??????";
      search = true;
    } else if (msg.content === "17???") {
      item = "17???";
      maxrange = 1000;
      minrange = 100;
      check = "17???";
      search = true;
    } else if (msg.content === "16???") {
      item = "16???";
      maxrange = 1000;
      minrange = 100;
      check = "16???";
      search = true;
    } else if (msg.content === "15???") {
      item = "15???";
      maxrange = 1000;
      minrange = 100;
      check = "15???";
      search = true;
    } else if (msg.content.includes("!!(") && msg.content.includes("????????????") === false) {
      msg.content = msg.content.replace("!!", "");
      msg.content = msg.content.replace("(", "");
      msg.content = msg.content.replace(")", "");
      let spl = msg.content.split(",")
      maxrange = parseInt(spl[1]);
      minrange = parseInt(spl[2]);
      item = spl[0];
      check = spl[0];
      msg.content = check;
      search = true;
      if (maxrange < minrange) {
        msg.reply("wrong format");
        msg.reply("!!(????????????,????????????,????????????)");
        search = false;
      }
      if (Number.isInteger(maxrange) != true || Number.isInteger(minrange) != true) {
        msg.reply("wrong format");
        msg.reply("!!(????????????,????????????,????????????)");
        search = false;
      }
      if (spl.length != 3) {
        msg.reply("wrong format");
        msg.reply("!!(????????????,????????????,????????????)");
        search = false;
      }
    } else {
      search = false;
    }
    if (msging == false) {
      msg.content = "";
      search = false;
      // msg.reply("bot searching other stuff");
    }
    if (msg.content === "mute my self") {
      msging = false;
      msg.content = "";
      search = false;

    }
    if (msg.content === "not mute my self") {
      msging = true;
    }

    if (msg.content === check && search == true && msg.content.length <= 30 && msging == true) {
      let labels = [];
      let data = {};
      let config = {};
      let temp = [];
      let temp_t = [];
      let output = "";
      msging = false;
      msg.reply("wait for it ??????????????? (????????????????????????????????????????????????????????????)");
      msg.reply("mute my self");
      // start of the program
      msging = false;
      result = "";


      await tyt(item, maxrange, minrange);
      output += return_result();
      var mapAsc = new Map(
        Array
          .from(map)
          .sort((a, b) => {
            // a[0], b[0] is the key of the map
            return a[0] - b[0];
          })
      )
      let map_temp1 = new Map();
      let map_temp2 = new Map();
      for (const [key, value] of mapAsc.entries()) {
        map_temp1.set(key, value);
        map_temp2.set(key, 0);
      }
      reset();
      await fyi(item, maxrange, minrange);
      output = "\r\n--?????????--\r\n" + return_result() + "\r\n\r\n--????????????--\r\n" + output;

      var mapSale = new Map(
        Array
          .from(map)
          .sort((a, b) => {
            // a[0], b[0] is the key of the map
            return a[0] - b[0];
          })
      )

      for (const [key, value] of mapSale.entries()) {
        if (!map_temp1.has(key)) map_temp1.set(key, 0);
        map_temp2.set(key, value);
      }
      var mapAsc_temp = new Map(
        Array
          .from(map_temp1)
          .sort((a, b) => {
            // a[0], b[0] is the key of the map
            return a[0] - b[0];
          })
      )
      var mapSale_temp = new Map(
        Array
          .from(map_temp2)
          .sort((a, b) => {
            // a[0], b[0] is the key of the map
            return a[0] - b[0];
          })
      )
      console.log("--------------------------------------------\n")
      console.log(mapAsc_temp)
      console.log(mapSale_temp)
      for (const [key, value] of mapAsc_temp.entries()) {
        labels.push(key);
        let iop = parseInt(value);
        temp.push(iop);
      }
      for (const [key, value] of mapSale_temp.entries()) {
        let iop = parseInt(value);
        temp_t.push(iop);
      }


      array.length = 0
      msging = true;
      await msg.reply(output)

      const chart = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: "?????????" + item,
            data: temp
          }, {
            label: "??????" + item,
            data: temp_t
          }]
        }
      }
      const encodedChart = encodeURIComponent(JSON.stringify(chart));
      const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;
      console.log(chartUrl);
      const chartEmbed = {
        title: 'Latest Chart',
        description: '??????????????????',
        image: {
          url: chartUrl,
        },
      };
      let sm_url = "";
      /**TinyURL.shorten(chartUrl, function(res, err) {
        if (err)
          console.log(err)
        console.log(res);
        msg.channel.send(res);
        console.log(typeof q_avg === "number")
        console.log(typeof q_best === "number")
        console.log(typeof new_avg === "number")
        console.log(typeof new_best === "number")
        //Number.isNaN(q_avg)==false
        if(Number.isNaN(q_avg)==false&&Number.isNaN(q_best)==false&&Number.isNaN(new_avg)==false&&Number.isNaN(new_best)==false){
        
        uiop(q_objname, q_avg, q_best, res)
        currentp(new_objname, new_avg, new_best, res)
        mongo_curprices(new_objname, new_avg, new_best, res)
        mongo_prices(q_objname, q_avg, q_best, res)
         
        }
      });
      /**console.log("123")
      await shortUrl.short(chartUrl, function(err, url){
        if (err) console.log(err)
        console.log("123")
        console.log(url);
        msg.channel.send(url);
        console.log(typeof q_avg === "number")
        console.log(typeof q_best === "number")
        console.log(typeof new_avg === "number")
        console.log(typeof new_best === "number")
        if(Number.isNaN(q_avg)==false&&Number.isNaN(q_best)==false&&Number.isNaN(new_avg)==false&&Number.isNaN(new_best)==false){
        uiop(q_objname, q_avg, q_best, url)
        currentp(new_objname, new_avg, new_best, url)
        mongo_curprices(new_objname, new_avg, new_best, url)
        mongo_prices(q_objname, q_avg, q_best, url)
        }
        });   **/

        short.setProvider('is.gd');
        short.short(chartUrl, function (url, err) {
        if (err) console.log(err)
        //console.log("123")
        console.log(url);
        msg.channel.send(url);
       if(Number.isNaN(q_avg)==false&&Number.isNaN(q_best)==false&&Number.isNaN(new_avg)==false&&Number.isNaN(new_best)==false){
        uiop(q_objname, q_avg, q_best, url)
        currentp(new_objname, new_avg, new_best, url)
        mongo_curprices(new_objname, new_avg, new_best, url)
        mongo_prices(q_objname, q_avg, q_best, url)
        }   
        });




      await msg.channel.send({ embed: chartEmbed });
      //await msg.reply(chartUrl)


      if (count === 0) {
        await msg.reply("no result")
        msging = true;
      }


    }

    if (msg.content === "??????" && msging === true) {
      msg.reply("wait for it ???????????????");
      msg.reply("mute my self");
      result = "";
      while (bool) {
        msging = false;
        await sleep(200);
        URL = "https://www.8591.com.tw/mallList-list.html?searchGame=859&searchServer=0&searchType=0&searchKey=&firstRow=" + section;
        console.log(URL);
        const _constdata = await getRawData(URL);
        let data = _constdata;
        for (let i = 0; i < 26; i++) {
          if (data.includes("??????????????????")) {
            let index_bottom = data.search("??????????????????");
            data = data.substr(index_bottom + 1);
          }
          let index_bottom = data.search("??????1");
          data = data.substr(index_bottom - 15);
          index_bottom = data.search("\"") + 1;
          data = data.substr(index_bottom);
          let index_top = 0;
          index_bottom = data.search("???");
          let temp = data.substr(index_top, index_bottom - index_top + 1);
          //console.log(temp);
          if (temp != "") array.push(temp);
          if (temp == "") blank++
          data = data.substr(50);
        }
        if (blank < 20) {
          section += 20;
          blank = 0;
        };
        if (blank >= 20) bool = false;
        if (section > 1000) bool = false;
      }
      console.log(array)
      let arr = [];

      // console.log(temp)
      for (let i = 0; i < array.length; i++) {
        let id = array[i].search(":");
        let id_bottom = array[i].search("??????");
        let temp = array[i].substr(id + 1, id_bottom - id - 1)
        let int = parseInt(temp);
        int = Math.round(int)
        arr.push(int)
      }
      arr.sort(compareDecimals);
      arr.reverse();
      console.log(arr)
      result += "??????????????????:\n";
      for (var i = 0; i < 10; i++) {
        if(arr.length>6&&arr[i]/arr[i+1]<2&&arr[i]<=3000){result += "1:" + arr[i] + "???\n";}
      }
      for (var i = 0; i < 10; i++) {
        if(arr[i]<=3000){
          if(arr.length>6&&arr[i]/arr[i+1]<2){
          await money(parseInt(arr[i]));
          await mongo_money(parseInt(arr[i]));
          i=1000;
          }
          }
      }
      
      msging = true;
      await msg.reply(result);
      array.length = 0
      arr.length = 0
    }


    if (msg.content === "help") {
      msg.reply("wait for it ????????????????????????????????????");
      result = "";
      result = input;
      msg.reply("---------------------------");
      msg.reply("?????????????????????  !!(????????????,????????????,????????????) ");
      msg.reply("---------------------------");
      msg.reply(result);
      msg.reply("---------------------------");
      msg.reply("????????????????????????????????????");
      msg.reply("https://forum.gamer.com.tw/C.php?bsn=7650&snA=1018172&tnum=2");


      result = "";

    }

    if (msg.content === "????????????") {
      msg.reply("wait for it");
      result = "";
      result = "??????!??????????????????vpn???????????????\n??????????????????\n???????????????\n https://chrome.google.com/webstore/detail/cross-domain-cors/mjhpgnbimicffchbodmgfnemoghjakai\n   ?????????https://bothtml.yuchinchentw.repl.co/ \n\n??????????????????????????????????????????\n ????????????????????????????????????"

      await msg.reply(result)
    }


    if (msg.content === "??????") {

      msg.reply("wait for it");

      // start of the program
      result = "";
      result = "????????????";
      await msg.reply(result)


    }

    if (msg.content === "test") {

      msg.reply("wait for it");


      // With async function



    }


  }
}

)

function compareDecimals(a, b) {
  if (a === b)
    return 0;

  return a < b ? -1 : 1;
}

client.login(token);

async function mongo_prices(obj, avgprize, bestprize, url) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const dbo = client.db("bot");
    const collection = dbo.collection("prices");
  
    var isoDateString_origin = new Date();
    var isoDateString = new Date().addHours(8);
    console.log(isoDateString);
    avgprize=Math.round(avgprize)
    bestprize=Math.round(bestprize)
    const doc = {
      currentTime: isoDateString_origin,
      objName: obj,
      avgprize: avgprize,
      bestprize: bestprize,
      url: url,
      time: isoDateString
    }
    const result = await collection.insertOne(doc);
    console.log(result)
    

    client.close();

  }finally {
    await client.close();
  }
}
async function mongo_curprices(obj, avgprize, bestprize, url) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const dbo = client.db("bot");
    const collection = dbo.collection("current_prices");
  
    var isoDateString_origin = new Date();
    var isoDateString = new Date().addHours(8);
    console.log(isoDateString);
    avgprize=Math.round(avgprize)
    bestprize=Math.round(bestprize)
    const doc = {
      currentTime: isoDateString_origin,
      objName: obj,
      avgprize: avgprize,
      bestprize: bestprize,
      url: url,
      time: isoDateString
    }
    const result = await collection.insertOne(doc);
    console.log(result)
    

    client.close();

  }finally {
    await client.close();
  }
  
}


async function mongo_money(bestprice) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const dbo = client.db("bot");
    const collection = dbo.collection("money");
  
    var isoDateString_origin = new Date();
    var isoDateString = new Date().addHours(8);
    console.log(isoDateString);
    bestprice=Math.round(bestprice)
    const doc = {
      currentTime: isoDateString_origin,
      bestprice: bestprice,
      time: isoDateString
    }
    const result = await collection.insertOne(doc);
    console.log(result)
    

    client.close();

  }finally {
    await client.close();
  }
}
//process.exit(1);