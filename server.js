/**
 * 21.07.2020
 * Author İsmet Murat ONAY
 * Gmail: imuratony@gmail.com
 * Github : https://github.com/muratonay1
 * 
 * Contact me if you have a question!
 */
console.clear();
var WebSocket = require('ws').Server;
var wss = new WebSocket({ port: 8000 });
var counter = 0;
var users = {};
var AllUser = [];
const chalkAnimation = require('chalk-animation');
var text =
    "R E A C T    N A T I V E    I N T E G R A T E    W E B S O C K E T    S E R V E R\n";
const chalk = require("chalk");
var rainbow = chalkAnimation.rainbow(text);
setTimeout(() => 
{
    rainbow.start(); // Animation resumes
}, 2000);
wss.on('connection', function (CONNECTION) {
    ++counter;
    console.log(" \nUser Connected Web Socket Server");
    console.log(chalk.cyan('Total Client: '), counter);
    CONNECTION.on('message', function (message) 
    {
        var data;
        data = JSON.parse(message);
        switch (data.type) 
        {
            case "login":
                if (users[data.name]) 
                {
                    sendTo(CONNECTION, {
                        type: "login",
                        success: false
                    });
                }
                else {
                    console.log(chalk.bgBlue("\n\n"+data.name, " Recorded"));
                    //console.log("userlar: ",users);
                    users[data.name] = CONNECTION;
                    AllUser.push(data.name);
                    CONNECTION.name = data.name;
                    console.log("All Registered User: ", AllUser);
                    sendTo(CONNECTION, {
                        type: "login",
                        success: true
                    })
                }
                break;
            case "messageOffer":
                console.log("\n" + chalk.bgGrey("\n\n",data.name+" send a message to ",data.callename+"\n"));
                if(users[data.callename] != null)
                {
                    var conn = users[data.callename];
                    CONNECTION.otherName = data.name;
                    sendTo(conn, {
                        type: 'messageOffer',
                        name: CONNECTION.name,
                        callename: data.callename,
                        message: data.message
                    })
                }
                else
                {
                    sendTo(CONNECTION,{
                        type:'UserNotFound',
                        value:false
                    })
                }
                break;
            case "broadcast":
                CONNECTION.otherName = data.name;
                console.log(chalk.bgGreen("\n\n",data.name+" Performing Broadcast!\n"));
                for (var i = 0; i < AllUser.length; i++) {
                    
                    if (AllUser[i] == data.name) 
                    {/**biz hariç */ }
                    else
                    {
                        var conn = users[AllUser[i]];
                        console.log("\nMessage sent to user: ",AllUser[i]);
                        sendTo(conn, {
                            type: 'broadcast',
                            name: CONNECTION.name,
                            callename: AllUser[i],
                            message: data.message
                        })
                    }
                }
                break;
            case "userlist":
                var conn = users[data.name];
                if (conn != null) 
                {
                    CONNECTION.otherName = data.name;
                    console.log(CONNECTION.otherName);
                    sendTo(conn, {
                        type: "userlist",
                        name: connection.name,
                        userlist: AllUser
                    })
                }
                break;
            default:
                console.log("unknown client request")
                break;
        }
    })
})
function sendTo(connection, message) 
{
    connection.send(JSON.stringify(message));
}
