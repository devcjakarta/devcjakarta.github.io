
volunteersJsonURL = "https://raw.githubusercontent.com/devcjakarta/Public-Data/master/data/volunteers.json";
imageUrl = "https://raw.githubusercontent.com/devcjakarta/Public-Data/master/files/image/volunteers/";
Token = "";

$(function () {
    var header = {};
    $("#volunteer-card-template").addClass('hidden');
    
    fetchJSONFile(volunteersJsonURL,VolunteerListCallback);
    //httpGet(leadsJsonURL,header,LeadListCallback);
});

function VolunteerListCallback(AResponse){
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
        
        $( html ).insertBefore( $( "#volunteer-card-template" ) );        
    });

    
}


function getLeadCardTemplate(){
    html = '<div class="col-sm-6 col-lg-3 col-xl-3 volunteer-card">';
    html += $("#volunteer-card-template").html();
    html += "</div";
    return html;
}

