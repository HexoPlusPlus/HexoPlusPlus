	function base64Encode(input){
                var rv;
                rv = encodeURIComponent(input);
                rv = unescape(rv);
                rv = window.btoa(rv);
                return rv;
        }
	function ajaxObject() {
    var xmlHttp;
    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
        } 
    catch (e) {
        // Internet Explorer
        try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                sweetAlert("糟糕", "你的浏览器不能上传文件", "error");
                return false;
            }
        }
    }
    return xmlHttp;
}
	const loadMarkdown = (url) => {
                mdeditor.value = '加载中。。。';
                fetch(url, { method: 'GET' }).then((resp) => {
                    return Promise.all([resp.ok, resp.status, resp.text(), resp.headers]);
                }).then(([ok, status, data, headers]) => {
                    if (ok) {
                        return {
                            ok,
                            status,
                            data,
                            headers
                        }
                    } else {
                        throw new Error(JSON.stringify(json.error));
                    }
                }).then((resp) => {
                    mdeditor.value = resp.data;
                }).catch((error) => {
                    mdeditor.value = '';
                });
            
        };
choo.disabled=true
	var ctJson = "/hpp/admin/api/getlist"
        $.getJSON(ctJson, function (data) {
            $.each(data, function (index, value) {
                $("#choo").append(`
				  <option>${value.name}<\/option>
                `);
            });
			console.log('get!')
			 $('#choo').editableSelect();
		choo.value = "选择一个文件或直接新增一个文件"
		choo.disabled=false
        });
	$(function(){
		$("#mdeditor").markdown({language:'zh'})
	});

	function getdoc(){
		choo.disabled=true
		mdeditor.disabled=true
	url="/hpp/admin/api/getdoc/"+choo.value+"?_"+Date.now(new Date())
	loadMarkdown(url);
		choo.disabled=false
		mdeditor.disabled=false
	};
	function hpp_uploadmarkdown(){
		choo.disabled=true
		mdeditor.disabled=true
	var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/adddoc/'+choo.value , true );
    ajax.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
                sweetAlert("成功",  "文件已上传", "success");
		    choo.disabled=false
		mdeditor.disabled=false
            }
		else if( ajax.status == 201 ){
                sweetAlert("成功",  "文件已新建", "success");
		    choo.disabled=false
		mdeditor.disabled=false
            }
            else {
                sweetAlert("糟糕", "上传文件失败!", "error");
		    choo.disabled=false
		mdeditor.disabled=false
            }
        }
    }
    ajax.send(base64Encode(mdeditor.value));
	};

		 $('#chooimage').editableSelect();
var input = document.getElementById("input");
input.addEventListener('change', readFile, false);
function readFile() {
   var file = this.files[0];
    var reader = new FileReader(); 
    reader.readAsDataURL(file);
    reader.onloadstart = function (e){ 

        console.log('开始了')
		
    }
    reader.onprogress = function(e){
    }
    reader.onload = function (e) {
        console.log(this.result.substring(this.result.indexOf(',')+1));
		hpp_uploadimage(this.result.substring(this.result.indexOf(',')+1));
    }
    reader.onloadend = function(e){
        console.log('结束了')
    }
};

	$("#uptea").click(function () {
    $("#input").click();
});


function hpp_uploadimage(image){
		input.disabled=true
	var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/addimage/'+chooimage.value , true );
    ajax.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
                sweetAlert("成功",  "图片已上传", "success");
		    input.disabled=false
            }
		else if( ajax.status == 201 ){
			const ree=ajax.responseText;
			swal({
title: "成功",
    text: "图片已新建,请复制地址",
    icon: "success",
  content: {
    
    element: "input",
    attributes: {
      value: ree,
      type: "text",
    },
  },
});
				
		    input.disabled=false
            }
            else {
                sweetAlert("糟糕", "上传图片失败!", "error");
		   input.disabled=false
            }
        }
    }
    ajax.send(image);
	};
getCDNinfo = function() {
	$.ajax({
		url: "https://cdn.cyfan.top/cdn-cgi/trace",
		success: function(data, status) {
			let areas = "Antananarivo, Madagascar - (TNR);Cape Town, South Africa - (CPT);Casablanca, Morocco - (CMN);Dar Es Salaam, Tanzania - (DAR);Djibouti City, Djibouti - (JIB);Durban, South Africa - (DUR);Johannesburg, South Africa - (JNB);Kigali, Rwanda - (KGL);Lagos, Nigeria - (LOS);Luanda, Angola - (LAD);Maputo, MZ - (MPM);Mombasa, Kenya - (MBA);Port Louis, Mauritius - (MRU);Réunion, France - (RUN);Bangalore, India - (BLR);Bangkok, Thailand - (BKK);Bandar Seri Begawan, Brunei - (BWN);Cebu, Philippines - (CEB);Chengdu, China - (CTU);Chennai, India - (MAA);Chittagong, Bangladesh - (CGP);Chongqing, China - (CKG);Colombo, Sri Lanka - (CMB);Dhaka, Bangladesh - (DAC);Dongguan, China - (SZX);Foshan, China - (FUO);Fuzhou, China - (FOC);Guangzhou, China - (CAN);Hangzhou, China - (HGH);Hanoi, Vietnam - (HAN);Hengyang, China - (HNY);Ho Chi Minh City, Vietnam - (SGN);Hong Kong - (HKG);Hyderabad, India - (HYD);Islamabad, Pakistan - (ISB);Jakarta, Indonesia - (CGK);Jinan, China - (TNA);Karachi, Pakistan - (KHI);Kathmandu, Nepal - (KTM);Kolkata, India - (CCU);Kuala Lumpur, Malaysia - (KUL);Lahore, Pakistan - (LHE);Langfang, China - (NAY);Luoyang, China - (LYA);Macau - (MFM);Malé, Maldives - (MLE);Manila, Philippines - (MNL);Mumbai, India - (BOM);Nagpur, India - (NAG);Nanning, China - (NNG);New Delhi, India - (DEL);Osaka, Japan - (KIX);Phnom Penh, Cambodia - (PNH);Qingdao, China - (TAO);Seoul, South Korea - (ICN);Shanghai, China - (SHA);Shenyang, China - (SHE);Shijiazhuang, China - (SJW);Singapore, Singapore - (SIN);Suzhou, China - (SZV);Taipei - (TPE);Thimphu, Bhutan - (PBH);Tianjin, China - (TSN);Tokyo, Japan - (NRT);Ulaanbaatar, Mongolia - (ULN);Vientiane, Laos - (VTE);Wuhan, China - (WUH);Wuxi, China - (WUX);Xi'an, China - (XIY);Yerevan, Armenia - (EVN);Zhengzhou, China - (CGO);Zuzhou, China - (CSX);Amsterdam, Netherlands - (AMS);Athens, Greece - (ATH);Barcelona, Spain - (BCN);Belgrade, Serbia - (BEG);Berlin, Germany - (TXL);Brussels, Belgium - (BRU);Bucharest, Romania - (OTP);Budapest, Hungary - (BUD);Chișinău, Moldova - (KIV);Copenhagen, Denmark - (CPH);Cork, Ireland -  (ORK);Dublin, Ireland - (DUB);Düsseldorf, Germany - (DUS);Edinburgh, United Kingdom - (EDI);Frankfurt, Germany - (FRA);Geneva, Switzerland - (GVA);Gothenburg, Sweden - (GOT);Hamburg, Germany - (HAM);Helsinki, Finland - (HEL);Istanbul, Turkey - (IST);Kyiv, Ukraine - (KBP);Lisbon, Portugal - (LIS);London, United Kingdom - (LHR);Luxembourg City, Luxembourg - (LUX);Madrid, Spain - (MAD);Manchester, United Kingdom - (MAN);Marseille, France - (MRS);Milan, Italy - (MXP);Moscow, Russia - (DME);Munich, Germany - (MUC);Nicosia, Cyprus - (LCA);Oslo, Norway - (OSL);Paris, France - (CDG);Prague, Czech Republic - (PRG);Reykjavík, Iceland - (KEF);Riga, Latvia - (RIX);Rome, Italy - (FCO);Saint Petersburg, Russia - (LED);Sofia, Bulgaria - (SOF);Stockholm, Sweden - (ARN);Tallinn, Estonia - (TLL);Thessaloniki, Greece - (SKG);Vienna, Austria - (VIE);Vilnius, Lithuania - (VNO);Warsaw, Poland - (WAW);Zagreb, Croatia - (ZAG);Zürich, Switzerland - (ZRH);Arica, Chile - (ARI);Asunción, Paraguay - (ASU);Bogotá, Colombia - (BOG);Buenos Aires, Argentina - (EZE);Curitiba, Brazil - (CWB);Fortaleza, Brazil - (FOR);Guatemala City, Guatemala - (GUA);Lima, Peru - (LIM);Medellín, Colombia - (MDE);Panama City, Panama - (PTY);Porto Alegre, Brazil - (POA);Quito, Ecuador - (UIO);Rio de Janeiro, Brazil - (GIG);São Paulo, Brazil - (GRU);Santiago, Chile - (SCL);Willemstad, Curaçao - (CUR);St. George's, Grenada - (GND);Amman, Jordan - (AMM);Baghdad, Iraq - (BGW);Baku, Azerbaijan - (GYD);Beirut, Lebanon - (BEY);Doha, Qatar - (DOH);Dubai, United Arab Emirates - (DXB);Kuwait City, Kuwait - (KWI);Manama, Bahrain - (BAH);Muscat, Oman - (MCT);Ramallah - (ZDM);Riyadh, Saudi Arabia - (RUH);Tel Aviv, Israel - (TLV);Ashburn, VA, United States - (IAD);Atlanta, GA, United States - (ATL);Boston, MA, United States - (BOS);Buffalo, NY, United States - (BUF);Calgary, AB, Canada - (YYC);Charlotte, NC, United States - (CLT);Chicago, IL, United States - (ORD);Columbus, OH, United States - (CMH);Dallas, TX, United States - (DFW);Denver, CO, United States - (DEN);Detroit, MI, United States - (DTW);Honolulu, HI, United States - (HNL);Houston, TX, United States - (IAH);Indianapolis, IN, United States - (IND);Jacksonville, FL, United States - (JAX);Kansas City, MO, United States - (MCI);Las Vegas, NV, United States - (LAS);Los Angeles, CA, United States - (LAX);McAllen, TX, United States - (MFE);Memphis, TN, United States - (MEM);Mexico City, Mexico - (MEX);Miami, FL, United States - (MIA);Minneapolis, MN, United States - (MSP);Montgomery, AL, United States - (MGM);Montréal, QC, Canada - (YUL);Nashville, TN, United States - (BNA);Newark, NJ, United States - (EWR);Norfolk, VA, United States - (ORF);Omaha, NE, United States - (OMA);Philadelphia, United States - (PHL);Phoenix, AZ, United States - (PHX);Pittsburgh, PA, United States - (PIT);Port-Au-Prince, Haiti - (PAP);Portland, OR, United States - (PDX);Queretaro, MX, Mexico - (QRO);Richmond, Virginia - (RIC);Sacramento, CA, United States - (SMF);Salt Lake City, UT, United States - (SLC);San Diego, CA, United States - (SAN);San Jose, CA, United States - (SJC);Saskatoon, SK, Canada - (YXE);Seattle, WA, United States - (SEA);St. Louis, MO, United States - (STL);Tampa, FL, United States - (TPA);Toronto, ON, Canada - (YYZ);Vancouver, BC, Canada - (YVR);Tallahassee, FL, United States - (TLH);Winnipeg, MB, Canada - (YWG);Adelaide, SA, Australia - (ADL);Auckland, New Zealand - (AKL);Brisbane, QLD, Australia - (BNE);Melbourne, VIC, Australia - (MEL);Noumea, New caledonia - (NOU);Perth, WA, Australia - (PER);Sydney, NSW, Australia - (SYD)".split(";");
			let area = data.split("colo=")[1].split("\n")[0];
			for (var i = 0; i < areas.length; i++) {
				if (areas[i].indexOf(area) != -1) {
					document.getElementById("cdn").innerHTML = areas[i];
					document.getElementById("ip").innerHTML = data.split("ip=")[1].split("\n")[0];
					document.getElementById("httpos").innerHTML = data.split("visit_scheme=")[1].split("\n")[0];
					document.getElementById("uag").innerHTML = data.split("uag=")[1].split("\n")[0];
					document.getElementById("http").innerHTML = data.split("http=")[1].split("\n")[0];
					document.getElementById("loc").innerHTML = data.split("loc=")[1].split("\n")[0];
					document.getElementById("tls").innerHTML = data.split("tls=")[1].split("\n")[0];
					document.getElementById("warp").innerHTML = data.split("warp=")[1].split("\n")[0];
					break;
				}
			}
		}
	})
}
$(document).ready(function() {
	getCDNinfo();
    //页面加载完毕就获取CDN信息
});
