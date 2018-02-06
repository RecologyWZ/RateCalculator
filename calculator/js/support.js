/**
 * Copyright 2015 Tim Down.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//log4javascript 1.4 Lite
if(!Array.prototype.shift){Array.prototype.shift=function(){if(this.length>0){var firstItem=this[0];for(var i=0,len=this.length-1;i<len;i++){this[i]=this[i+1];}
this.length--;return firstItem;}};}
var log4javascript;(function(){var newLine="\r\n";function Log4JavaScript(){}
log4javascript=new Log4JavaScript();log4javascript.version="1.4.4";log4javascript.edition="log4javascript_lite";function getExceptionMessage(ex){if(ex.message){return ex.message;}else if(ex.description){return ex.description;}else{return String(ex);}}
function getUrlFileName(url){var lastSlashIndex=Math.max(url.lastIndexOf("/"),url.lastIndexOf("\\"));return url.substr(lastSlashIndex+1);}
function getExceptionStringRep(ex){if(ex){var exStr="Exception: "+getExceptionMessage(ex);try{if(ex.lineNumber){exStr+=" on line number "+ex.lineNumber;}
if(ex.fileName){exStr+=" in file "+getUrlFileName(ex.fileName);}}catch(localEx){}
if(showStackTraces&&ex.stack){exStr+=newLine+"Stack trace:"+newLine+ex.stack;}
return exStr;}
return null;}
function isError(err){return(err instanceof Error);}
function bool(obj){return Boolean(obj);}
var enabled=(typeof log4javascript_disabled!="undefined")&&log4javascript_disabled?false:true;log4javascript.setEnabled=function(enable){enabled=bool(enable);};log4javascript.isEnabled=function(){return enabled;};var showStackTraces=false;log4javascript.setShowStackTraces=function(show){showStackTraces=bool(show);};var Level=function(level,name){this.level=level;this.name=name;};Level.prototype={toString:function(){return this.name;},equals:function(level){return this.level==level.level;},isGreaterOrEqual:function(level){return this.level>=level.level;}};Level.ALL=new Level(Number.MIN_VALUE,"ALL");Level.TRACE=new Level(10000,"TRACE");Level.DEBUG=new Level(20000,"DEBUG");Level.INFO=new Level(30000,"INFO");Level.WARN=new Level(40000,"WARN");Level.ERROR=new Level(50000,"ERROR");Level.FATAL=new Level(60000,"FATAL");Level.OFF=new Level(Number.MAX_VALUE,"OFF");log4javascript.Level=Level;function Appender(){var getConsoleHtmlLines=function(){return['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">','<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">','<head>','<title>log4javascript</title>','<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />','<!-- Make IE8 behave like IE7, having gone to all the trouble of making IE work -->','<meta http-equiv="X-UA-Compatible" content="IE=7" />','<script type="text/javascript">','//<![CDATA[','var loggingEnabled=true;var messagesBeforeDocLoaded=[];function toggleLoggingEnabled(){setLoggingEnabled($("enableLogging").checked);}','function setLoggingEnabled(enable){loggingEnabled=enable;}','function scrollToLatestEntry(){var l=getLogContainer();if(typeof l.scrollTop!="undefined"){var latestLogEntry=l.lastChild;if(latestLogEntry){l.scrollTop=l.scrollHeight;}}}','function log(logLevel,formattedMessage){if(loggingEnabled){if(loaded){doLog(logLevel,formattedMessage);}else{messagesBeforeDocLoaded.push([logLevel,formattedMessage]);}}}','function doLog(logLevel,formattedMessage){var logEntry=document.createElement("div");logEntry.appendChild(document.createTextNode(formattedMessage));logEntry.className="logentry "+logLevel.name;getLogContainer().appendChild(logEntry);scrollToLatestEntry();}','function mainPageReloaded(){var separator=document.createElement("div");separator.className="separator";separator.innerHTML=" ";getLogContainer().appendChild(separator);}','var loaded=false;var logLevels=["DEBUG","INFO","WARN","ERROR","FATAL"];window.onload=function(){setLogContainerHeight();toggleLoggingEnabled();for(var i=0;i<messagesBeforeDocLoaded.length;i++){doLog(messagesBeforeDocLoaded[i][0],messagesBeforeDocLoaded[i][1]);}','messagesBeforeDocLoaded=[];loaded=true;setTimeout(setLogContainerHeight,20);};function getLogContainer(){return $("log");}','function clearLog(){getLogContainer().innerHTML="";}','function $(id){return document.getElementById(id);}','function getWindowHeight(){if(window.innerHeight){return window.innerHeight;}else if(document.documentElement&&document.documentElement.clientHeight){return document.documentElement.clientHeight;}else if(document.body){return document.body.clientHeight;}','return 0;}','function getChromeHeight(){return $("toolbar").offsetHeight;}','function setLogContainerHeight(){var windowHeight=getWindowHeight();$("body").style.height=getWindowHeight()+"px";getLogContainer().style.height=""+','Math.max(0,windowHeight-getChromeHeight())+"px";}','window.onresize=function(){setLogContainerHeight();};','//]]>','</scr' + 'ipt>','<style type="text/css">','body{background-color:white;color:black;padding:0;margin:0;font-family:tahoma,verdana,arial,helvetica,sans-serif;overflow:hidden}div#toolbar{border-top:solid #ffffff 1px;border-bottom:solid #aca899 1px;background-color:#f1efe7;padding:3px 5px;font-size:68.75%}div#toolbar input.button{padding:0 5px;font-size:100%}div#log{font-family:Courier New,Courier;font-size:75%;width:100%;overflow:auto;clear:both}*.logentry{overflow:visible;white-space:pre}*.TRACE{color:#666666}*.DEBUG{color:green}*.INFO{color:#000099}*.WARN{color:#999900}*.ERROR{color:red}*.FATAL{color:#660066}div#log div.separator{background-color:#cccccc;margin:5px 0;line-height:1px}','</style>','</head>','<body id="body">','<div id="toolbar">','Options:','<input type="checkbox" id="enableLogging" onclick="toggleLoggingEnabled()" class="stateful" checked="checked" title="Enable/disable logging" /><label for="enableLogging" id="enableLoggingLabel">Enable logging</label>','<input type="button" id="clearButton" value="Clear" onclick="clearLog()" class="stateful button" title="Clear all log messages"  />','<input type="button" id="closeButton" value="Close" onclick="window.close()" class="stateful button" title="Close the window" />','</div>','<div id="log" class="TRACE DEBUG INFO WARN ERROR FATAL"></div>','</body>','</html>'];};var popUp=null;var popUpsBlocked=false;var popUpClosed=false;var popUpLoaded=false;var complainAboutPopUpBlocking=true;var initialized=false;var isSupported=true;var width=600;var height=400;var focusPopUp=false;var queuedLoggingEvents=new Array();function isLoaded(win){try{return bool(win.loaded);}catch(ex){return false;}}
function finalInit(){popUpLoaded=true;appendQueuedLoggingEvents();}
function writeHtml(doc){var lines=getConsoleHtmlLines();doc.open();for(var i=0,len=lines.length;i<len;i++){doc.writeln(lines[i]);}
doc.close();}
function pollConsoleWindow(){function pollConsoleWindowLoaded(){if(popUpLoaded){clearInterval(poll);}else if(bool(popUp)&&isLoaded(popUp)){clearInterval(poll);finalInit();}}
var poll=setInterval(pollConsoleWindowLoaded,100);}
function init(){var windowProperties="width="+width+",height="+height+",status,resizable";var windowName="log4javascriptLitePopUp"+location.host.replace(/[^a-z0-9]/gi,"_");popUp=window.open("",windowName,windowProperties);popUpClosed=false;if(popUp){if(isLoaded(popUp)){popUp.mainPageReloaded();finalInit();}else{writeHtml(popUp.document);if(isLoaded(popUp)){finalInit();}else{pollConsoleWindow();}}}else{isSupported=false;if(complainAboutPopUpBlocking){alert("log4javascript: pop-up windows appear to be blocked. Please unblock them to use pop-up logging.");}}
initialized=true;}
function safeToAppend(){if(!popUpsBlocked&&!popUpClosed){if(popUp.closed){popUpClosed=true;return false;}
if(!popUpLoaded&&popUp.loaded){popUpLoaded=true;}}
return!popUpsBlocked&&popUpLoaded&&!popUpClosed;}
function padWithZeroes(num,len){var str=""+num;while(str.length<len){str="0"+str;}
return str;}
function padWithSpaces(str,len){while(str.length<len){str+=" ";}
return str;}
this.append=function(loggingEvent){if(!initialized){init();}
queuedLoggingEvents.push(loggingEvent);if(safeToAppend()){appendQueuedLoggingEvents();}};function appendQueuedLoggingEvents(){if(safeToAppend()){while(queuedLoggingEvents.length>0){var currentLoggingEvent=queuedLoggingEvents.shift();var date=currentLoggingEvent.timeStamp;var formattedDate=padWithZeroes(date.getHours(),2)+":"+
padWithZeroes(date.getMinutes(),2)+":"+padWithZeroes(date.getSeconds(),2);var formattedMessage=formattedDate+" "+padWithSpaces(currentLoggingEvent.level.name,5)+" - "+currentLoggingEvent.getCombinedMessages();var throwableStringRep=currentLoggingEvent.getThrowableStrRep();if(throwableStringRep){formattedMessage+=newLine+throwableStringRep;}
popUp.log(currentLoggingEvent.level,formattedMessage);}
if(focusPopUp){popUp.focus();}}}}
log4javascript.Appender=Appender;function Logger(){var appender=new Appender();var loggerLevel=Level.ALL;this.log=function(level,params){if(enabled&&level.isGreaterOrEqual(this.getLevel())){var exception;var finalParamIndex=params.length-1;var lastParam=params[params.length-1];if(params.length>1&&isError(lastParam)){exception=lastParam;finalParamIndex--;}
var messages=[];for(var i=0;i<=finalParamIndex;i++){messages[i]=params[i];}
var loggingEvent=new LoggingEvent(this,new Date(),level,messages,exception);appender.append(loggingEvent);}};this.setLevel=function(level){loggerLevel=level;};this.getLevel=function(){return loggerLevel;};}
Logger.prototype={trace:function(){this.log(Level.TRACE,arguments);},debug:function(){this.log(Level.DEBUG,arguments);},info:function(){this.log(Level.INFO,arguments);},warn:function(){this.log(Level.WARN,arguments);},error:function(){this.log(Level.ERROR,arguments);},fatal:function(){this.log(Level.FATAL,arguments);},isEnabledFor:function(level){return level.isGreaterOrEqual(this.getLevel());},isTraceEnabled:function(){return this.isEnabledFor(Level.TRACE);},isDebugEnabled:function(){return this.isEnabledFor(Level.DEBUG);},isInfoEnabled:function(){return this.isEnabledFor(Level.INFO);},isWarnEnabled:function(){return this.isEnabledFor(Level.WARN);},isErrorEnabled:function(){return this.isEnabledFor(Level.ERROR);},isFatalEnabled:function(){return this.isEnabledFor(Level.FATAL);}};var defaultLogger=null;log4javascript.getDefaultLogger=function(){if(!defaultLogger){defaultLogger=new Logger();}
return defaultLogger;};log4javascript.getLogger=log4javascript.getDefaultLogger;var nullLogger=null;log4javascript.getNullLogger=function(){if(!nullLogger){nullLogger=new Logger();nullLogger.setLevel(Level.OFF);}
return nullLogger;};var LoggingEvent=function(logger,timeStamp,level,messages,exception){this.logger=logger;this.timeStamp=timeStamp;this.level=level;this.messages=messages;this.exception=exception;};LoggingEvent.prototype={getThrowableStrRep:function(){return this.exception?getExceptionStringRep(this.exception):"";},getCombinedMessages:function(){return(this.messages.length===1)?this.messages[0]:this.messages.join(newLine);}};log4javascript.LoggingEvent=LoggingEvent;window.log4javascript=log4javascript;})();

// usage: log('inside coolFunc',this,arguments);
// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};

function is_array(mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Legaev Andrey
  // +   bugfixed by: Cord
  // +   bugfixed by: Manish
  // +   improved by: Onno Marsman
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Nathan Sepulveda
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: In php.js, javascript objects are like php associative arrays, thus JavaScript objects will also
  // %        note 1: return true in this function (except for objects which inherit properties, being thus used as objects),
  // %        note 1: unless you do ini_set('phpjs.objectsAsArrays', 0), in which case only genuine JavaScript arrays
  // %        note 1: will return true
  // *     example 1: is_array(['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: true
  // *     example 2: is_array('Kevin van Zonneveld');
  // *     returns 2: false
  // *     example 3: is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
  // *     returns 3: true
  // *     example 4: is_array(function tmp_a(){this.name = 'Kevin'});
  // *     returns 4: false
  var ini,
          _getFuncName = function(fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  },
          _isArray = function(mixed_var) {
    // return Object.prototype.toString.call(mixed_var) === '[object Array]';
    // The above works, but let's do the even more stringent approach: (since Object.prototype.toString could be overridden)
    // Null, Not an object, no length property so couldn't be an Array (or String)
    if (!mixed_var || typeof mixed_var !== 'object' || typeof mixed_var.length !== 'number') {
      return false;
    }
    var len = mixed_var.length;
    mixed_var[mixed_var.length] = 'bogus';
    // The only way I can think of to get around this (or where there would be trouble) would be to have an object defined
    // with a custom "length" getter which changed behavior on each call (or a setter to mess up the following below) or a custom
    // setter for numeric properties, but even that would need to listen for specific indexes; but there should be no false negatives
    // and such a false positive would need to rely on later JavaScript innovations like __defineSetter__
    if (len !== mixed_var.length) { // We know it's an array since length auto-changed with the addition of a
      // numeric property at its length end, so safely get rid of our bogus element
      mixed_var.length -= 1;
      return true;
    }
    // Get rid of the property we added onto a non-array object; only possible
    // side-effect is if the user adds back the property later, it will iterate
    // this property in the older order placement in IE (an order which should not
    // be depended on anyways)
    delete mixed_var[mixed_var.length];
    return false;
  };

  if (!mixed_var || typeof mixed_var !== 'object') {
    return false;
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT

  ini = this.php_js.ini['phpjs.objectsAsArrays'];

  return _isArray(mixed_var) ||
          // Allow returning true unless user has called
                  // ini_set('phpjs.objectsAsArrays', 0) to disallow objects as arrays
                          ((!ini || (// if it's not set to 0 and it's not 'off', check for objects as arrays
                                  (parseInt(ini.local_value, 10) !== 0 && (!ini.local_value.toLowerCase || ini.local_value.toLowerCase() !== 'off')))
                                  ) && (
                                  Object.prototype.toString.call(mixed_var) === '[object Object]' && _getFuncName(mixed_var.constructor) === 'Object' // Most likely a literal and intended as assoc. array
                                  ));
                }

function array_push(inputArr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Note also that IE retains information about property position even
  // %        note 1: after being supposedly deleted, so if you delete properties and then
  // %        note 1: add back properties with the same keys (including numeric) that had
  // %        note 1: been deleted, the order will be as before; thus, this function is not
  // %        note 1: really recommended with associative arrays (objects) in IE environments
  // *     example 1: array_push(['kevin','van'], 'zonneveld');
  // *     returns 1: 3
  var i = 0,
          pr = '',
          argv = arguments,
          argc = argv.length,
          allDigits = /^\d$/,
          size = 0,
          highestIdx = 0,
          len = 0;
  if (inputArr.hasOwnProperty('length')) {
    for (i = 1; i < argc; i++) {
      inputArr[inputArr.length] = argv[i];
    }
    return inputArr.length;
  }

  // Associative (object)
  for (pr in inputArr) {
    if (inputArr.hasOwnProperty(pr)) {
      ++len;
      if (pr.search(allDigits) !== -1) {
        size = parseInt(pr, 10);
        highestIdx = size > highestIdx ? size : highestIdx;
      }
    }
  }
  for (i = 1; i < argc; i++) {
    inputArr[++highestIdx] = argv[i];
  }
  return len + i - 1;
}

function array_sum(array) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Nate
  // +   bugfixed by: Gilbert
  // +   improved by: David Pilia (http://www.beteck.it/)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: array_sum([4, 9, 182.6]);
  // *     returns 1: 195.6
  // *     example 2: total = []; index = 0.1; for (y=0; y < 12; y++){total[y] = y + index;}
  // *     example 2: array_sum(total);
  // *     returns 2: 67.2
  var key, sum = 0;

  if (array && typeof array === 'object' && array.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
    return array.sum.apply(array, Array.prototype.slice.call(arguments, 0));
  }

  // input sanitation
  if (typeof array !== 'object') {
    return null;
  }

  for (key in array) {
    if (!isNaN(parseFloat(array[key]))) {
      sum += parseFloat(array[key]);
    }
  }

  return sum;
}

function in_array(needle, haystack, argStrict) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: vlado houba
  // +   input by: Billy
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: true
  // *     example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
  // *     returns 2: false
  // *     example 3: in_array(1, ['1', '2', '3']);
  // *     returns 3: true
  // *     example 3: in_array(1, ['1', '2', '3'], false);
  // *     returns 3: true
  // *     example 4: in_array(1, ['1', '2', '3'], true);
  // *     returns 4: false
  var key = '',
          strict = !!argStrict;

  if (strict) {
    for (key in haystack) {
      if (haystack[key] === needle) {
        return true;
      }
    }
  } else {
    for (key in haystack) {
      if (haystack[key] == needle) {
        return true;
      }
    }
  }

  return false;
}

function round(value, precision, mode) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // +    revised by: Onno Marsman
  // +      input by: Greenseed
  // +    revised by: T.Wild
  // +      input by: meo
  // +      input by: William
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Josep Sanz (http://www.ws3.es/)
  // +    revised by: Rafał Kukawski (http://blog.kukawski.pl/)
  // %        note 1: Great work. Ideas for improvement:
  // %        note 1:  - code more compliant with developer guidelines
  // %        note 1:  - for implementing PHP constant arguments look at
  // %        note 1:  the pathinfo() function, it offers the greatest
  // %        note 1:  flexibility & compatibility possible
  // *     example 1: round(1241757, -3);
  // *     returns 1: 1242000
  // *     example 2: round(3.6);
  // *     returns 2: 4
  // *     example 3: round(2.835, 2);
  // *     returns 3: 2.84
  // *     example 4: round(1.1749999999999, 2);
  // *     returns 4: 1.17
  // *     example 5: round(58551.799999999996, 2);
  // *     returns 5: 58551.8
  var m, f, isHalf, sgn; // helper variables
  precision |= 0; // making sure precision is integer
  m = Math.pow(10, precision);
  value *= m;
  sgn = (value > 0) | -(value < 0); // sign of the number
  isHalf = value % 1 === 0.5 * sgn;
  f = Math.floor(value);

  if (isHalf) {
    switch (mode) {
      case 'PHP_ROUND_HALF_DOWN':
        value = f + (sgn < 0); // rounds .5 toward zero
        break;
      case 'PHP_ROUND_HALF_EVEN':
        value = f + (f % 2 * sgn); // rouds .5 towards the next even integer
        break;
      case 'PHP_ROUND_HALF_ODD':
        value = f + !(f % 2); // rounds .5 towards the next odd integer
        break;
      default:
        value = f + (sgn > 0); // rounds .5 away from zero
    }
  }

  return (isHalf ? value : Math.round(value)) / m;
}

function empty (mixed_var) {
  // Checks if the argument variable is empty
  // undefined, null, false, number 0, empty string,
  // string "0", objects without properties and empty arrays
  // are considered empty
  //
  // http://kevin.vanzonneveld.net
  // +   original by: Philippe Baumann
  // +      input by: Onno Marsman
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: LH
  // +   improved by: Onno Marsman
  // +   improved by: Francesco
  // +   improved by: Marc Jansen
  // +      input by: Stoyan Kyosev (http://www.svest.org/)
  // +   improved by: Rafal Kukawski
  // *     example 1: empty(null);
  // *     returns 1: true
  // *     example 2: empty(undefined);
  // *     returns 2: true
  // *     example 3: empty([]);
  // *     returns 3: true
  // *     example 4: empty({});
  // *     returns 4: true
  // *     example 5: empty({'aFunc' : function () { alert('humpty'); } });
  // *     returns 5: false
  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, "", "0"];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixed_var === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixed_var === "object") {
    for (key in mixed_var) {
      // TODO: should we check for own properties only?
      //if (mixed_var.hasOwnProperty(key)) {
      return false;
      //}
    }
    return true;
  }

  return false;
}

function isset () {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: FremyCompany
  // +   improved by: Onno Marsman
  // +   improved by: Rafał Kukawski
  // *     example 1: isset( undefined, true);
  // *     returns 1: false
  // *     example 2: isset( 'Kevin van Zonneveld' );
  // *     returns 2: true
  var a = arguments,
    l = a.length,
    i = 0,
    undef;

  if (l === 0) {
    throw new Error('Empty isset');
  }

  while (i !== l) {
    if (a[i] === undef || a[i] === null) {
      return false;
    }
    i++;
  }
  return true;
}

function strpos (haystack, needle, offset) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Onno Marsman
  // +   bugfixed by: Daniel Esteban
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
  // *     returns 1: 14
  var i = (haystack + '').indexOf(needle, (offset || 0));
  return i === -1 ? false : i;
}