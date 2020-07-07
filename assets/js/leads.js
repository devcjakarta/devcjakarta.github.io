
leadsJsonURL = "https://raw.githubusercontent.com/devcjakarta/Public-Data/master/data/leads.json";
imageUrl = "https://raw.githubusercontent.com/devcjakarta/Public-Data/master/files/image/leads/";
Token = "";

$(function () {
    var header = {};
    $("#lead-card-template").addClass('hidden');
    
    fetchJSONFile(leadsJsonURL,LeadListCallback);
    //httpGet(leadsJsonURL,header,LeadListCallback);
});

function LeadListCallback(AResponse){
    //if (AResponse.code !== 0){
    //    return;
    //}
    template = getLeadCardTemplate();
    leadList = AResponse.data;
    leadList.forEach(function(el) {
        html = template;
        image = imageUrl + el.picture;
        
        html = html.replace(/%name%/g, el.name);
        html = html.replace(/%title%/g, el.title);
        html = html.replace(/%summary%/g, el.summary);
        html = html.replace(/%image%/g, image);
        
        $( html ).insertBefore( $( "#lead-card-template" ) );        
    });

    
}


function getLeadCardTemplate(){
    html = '<div class="col-sm-6 col-lg-4 col-xl-3 lead-card">';
    html += $("#lead-card-template").html();
    html += "</div";
    return html;
}

