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
let item = "乾淨滅龍";
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
        const _constdata = await getRawData(URL);
        let data = _constdata;
        for (let i = 0; i < 26; i++) {

          let index_bottom = data.search("元</b>");
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
      console.log(item + " 樣本數:" + count + " 平均價:" + (avg / count));
      result += item + " 樣本數:" + count + " 平均價格:" + (avg / count) + "\r";
      if (count < 50) {
        console.log("樣本數低於50 平均價格不夠準確");
        result += "樣本數低於50 平均價格不夠準確\r";
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
        result += "\r\n建議最大最小價格設定值:\r\n" + Math.floor((max / (arr.length)) * 8) + "~" + Math.floor((max / (arr.length)) * 3 / 100);
        let possible_pr = 0;
        if (max / (arr.length) > arr_avg) possible_pr = (max / (arr.length)) * 0.9
        if (max / (arr.length) <= arr_avg) possible_pr = (max / (arr.length))
        result += "\r\n可能最佳價格:\r\n" + possible_pr;
        new_best = possible_pr;
        // result += "\r\n最小可能價格:\r\n"
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
        const _constdata = await getRawData(URL);
        let data = _constdata;
        for (let i = 0; i < 26; i++) {

          let index_bottom = data.search("元</b>");
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
      console.log(item + " 樣本數:" + count + " 平均價:" + (avg / count));
      result += item + " 樣本數:" + count + " 平均價格:" + (avg / count) + "\r";
      if (count < 50) {
        console.log("樣本數低於50 平均價格不夠準確");
        result += "樣本數低於50 平均價格不夠準確\r";
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
        result += "\r\n建議最大最小價格設定值:\r\n" + Math.floor((max / (arr.length)) * 8) + "~" + Math.floor((max / (arr.length)) * 3 / 100);
        let possible_pr = 0;
        if (max / (arr.length) > arr_avg) possible_pr = (max / (arr.length)) * 0.9
        if (max / (arr.length) <= arr_avg) possible_pr = (max / (arr.length))
        result += "\r\n可能最佳價格:\r\n" + possible_pr;
        q_best = possible_pr;
        /* result += "\r\n最小可能價格:\r\n"
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

    if (msg.content === "乾淨滅龍") {
      item = "乾淨滅龍";
      maxrange = 7000;
      minrange = 2000;
      check = "乾淨滅龍";
      search = true;
    } else if (msg.content === "輪迴") {
      item = "輪迴";
      maxrange = 100000;
      minrange = 30000;
      check = "輪迴";
      search = true;
    } else if (msg.content === "武公寶珠") {
      item = "武公寶珠";
      maxrange = 7000;
      minrange = 3000;
      check = "武公寶珠";
      search = true;
    } else if (msg.content === "戰女") {
      item = "戰女";
      maxrange = 10000;
      minrange = 500;
      check = "戰女";
      search = true;
    } else if (msg.content === "戰男") {
      item = "戰男";
      maxrange = 10000;
      minrange = 500;
      check = "戰男";
      search = true;

    } else if (msg.content === "乾淨天上") {
      item = "乾淨天上";
      maxrange = 10000;
      minrange = 1000;
      check = "乾淨天上";
      search = true;
    } else if (msg.content === "燃燒戒指") {
      item = "燃燒戒指";
      maxrange = 10000;
      minrange = 1000;
      check = "燃燒戒指";
      search = true;
    } else if (msg.content === "艾戒") {
      item = "艾戒";
      maxrange = 10000;
      minrange = 1000;
      check = "艾戒";
      search = true;
    } else if (msg.content === "苦行") {
      item = "苦行";
      maxrange = 10000;
      minrange = 1000;
      check = "苦行";
      search = true;
    } else if (msg.content === "苦痛") {
      item = "苦痛";
      maxrange = 15000;
      minrange = 1000;
      check = "苦痛";
      search = true;
    } else if (msg.content === "巨大的恐怖") {
      item = "巨大的恐怖";
      maxrange = 15000;
      minrange = 1000;
      check = "巨大的恐怖";
      search = true;
    } else if (msg.content === "精靈墜飾") {
      item = "精靈墜飾";
      maxrange = 10000;
      minrange = 1000;
      check = "精靈墜飾";
      search = true;

    } else if (msg.content === "眼球") {
      item = "眼球";
      maxrange = 15000;
      minrange = 1000;
      check = "眼球";
      search = true;
    } else if (msg.content === "小筱") {
      item = "小筱";
      maxrange = 8000;
      minrange = 1000;
      check = "小筱";
      search = true;
    } else if (msg.content === "MX131") {
      item = "MX131";
      maxrange = 5000;
      minrange = 1000;
      check = "MX131";
      search = true;
    } else if (msg.content === "黑翼") {
      item = "黑翼";
      maxrange = 7000;
      minrange = 1000;
      check = "黑翼";
      search = true;
    } else if (msg.content === "乾淨死神") {
      item = "乾淨死神";
      maxrange = 2000;
      minrange = 100;
      check = "乾淨死神";
      search = true;
    } else if (msg.content === "內面耀光") {
      item = "內面耀光";
      maxrange = 4000;
      minrange = 500;
      check = "內面耀光";
      search = true;
    } else if (msg.content === "雙總魔") {
      item = "雙總魔";
      maxrange = 10000;
      minrange = 4500;
      check = "雙總魔";
      search = true;
    } else if (msg.content === "雙終魔") {
      item = "雙終魔";
      maxrange = 10000;
      minrange = 4500;
      check = "雙終魔";
      search = true;
    } else if (msg.content === "雙總物") {
      item = "雙總物";
      maxrange = 23000;
      minrange = 8500;
      check = "雙總物";
      search = true;
    } else if (msg.content === "雙終物") {
      item = "雙終物";
      maxrange = 23000;
      minrange = 8500;
      check = "雙終物";
      search = true;
    } else if (msg.content === "三加持") {
      item = "三加持";
      maxrange = 19000;
      minrange = 2500;
      check = "三加持";
      search = true;
    } else if (msg.content === "雙終") {
      item = "雙終";
      maxrange = 3000;
      minrange = 1000;
      check = "雙終";
      search = true;
    } else if (msg.content === "雙總") {
      item = "雙總";
      maxrange = 3000;
      minrange = 1000;
      check = "雙總";
      search = true;
    } else if (msg.content === "三總") {
      item = "三總";
      maxrange = 200000;
      minrange = 70000;
      check = "三總";
      search = true;
    } else if (msg.content === "三終") {
      item = "三終";
      maxrange = 200000;
      minrange = 70000;
      check = "三終";
      search = true;
    } else if (msg.content === "女武神") {
      item = "女武神";
      maxrange = 5000;
      minrange = 2500;
      check = "女武神";
      search = true;
    } else if (msg.content === "md") {
      item = "md";
      maxrange = 25000;
      minrange = 14000;
      check = "md";
      search = true;
    } else if (msg.content === "p寵") {
      item = "p寵";
      maxrange = 8000;
      minrange = 2000;
      check = "p寵";
      search = true;
    } else if (msg.content === "露耳") {
      item = "露耳";
      maxrange = 3000;
      minrange = 300;
      check = "露耳";
      search = true;
    } else if (msg.content === "20星") {
      item = "20星";
      maxrange = 5500;
      minrange = 2000;
      check = "20星";
      search = true;
    } else if (msg.content === "19星") {
      item = "19星";
      maxrange = 2000;
      minrange = 800;
      check = "19星";
      search = true;
    } else if (msg.content === "追加100") {
      item = "追加100";
      maxrange = 4000;
      minrange = 1800;
      check = "追加100";
      search = true;
    } else if (msg.content === "追加50") {
      item = "追加50";
      maxrange = 2000;
      minrange = 500;
      check = "追加50";
      search = true;
    } else if (msg.content === "追加30") {
      item = "追加30";
      maxrange = 1500;
      minrange = 200;
      check = "追加30";
      search = true;
    } else if (msg.content === "口紅") {
      item = "口紅";
      maxrange = 6000;
      minrange = 2000;
      check = "口紅";
      search = true;
    } else if (msg.content === "眼罩") {
      item = "眼罩";
      maxrange = 6000;
      minrange = 2000;
      check = "眼罩";
      search = true;
    } else if (msg.content === "魔導書") {
      item = "魔導書";
      maxrange = 6000;
      minrange = 2000;
      check = "魔導書";
      search = true;
    } else if (msg.content === "音樂蔥") {
      item = "音樂蔥";
      maxrange = 7000;
      minrange = 2000;
      check = "音樂蔥";
      search = true;
    } else if (msg.content === "幽暗") {
      item = "幽暗";
      maxrange = 8000;
      minrange = 1000;
      check = "幽暗";
      search = true;
    } else if (msg.content === "白槌") {
      item = "白槌";
      maxrange = 130;
      minrange = 40;
      check = "白槌";
      search = true;
    } else if (msg.content === "影子刀") {
      item = "影子刀";
      maxrange = 16000;
      minrange = 2000;
      check = "影子刀";
      search = true;
    } else if (msg.content === "血刀") {
      item = "血刀";
      maxrange = 19000;
      minrange = 5000;
      check = "血刀";
      search = true;
    } else if (msg.content === "紅武士之刃") {
      item = "紅武士之刃";
      maxrange = 5000;
      minrange = 1000;
      check = "紅武士之刃";
      search = true;
    } else if (msg.content === "懸賞葫蘆") {
      item = "懸賞葫蘆";
      maxrange = 1000;
      minrange = 300;
      check = "懸賞葫蘆";
      search = true;
    } else if (msg.content === "30%滅龍") {
      item = "30%滅龍";
      maxrange = 8000;
      minrange = 4000;
      check = "30%滅龍";
      search = true;
    } else if (msg.content === "33%滅龍") {
      item = "33%滅龍";
      maxrange = 8000;
      minrange = 4500;
      check = "33%滅龍";
      search = true;
    } else if (msg.content === "36%滅龍") {
      item = "36%滅龍";
      maxrange = 9000;
      minrange = 5000;
      check = "36%滅龍";
      search = true;
    } else if (msg.content === "39%滅龍") {
      item = "39%滅龍";
      maxrange = 14000;
      minrange = 6800;
      check = "39%滅龍";
      search = true;
    } else if (msg.content === "33%口紅") {
      item = "33%口紅";
      maxrange = 10000;
      minrange = 4000;
      check = "33%口紅";
      search = true;
    } else if (msg.content === "36%口紅") {
      item = "36%口紅";
      maxrange = 12000;
      minrange = 5000;
      check = "36%口紅";
      search = true;
    } else if (msg.content === "39%口紅") {
      item = "39%口紅";
      maxrange = 14000;
      minrange = 6000;
      check = "39%口紅";
      search = true;
    } else if (msg.content === "33%眼罩") {
      item = "33%眼罩";
      maxrange = 10000;
      minrange = 4000;
      check = "33%眼罩";
      search = true;
    } else if (msg.content === "36%眼罩") {
      item = "36%眼罩";
      maxrange = 12000;
      minrange = 5000;
      check = "36%眼罩";
      search = true;
    } else if (msg.content === "39%眼罩") {
      item = "39%眼罩";
      maxrange = 14000;
      minrange = 6000;
      check = "39%眼罩";
      search = true;
    } else if (msg.content === "36%頂培") {
      item = "36%頂培";
      maxrange = 6000;
      minrange = 2000;
      check = "36%頂培";
      search = true;
    } else if (msg.content === "33%頂培") {
      item = "33%頂培";
      maxrange = 3000;
      minrange = 500;
      check = "33%頂培";
      search = true;
    } else if (msg.content === "30%頂培") {
      item = "30%頂培";
      maxrange = 3000;
      minrange = 500;
      check = "30%頂培";
      search = true;
    } else if (msg.content === "39%大魔") {
      item = "39%大魔";
      maxrange = 8000;
      minrange = 3000;
      check = "39%大魔";
      search = true;
    } else if (msg.content === "36%大魔") {
      item = "36%大魔";
      maxrange = 6000;
      minrange = 1500;
      check = "36%大魔";
      search = true;
    } else if (msg.content === "33%大魔") {
      item = "33%大魔";
      maxrange = 2000;
      minrange = 500;
      check = "33%大魔";
      search = true;
    } else if (msg.content === "33%小魔") {
      item = "33%小魔";
      maxrange = 2000;
      minrange = 500;
      check = "33%小魔";
      search = true;
    } else if (msg.content === "36%小魔") {
      item = "36%小魔";
      maxrange = 4000;
      minrange = 1000;
      check = "36%小魔";
      search = true;
    } else if (msg.content === "39%小魔") {
      item = "39%小魔";
      maxrange = 6000;
      minrange = 1500;
      check = "39%小魔";
      search = true;
    } else if (msg.content === "覺醒刀片") {
      item = "覺醒刀片";
      maxrange = 30000;
      minrange = 10000;
      check = "覺醒刀片";
      search = true;
    } else if (msg.content === "36%女武神") {
      item = "36%女武神";
      maxrange = 12000;
      minrange = 4000;
      check = "36%女武神";
      search = true;
    } else if (msg.content === "33%女武神") {
      item = "33%女武神";
      maxrange = 7000;
      minrange = 3000;
      check = "33%女武神";
      search = true;
    } else if (msg.content === "30%女武神") {
      item = "30%女武神";
      maxrange = 5000;
      minrange = 3000;
      check = "30%女武神";
      search = true;
    } else if (msg.content === "三爆") {
      item = "三爆";
      maxrange = 40000;
      minrange = 10000;
      check = "三爆";
      search = true;
    } else if (msg.content === "傳說100%") {
      item = "傳說100%";
      maxrange = 1800;
      minrange = 300;
      check = "傳說100%";
      search = true;
    } else if (msg.content === "傳說50%") {
      item = "傳說50%";
      maxrange = 1000;
      minrange = 300;
      check = "傳說50%";
      search = true;
    } else if (msg.content === "HD傳說") {
      item = "HD傳說";
      maxrange = 600;
      minrange = 150;
      check = "HD傳說";
      search = true;
    } else if (msg.content === "30%天上") {
      item = "30%天上";
      maxrange = 8000;
      minrange = 4000;
      check = "30%天上";
      search = true;
    } else if (msg.content === "33%天上") {
      item = "33%天上";
      maxrange = 11000;
      minrange = 5000;
      check = "33%天上";
      search = true;
    } else if (msg.content === "36%天上") {
      item = "36%天上";
      maxrange = 15000;
      minrange = 6000;
      check = "36%天上";
      search = true;
    } else if (msg.content === "17星") {
      item = "17星";
      maxrange = 1000;
      minrange = 100;
      check = "17星";
      search = true;
    } else if (msg.content === "16星") {
      item = "16星";
      maxrange = 1000;
      minrange = 100;
      check = "16星";
      search = true;
    } else if (msg.content === "15星") {
      item = "15星";
      maxrange = 1000;
      minrange = 100;
      check = "15星";
      search = true;
    } else if (msg.content.includes("!!(") && msg.content.includes("物品名稱") === false) {
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
        msg.reply("!!(物品名稱,最大金額,最小金額)");
        search = false;
      }
      if (Number.isInteger(maxrange) != true || Number.isInteger(minrange) != true) {
        msg.reply("wrong format");
        msg.reply("!!(物品名稱,最大金額,最小金額)");
        search = false;
      }
      if (spl.length != 3) {
        msg.reply("wrong format");
        msg.reply("!!(物品名稱,最大金額,最小金額)");
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
      msg.reply("wait for it 搜尋中稍等 (請勿連續輸入，快速連續輸入會導致輸出錯誤)");
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
      output = "\r\n--成交價--\r\n" + return_result() + "\r\n\r\n--未成交價--\r\n" + output;

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
            label: "未成交" + item,
            data: temp
          }, {
            label: "成交" + item,
            data: temp_t
          }]
        }
      }
      const encodedChart = encodeURIComponent(JSON.stringify(chart));
      const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;
      console.log(chartUrl);
      const chartEmbed = {
        title: 'Latest Chart',
        description: '價格走線圖示',
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

    if (msg.content === "幣值" && msging === true) {
      msg.reply("wait for it 搜尋中稍等");
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
          if (data.includes("我收購的商品")) {
            let index_bottom = data.search("我收購的商品");
            data = data.substr(index_bottom + 1);
          }
          let index_bottom = data.search("元【1");
          data = data.substr(index_bottom - 15);
          index_bottom = data.search("\"") + 1;
          data = data.substr(index_bottom);
          let index_top = 0;
          index_bottom = data.search("】");
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
        let id_bottom = array[i].search("萬】");
        let temp = array[i].substr(id + 1, id_bottom - id - 1)
        let int = parseInt(temp);
        int = Math.round(int)
        arr.push(int)
      }
      arr.sort(compareDecimals);
      arr.reverse();
      console.log(arr)
      result += "最高可能價格:\n";
      for (var i = 0; i < 10; i++) {
        if(arr.length>6&&arr[i]/arr[i+1]<2&&arr[i]<=3000){result += "1:" + arr[i] + "萬\n";}
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
      msg.reply("wait for it 請使用下列指令才會有回復");
      result = "";
      result = input;
      msg.reply("---------------------------");
      msg.reply("指令沒有的請打  !!(物品名稱,最大金額,最小金額) ");
      msg.reply("---------------------------");
      msg.reply(result);
      msg.reply("---------------------------");
      msg.reply("有任何問題可以到巴哈留言");
      msg.reply("https://forum.gamer.com.tw/C.php?bsn=7650&snA=1018172&tnum=2");


      result = "";

    }

    if (msg.content === "查詢網站") {
      msg.reply("wait for it");
      result = "";
      result = "注意!此網站建議跨vpn至日本執行\n勿多開該網站\n先安裝插鍵\n https://chrome.google.com/webstore/detail/cross-domain-cors/mjhpgnbimicffchbodmgfnemoghjakai\n   在進入https://bothtml.yuchinchentw.repl.co/ \n\n使用完畢請把插鍵關閉或者移除\n 忘記移除或關閉者後果自負"

      await msg.reply(result)
    }


    if (msg.content === "美好") {

      msg.reply("wait for it");

      // start of the program
      result = "";
      result = "查無此人";
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