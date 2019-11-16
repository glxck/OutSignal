const TelegramBot = require('node-telegram-bot-api');
const token = '1007008451:AAFJZMHJrpWTFDOd8yIGHa_JVujSpzlfoVM';
const bot = new TelegramBot(token, {polling: true});
const Welcome = 'Этого Бота вы можете использовать в целях публикации статей и любой вам угодной информации.'+ '\n' +'Для того что бы запостить новую статью просто перешлите ее мне.'
bot.onText(/\/start/, (msg) => {
    const userId = msg.from.id;
    bot.sendMessage(userId, 'Grüße an meinen Führer'+ '\n'+ '\n' + Welcome)
    console.log(msg)
})
//NEWS BLOCK
bot.on('photo', function(msg) {
    var photoId = msg.photo[msg.photo.length-1].file_id;
    var path = bot.downloadFile(photoId, './');
});
bot.on('photo', function(msg) {
    const userId = msg.from.id;
    const photoId = msg.photo[msg.photo.length-1].file_id;
    const path = bot.downloadFile(photoId, "./").then(function (path) {
        console.log(path);
    });
    bot.sendPhoto(userId, photoId, {
        caption: msg.caption
    })
    setTimeout(() => bot.sendMessage(userId, 'Задайте заголовок статьи'), 1000)
    bot.on( 'message',(msg) => {
        bot.sendMessage(userId, 'Заголовок добавлен')
    })
    let article = {
        title: msg,
        pic: photoId,
        data: msg.caption
    }
    console.log(article.data);

});