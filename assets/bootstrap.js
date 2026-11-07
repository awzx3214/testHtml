(function () {
'use strict';
var data = {};
try {
  var stored = JSON.parse(localStorage.getItem('templateDate') || '{}');
  data = stored && typeof stored === 'object' ? (stored.data || stored) : {};
  if (data.data && typeof data.data === 'object') data = data.data;
} catch (ignore) {}
var TEMPLATE_ID = 195;
var WINTER_TITLE = "立冬神秘礼物";
var WINTER_TIP = "有人为你藏了一份立冬惊喜～";
var WINTER_CONTENT = "谭雨立冬快乐\n谭雨愿你三冬暖\n谭雨天天开心\n有人惦记你\n谭雨记得添衣保暖\n想把温暖送给你\n喝杯热茶暖暖心\n愿你手暖心也暖\n谭雨寒风吹不散好运\n谭雨每一天都元气满满\n谭雨多一点甜少一点累\n愿所有烦恼都融化\n谭雨好好吃饭早点睡\n把快乐悄悄送给你\n愿你的冬天有拥抱\n愿所有美好如约而至\n谭雨平安喜乐顺顺利利\n谭雨这个冬天也要开心";
var OLD_FROG = "万圣节快乐！\n送你一只开心大笑的奶蛙，愿你每天都快乐。";
var OLD_GIFT = ["多喝水哦~\n保持微笑呀\n每天都要元气满满\n记得吃水果\n保持好心情\n好好爱自己\n我想你了\n梦想成真\n期待下一次见面\n别太累啦，偶尔偷懒也好\n你超棒的\n珍惜每一刻\n顺顺利利\n早点休息\n愿所有烦恼都消失\n别熬夜\n天冷了，多穿衣服", "多喝水哦~\n保持微笑呀\n每天都要元气满满\n记得吃水果\n保持好心情\n好好爱自己\n我想你了\n我想你了\n我想你了\n梦想成真\n期待下一次见面\n金榜题名\n别太累啦，偶尔偷懒也好\n要相信自己奥\n你超棒的\n记得好好护肤\n珍惜每一刻\n学会爱自己，才能更好地爱别人\n顺顺利利\n早点休息\n愿所有烦恼都消失\n别熬夜\n今天过得开心嘛\n天冷了，多穿衣服"];

function seasonalText(value) {
  value = String(value || '').replace(/万圣凑堆闹鬼去/g, '立冬相聚送温暖').replace(/不给糖就捣蛋/g, '天冷了记得添衣').replace(/万圣节神秘礼物|万圣节礼物/g, '立冬神秘礼物').replace(/万圣节/g, '立冬').replace(/万圣夜/g, '立冬夜').replace(/万圣/g, '立冬').replace(/闹鬼去/g, '送温暖').replace(/🎃|🦇/g, '❄️').replace(/👻/g, '☃️');
  return TEMPLATE_ID === 194 ? value.replace(/奶蛙/g, '奶娃') : value;
}
function messageLines(value) {
  return String(value || '').replace(/<br\s*\/?>|<\/(?:p|div|li)>/gi, '\n').replace(/<[^>]*>/g, '').replace(/&nbsp;|&#160;/gi, ' ').split(/[\r\n|]+/).map(function (v) { return v.trim(); }).filter(Boolean).join('\n');
}
function winterWork(value) {
  if (!value || typeof value !== 'object' || (value.templateId && Number(value.templateId) !== TEMPLATE_ID)) value = {};
  var title = String(value.title || '').trim();
  var oldTitles = TEMPLATE_ID === 194 ? ['', '万圣节限定奶蛙', '万圣节限定奶娃', '万圣节限定', '万圣节限定礼物', '限定奶蛙', '限定奶娃', '立冬限定奶蛙', '立冬限定奶娃'] : ['', '万圣节礼物', '万圣节神秘礼物', '神秘礼物', '礼物', '立冬礼物', '立冬神秘礼物'];
  value.title = oldTitles.indexOf(title) >= 0 ? WINTER_TITLE : seasonalText(title);
  var lines = messageLines(value.content);
  var oldMessages = TEMPLATE_ID === 194 ? [OLD_FROG] : OLD_GIFT;
  value.content = oldMessages.indexOf(lines) >= 0 || !lines ? WINTER_CONTENT : seasonalText(value.content);
  value.ftitle = value.ftitle || WINTER_TIP;
  if (value.ftitle === '有人给你准备了一份小惊喜～' || value.ftitle === '点一下，收获今天的快乐') value.ftitle = WINTER_TIP;
  value.ftitle = seasonalText(value.ftitle);
  return value;
}
data = winterWork(data);

window.ZE_WORK = data && typeof data === 'object' ? data : {};
function text(value, fallback) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}
function set(selector, value) {
  var element = document.querySelector(selector);
  if (element && value) element.textContent = value;
}
var title = text(data.title, document.title);
document.title = title;
set('[data-work-title]', title);
set('[data-work-message]', text(data.content, WINTER_CONTENT));
set('#dialog h2', title);
set('#tip', text(data.ftitle, WINTER_TIP));
var messages = document.getElementById('messages');
if (messages && text(data.content, '')) messages.textContent = data.content;
var video = document.getElementById('laughVideo');
if (video && /^https?:\/\//i.test(text(data.video, ''))) video.src = data.video;
var replay = document.getElementById('make') || document.getElementById('replay');
if (replay) replay.addEventListener('click', function () { window.location.reload(); });
})();