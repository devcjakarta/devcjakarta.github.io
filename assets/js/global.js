var localToken = '';
var loadingClassName = 'loading-rosary';

var Global = [];
Global.clientId = 0;
Global.channelId = 0;
Global.groupId = 0;
Global.token = '';

// demo
Global.clientId = 0;

$(function () {
    
    'use strict'

    InitApp();
        
});

function InitApp(){
  $.ajaxSetup({ 
    cache: true,
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  });
}

function httpGet(AURL, AHeader = null, ACallback = null, ACallbackOnFailure = null){
  headerData = {};
  headerData = {'Token':''};  
  if (AHeader != null){
    headerData = AHeader;
  }
  $.ajax({
    type: "GET",
    url: AURL,
    crossDomain: true,
    //headers: headerData,
    success: function(result){
      if (ACallback != null){
        ACallback(result);
      }
    },
    error: function (request, status, error) {
      log('httpGet:'+request.responseText);
      if (ACallbackOnFailure != null){
        ACallbackOnFailure(result);
      }
    }
  });
}

function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

function log(AMessage){
  console.log(AMessage);
}

