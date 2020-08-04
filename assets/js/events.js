
FilesURL = "https://store.rddmiksemar.id/files/";

eventJsonURL = "https://raw.githubusercontent.com/devcjakarta/Public-Data/master/data/events.json";
imageUrl = "https://raw.githubusercontent.com/devcjakarta/Public-Data/master/files/image/";
Token = "";

$(function () {
    var header = {'Token':Token};
    $("#card-template").addClass('hidden');
    httpGet(eventJsonURL,header,EventListCallback);
});

function EventListCallback(AResponse){
    //if (AResponse.code !== 0){
    //    return;
    //}
    template = getCardTemplate();
    eventList = JSON.parse(AResponse);
    eventList.data.forEach(function(el) {
        html = template;
        image = "images/no-image.png";
        image = imageUrl + el.banner;
        date = el.date + ' ' + el.time;
        
        footerLink = '';
        if (el.others !== undefined){
            const others = el.others;
            for (var item in others) {
                key = item.replace("_url", "");
                key = key.replace("_", " ");
                value = others[item];
                if (key == 'Registration'){
                    if ((others['Video_url'] !== "")){
                        value = '';
                    }
                }
                if (value !== ""){
                    footerLink += '<a href="'+value+'">'+key+'</a>';
                }
            }
        }
        
        speaker = '<ul>';
        if (Array.isArray(el.speaker)){            
            el.speaker.forEach(item => {
                speaker += "<li>" + item.name + ', ' + item.title + '</li>'
            });
            
        }else{
            speaker += '<li>' + el.speaker.name + '<br />' + el.speaker.title + '</li>';
        }
        speaker += '</ul>';
        
        html = html.replace(/%title%/g, el.name);
        html = html.replace(/%url%/g, el.url);
        html = html.replace(/%image%/g, image);
        html = html.replace(/%date%/g, date);
        html = html.replace(/%speaker%/g, speaker);
        html = html.replace('<span>%footerLink%</span>', footerLink);
        
        $( html ).insertBefore( $( "#card-template" ) );
    });
}

function ProductListCallback(AResponse){
    if (AResponse.code !== 0){
        return;
    }
    template = getCardTemplate();
    AResponse.data.forEach(function(el) {
        image = "images/no-image.png";
        url = "./product-"+el.pid+"-"+ doDashes(el.name).replace('-','') + '-' + doDashes(el.title);
        if (el.images != null){
            images = el.images.split(",");
            image = FilesURL + "images/products/" + images[0] + ".jpg";
        }
        
        if (el.description == null) el.description = "";
        html = template;
    
        html = html.replace('%url%', url);
        //html = html.replace('%image%', image);
        html = html.replace('%image%', image);
        html = html.replace('%title%', el.title);
        html = html.replace('%name%', el.name);
        html = html.replace('%category%', el.category);
        html = html.replace('%description%', el.description);
        html = html.replace('%date%', "");
        $( html ).insertBefore( $( "#template-card" ) );
      
    });
    //console.log(template);
}


function getCardTemplate(){
    html = '<div class="col-sm-6 col-lg-4 col-xl-3 event-card">';
    html += $("#card-template").html();
    html += "</div";
    return html;
}