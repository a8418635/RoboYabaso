var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');  
var app = express();

var jsonParser = bodyParser.json();

var options = {
  host: 'api.line.me',
  port: 443,
  path: '/v2/bot/message/reply',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'OHxP1u3UcmkAFBACkAMvI+k0QSSNXinCy1nYHKxAmAks3hdslDUpW+WIVQGFyRb8ts0XA6m3l5TyQWOpE3/vj1bmOvOaB85IyhKVR/daRkdTdkDLgXj84XEDurkh6EgjEfPY3CoQgCkyNxlv1rUkQQdB04t89/1O/w1cDnyilFU='
  
  }
}
app.set('port', (process.env.PORT || 5000));

// views is directory for all template files

app.get('/', function(req, res) {
//  res.send(parseInput(req.query.input));
  res.send('Hello');
});

app.post('/', jsonParser, function(req, res) {
  let event = req.body.events[0];
  let type = event.type;
  let msgType = event.message.type;
  let msg = event.message.text;
  let rplyToken = event.replyToken;

  let rplyVal = null;
  console.log(msg);
  if (type == 'message' && msgType == 'text') {
    try {
      rplyVal = parseInput(rplyToken, msg); 
    } 
    catch(e) {
      rplyVal = randomReply();
    }
  }

  if (rplyVal) {
    replyMsgToLine(rplyToken, rplyVal); 
  } else {
    console.log('Do not trigger'); 
  }

  res.send('ok');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function replyMsgToLine(rplyToken, rplyVal) {
  let rplyObj = {
    replyToken: rplyToken,
    messages: [
      {
        type: "text",
        text: rplyVal
      }
    ]
  }

  let rplyJson = JSON.stringify(rplyObj); 
  
  var request = https.request(options, function(response) {
    console.log('Status: ' + response.statusCode);
    console.log('Headers: ' + JSON.stringify(response.headers));
    response.setEncoding('utf8');
    response.on('data', function(body) {
      console.log(body); 
    });
  });
  request.on('error', function(e) {
    console.log('Request error: ' + e.message);
  })
  request.end(rplyJson);
}

function parseInput(rplyToken, inputStr) {
        console.log('InputStr: ' + inputStr);
        let msgSplitor = ' ';

        let mainMsg = inputStr.split(msgSplitor); //定義輸入字串，以空格切開
        let trigger = mainMsg[0]; //指定啟動詞在第一個詞
        
        

        

        _isNaN = function(obj) {
          return isNaN(parseInt(obj));
        }                   
        //鴨霸獸指令開始於此
        if (inputStr.match('金屬阿狗') != null && inputStr.match('說明') != null) return randomReply() + '\n' + '\
總之你要擲骰前就先打/r，後面接像是2d6，1d6+3，2d6+1d3之類的就好。  \
\n要多筆輸出就是先空一格再打像是 *5 之類的。  \
\n不要打成大寫D，不要逼我嗆你 \
\n如果是CoC系的話，有初步支援cc擲骰了，獎懲骰也支援了。 \
\n打運勢就可以招喚金屬阿狗幫你算命。 \
\n早餐OR午餐OR晚餐就可以讓金屬阿狗為你推薦菜單\
';
  
  if (inputStr.match('早餐') != null)return breakfast();
   if (inputStr.match('午餐') != null)return lunch();
 if (inputStr.match('晚餐') != null)return dinner();
        if (inputStr.match('金屬阿狗') != null) return randomReply() ;
  
  if (inputStr.match('運勢') != null) return Luck() ;
        
        //cc指令開始於此
        if (inputStr.split('=')[0] == 'cc<') 
        {
          let cctext = null;
          if (mainMsg[1] != undefined ) cctext = mainMsg[1];
          return coc7(parseInt(inputStr.split('=')[1]),cctext);
        }
        
        //獎懲骰設定於此
        if (inputStr.split('=')[0] == 'cc(1)<'||inputStr.split('=')[0] == 'cc(2)<'||inputStr.split('=')[0] == 'cc(-1)<'||inputStr.split('=')[0] == 'cc(-2)<') 
        {
          let cctext = null;
          if (mainMsg[1] != undefined ) cctext = mainMsg[1];
          return coc7bp(parseInt(inputStr.split('=')[1]),parseInt(inputStr.split('(')[1]),cctext);
        }
        
        //ccb指令開始於此
       if (inputStr.split('=')[0] == 'ccb<') 
        {
          let cctext = null;
          if (mainMsg[1] != undefined ) cctext = mainMsg[1];
          return coc6(parseInt(inputStr.split('=')[1]),cctext);
        }

        
        //roll 指令開始於此
        if (trigger == '/r'){        
                  
          if (inputStr.split(msgSplitor).length == 1) return '\
總之你要擲骰前就先打/r，後面接像是2d6，1d6+3，2d6+1d3之類的就好。  \
\n要多筆輸出就是先空一格再打像是 *5 之類的。  \
\n不要打成大寫D，不要逼我嗆你';
          if (inputStr.split(msgSplitor).length >= 3){
            
            if (mainMsg[2].split('*').length == 2) {
              let tempArr = mainMsg[2].split('*');
              let text = inputStr.split(msgSplitor)[3];
              //secCommand = parseInt(tempArr[1]);
              return MutiRollDice(mainMsg[1],parseInt(tempArr[1]),text);
            }
            return NomalRollDice(mainMsg[1],mainMsg[2]);
          }
          if (inputStr.split(msgSplitor).length == 2){
            return NomalRollDice(mainMsg[1],mainMsg[2]);
          }
          
          
        }
        
        
        if (trigger != 'roll') return null;
        
      }

function coc6(chack,text){
          let temp = Dice(100);


          if (text == null ) {
            if (temp == 100) return temp + ' → 啊！大失敗！';
            if (temp <= chack) return temp + ' → 成功';
            else return temp + ' → 失敗' ;
          }
          else
    {
            if (temp == 100) return temp + ' → 啊！大失敗！；' + text;
            if (temp <= chack) return temp + ' → 成功；' + text;
            else return temp + ' → 失敗；' + text;
    }
}        
        
function coc7(chack,text){
  let temp = Dice(100);  
  if (text == null ) {
    if (temp == 1) return temp + ' → 恭喜！大成功！';
    if (temp == 100) return temp + ' → 啊！大失敗！';
    if (temp <= chack/5) return temp + ' → 極限成功';
    if (temp <= chack/2) return temp + ' → 困難成功';
    if (temp <= chack) return temp + ' → 通常成功';
    else return temp + ' → 失敗' ;
  }
  else
  {
  if (temp == 1) return temp + ' → 恭喜！大成功！；' + text;
  if (temp == 100) return temp + ' → 啊！大失敗！；' + text;
  if (temp <= chack/5) return temp + ' → 極限成功；' + text;
  if (temp <= chack/2) return temp + ' → 困難成功；' + text;
  if (temp <= chack) return temp + ' → 通常成功；' + text;
  else return temp + ' → 失敗；' + text;
  }
}
        
function coc7chack(temp,chack,text){
  if (text == null ) {
    if (temp == 1) return temp + ' → 恭喜！大成功！';
    if (temp == 100) return temp + ' → 啊！大失敗！';
    if (temp <= chack/5) return temp + ' → 極限成功';
    if (temp <= chack/2) return temp + ' → 困難成功';
    if (temp <= chack) return temp + ' → 通常成功';
    else return temp + ' → 失敗' ;
  }
else
  {
    if (temp == 1) return temp + ' → 恭喜！大成功！；' + text;
    if (temp == 100) return temp + ' → 啊！大失敗！；' + text;
    if (temp <= chack/5) return temp + ' → 極限成功；' + text;
    if (temp <= chack/2) return temp + ' → 困難成功；' + text;
    if (temp <= chack) return temp + ' → 通常成功；' + text;
    else return temp + ' → 失敗；' + text;
  }
}


function coc7bp (chack,bpdiceNum,text){
  let temp0 = Dice(10) - 1;
  let countStr = '';
  
  if (bpdiceNum > 0){
  for (let i = 0; i <= bpdiceNum; i++ ){
    let temp = Dice(10);
    let temp2 = temp.toString() + temp0.toString();
    if (temp2 > 100) temp2 = parseInt(temp2) - 100;  
    countStr = countStr + temp2 + '、';
  }
  countStr = countStr.substring(0, countStr.length - 1) 
    let countArr = countStr.split('、'); 
    
  countStr = countStr + ' → ' + coc7chack(Math.min(...countArr),chack,text);
  return countStr;
  }
  
  if (bpdiceNum < 0){
    bpdiceNum = Math.abs(bpdiceNum);
    for (let i = 0; i <= bpdiceNum; i++ ){
      let temp = Dice(10);
      let temp2 = temp.toString() + temp0.toString();
      if (temp2 > 100) temp2 = parseInt(temp2) - 100;  
      countStr = countStr + temp2 + '、';
    }
    countStr = countStr.substring(0, countStr.length - 1) 
    let countArr = countStr.split('、'); 

    countStr = countStr + ' → ' + coc7chack(Math.max(...countArr),chack,text);
    return countStr;
  }
  
}
        
function ArrMax (Arr){
  var max = this[0];
  this.forEach (function(ele,index,arr){
    if(ele > max) {
      max = ele;
    }
  })
  return max;
}
        

        function MutiRollDice(DiceToCal,timesNum,text){
          let cuntSplitor = '+';
          let comSplitor = 'd';
          let CuntArr = DiceToCal.split(cuntSplitor);
          let numMax = CuntArr.length - 1 ; //設定要做的加法的大次數

          var count = 0;
          let countStr = '';
          if (DiceToCal.match('D') != null) return randomReply() + '\n格式錯啦，d要小寫！';

          if (text == null) {
            for (let j = 1 ; j <= timesNum ; j++){
              count = 0;
              for (let i = 0; i <= numMax; i++) {

                let commandArr = CuntArr[i].split(comSplitor);
                let countOfNum = commandArr[0];
                let randomRange = commandArr[1];
                if (randomRange == null) {
                  let temp = parseInt(countOfNum);
                  //countStr = countStr + temp + '+';
                  count += temp; 
                }
                else{

                  for (let idx = 1; idx <= countOfNum; idx ++) {
                    let temp = Dice(randomRange);
                    //countStr = countStr + temp + '+';
                    count += temp; 
                  }
                }
              }
              countStr = countStr + count + '、';
            }
            countStr = countStr.substring(0, countStr.length - 1) ;
            return countStr;
          }

          if (text != null) {
            for (let j = 1 ; j <= timesNum ; j++){
              count = 0;
              for (let i = 0; i <= numMax; i++) {

                let commandArr = CuntArr[i].split(comSplitor);
                let countOfNum = commandArr[0];
                let randomRange = commandArr[1];
                if (randomRange == null) {
                  let temp = parseInt(countOfNum);
                  //countStr = countStr + temp + '+';
                  count += temp; 
                }
                else{

                  for (let idx = 1; idx <= countOfNum; idx ++) {
                    let temp = Dice(randomRange);
                    //countStr = countStr + temp + '+';
                    count += temp; 
                  }
                }
              }
              countStr = countStr + count + '、';
            }
            countStr = countStr.substring(0, countStr.length - 1) + '；' + text;
            return countStr;
          }
        }
        
        
function NomalRollDice(DiceToCal,text){
    let cuntSplitor = '+';
    let comSplitor = 'd';
    let CuntArr = DiceToCal.split(cuntSplitor);
    let numMax = CuntArr.length - 1 ; //設定要做的加法的大次數

    var count = 0;
    let countStr = '';
  if (DiceToCal.match('D') != null) return randomReply() + '\n格式錯啦，d要小寫！';
    for (let i = 0; i <= numMax; i++) {
      
      let commandArr = CuntArr[i].split(comSplitor);
      let countOfNum = commandArr[0];
      let randomRange = commandArr[1];
      if (randomRange == null) {
        let temp = parseInt(countOfNum);
        countStr = countStr + temp + '+';
        count += temp; 
       }
       else{
          
        for (let idx = 1; idx <= countOfNum; idx ++) {
          let temp = Dice(randomRange);
          countStr = countStr + temp + '+';
          count += temp; 
        }      }
    }
  
    
  if (countStr.split(cuntSplitor).length == 2) {
    if (text == null ) countStr = count;
    else countStr = count + '；' + text;
  } 
  else {
    if (text == null ) countStr = countStr.substring(0, countStr.length - 1) + '=' + count;
    else countStr = countStr.substring(0, countStr.length - 1) + '=' + count + '；' + text;
  }
return countStr;
          
}


        function Dice(diceSided){          
          return Math.floor((Math.random() * diceSided) + 1)
        }              


        function randomReply() {
          let rplyArr = ['87不要亂玩。', '金屬阿狗說你好 你好87', '就說了不要隨便叫我。', '請不要說話拜偷','你知道在非洲每一分鐘就會有一個87招喚金屬阿狗嗎?','據說隔壁澳洲有人在拔嘴'];
          return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
        }//自定義回應句
function Luck() {
          let rplyArr = ['大吉大利 恭喜你官司纏身', '中吉 這種不大也不小的東西就跟你的人生一樣', '小吉 阿不就好棒逆', '凶 吾夜觀天象 有一死兆星','大凶 我看妳印堂發黑 但你我有緣 這邊一份護身符就10元賣你','凶 血光之災 血光之災'];
          return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
        }//運勢
function dinner() {
          let rplyArr = [
            '\牛肉麵如何? \
\n肥美多汁的牛肉配上勁道十足的麵條',
          '\咖哩飯如何? \
\n香氣四溢的醬汁淋在香甜的白飯上面，用適當的辣度佐著軟爛的馬鈴薯',
          '\雞排如何? \
\n酥脆的麵衣包裹著多汁的雞肉，剛剛好的熱度，微量的胡椒',
          '\火鍋如何? \
\n豐富的配料，燉煮軟爛的高麗菜，隨心意添加的肉片，整鍋滿滿的高湯澆淋在飯上',
          '\水餃如何? \
\n薄薄的皮中可以看見肉與菜的顏色，一口咬下，滾燙的肉汁噴灑在嘴裡',
          '\義大利麵如何? \
\n微酸的醬汁沾染在彈牙的麵條上，把麵給染上紅色'];
          return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
        }//晚餐
function breakfast() {
          let rplyArr = [
            '\漢堡如何? \
\n層層堆疊的厚實肉塊上有著融化的起司和爽脆的生菜',
          '\三明治如何? \
\n白軟的麵包中夾著一層層的生菜和火腿，清爽',
          '\鐵板麵如何? \
\n麵條上沾滿微辣的黑胡椒醬汁，肉片青菜隨意的點綴著',
          '\小籠包如何? \
\n剛好的一口大小可以輕鬆享用，火熱的肉汁一咬下就塞滿口中',
          '\蛋餅如何? \
\n就算只有蛋也很好吃，但如果可以的話就加上一點香氣四溢的培根，香甜的玉米，融化的牽絲起司',
          '\飯糰如何? \
\n滿滿的糯米裡面夾著肉鬆和鹹菜，口味多變又可以讓人充滿飽足'];
          return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
        }
function lunch() {
          let rplyArr = [
          '\蛋包飯如何? \
\n在茄紅的米飯上面裹上一層蛋衣，蛋與飯可以一同輕鬆享用 \ ',
          '\牛排如何? \
\n滋滋作響的鐵板上面有著軟嫩的牛排，沾上薄鹽',
          '\涼拌空氣佐高能量水如何? \
\n清涼的空氣中充滿了臭氧的清新，配上高能量水補充一天所需',
          '\拉麵如何? \
\n濃厚的豚骨高湯中放著叉燒筍乾糖心蛋，厚實的麵條是匠人精心製作',
          '\滷肉飯如何? \
\n在普通的白飯上淋上一層入味的肉汁就可以讓它變成一道美味佳餚，配上一些剁碎的筍乾更是絕配',
          '\麵包如何? \
\n螺旋型的麵包內夾著甜膩的奶油，撒上一些葡萄乾和糖粉來點綴著'];
          return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
        }


