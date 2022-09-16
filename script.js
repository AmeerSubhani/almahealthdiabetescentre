if ($(".datepicker").length > 0) {
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        minDate: '+1d'
    });
    $('.datepicker').attr("readonly", "");
    $('.datepicker').on('change', function () {
        if ($(this).attr('nextdate')) {
            var nextdateid = $(this).attr('nextdate');
            var thisdate = $(this).val();
            $('#' + nextdateid).datepicker('option','minDate', thisdate);
        }
    });
}
    
var emailpattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
var phonepattern = /^([0-9]{10}$)|([+]{1}[0-9]{10,13}$)/;

function strTrim(x) {
    return x.replace(/^\s+|\s+$/gm, '');
}
var file_in_action = function (filename, param) {
    if (typeof param === 'undefined')
        param = "";
    var paramset = "";
    if (param != "")
        var paramset = "?" + param;
    if (typeof filename === 'undefined')
        return "";
    else
        return baseurl + "actions/" + filename + paramset;
};
function executeActionFile(filename, param) {
    if (typeof param === 'undefined')
        param = "";
    document.location = file_in_action(filename, param);
}
var submitForm = function (formID, ActionFile) {
    document.getElementById(formID).action = file_in_action(ActionFile);
    document.getElementById(formID).submit();
};
function moneyFormatIndia(num) {
    var x = num.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '') {
        lastThree = ',' + lastThree;
    }
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
}

function load_content_onscroll(footerHeight, dContainer, prFile, callBack) {
    if (typeof callBack === 'undefined') {
        callBack = "";
    }
    var extraheight = footerHeight + 350;
    if ($(window).scrollTop() > ($(document).height() - extraheight) - $(window).height()) {
        $('div#loadmoreajaxloader').show();
        $.ajax({
            url: file_in_action(prFile),
            success: function (html) {
                if (html) {
                    $("#" + dContainer).append(html);
                    $('div#loadmoreajaxloader').hide();
                } else {
                    $('div#loadmoreajaxloader').html('');
                }
                if (callBack != "") {
                    callBack();
                }
            }
        });
    }
}

function smoothScrollTo(id) {
    if ($("#" + id)) {
        $('html,body').animate({
            scrollTop: $("#" + id).offset().top - 80
        }, 800);
    }
}
function showMsg(txt, obj) {
    var ele;
    var t=$(obj).attr("style")?1:0;
    txt+='<span class="close fas fa-times"></span>';
    ele='<div class="alert alert-danger" style="position:relative;">'+txt+'</div>';
    if(t==0 || $(obj).css("display")=="none"){
        $(obj).html(ele).fadeIn();
        $(obj).parents("form").click(function(e){
            $(obj).fadeOut();
        });
    }else{
        $(obj).html(ele);
    }
    $(obj).find(".close").click(function(){$(obj).fadeOut();});
}

function validate_this_form(form_obj) {
    var tagname, vmsg;
    var txt = "";
    var inputcheck = true;
    if (form_obj.prop("tagName").toLowerCase() == "form") {
        vmsg = form_obj.find(".validate-msg");
    } else {
        vmsg = form_obj.parents("form").find(".validate-msg");
    }
    
    form_obj.find("input,select,textarea").each(function () {
        tagname = $(this).prop("tagName").toLowerCase();
        if ($(this).attr("required") && $(this).val() === "") {
            txt = "Please specify " + $(this).attr("placeholder");
            inputcheck = false;
        }
        if (tagname == "input") {
            if (inputcheck == true && $(this).attr("type") && ($(this).attr("type")).toLowerCase() == "email" && emailpattern.test($(this).val()) == false) {
                txt = "Please specify valid " + $(this).attr("placeholder");
                inputcheck = false;
            }
            if (inputcheck == true && $(this).hasClass("phone") && phonepattern.test($(this).val()) == false) {
                txt = "Please specify valid " + $(this).attr("placeholder");
                inputcheck = false;
            }
        }
        if (inputcheck == false) {
            return false;
        }
    });
    if (inputcheck == false) {
        showMsg(txt, vmsg);
    }
    return inputcheck;
}
$("input.number").keypress(function (e) {
    var k = e.which ? e.which : e.keyCode;
    if (!(k == 8 || k == 9 || (k >= 35 && k <= 40) || k == 46 || (k >= 48 && k <= 57))) {
        return false;
    }
});
$("input.phone").keypress(function (event) {
    var k = event.which ? event.which : event.keyCode;
    if (!(k == 8 || k == 9 || (k >= 35 && k <= 40) || k == 46 || k == 43 || k == 45 || (k >= 48 && k <= 57))) {
        return false;
    }
});
if ($(".validate-this-form").length > 0) {
    $(".validate-this-form").each(function () {
        if (!($(this).attr("novalidate"))) {
            $(this).attr("novalidate", "novalidate");
        }
    });

    $(".validate-this-form").submit(function (e) {
        var formid=""; 
        var pfile = "";
        var vmsg = $(this).find(".validate-msg");
        var processmsg;
        
        var inputcheck = validate_this_form($(this));
        if (inputcheck == false) {
            return false;
        }
        if (inputcheck == true && $(this).attr("validation-method")) {
            var f = $(this).attr("validation-method");
            inputcheck = (window[f])();
            if (inputcheck == false) {
                return false;
            }
        }
     
        if ($(this).attr("action")) {
            pfile = $(this).attr("action");
        }
        if ($(this).attr("id")) {
            formid = $(this).attr("id");
        }
        if ($(this).hasClass("post-ajax")) {
            if (vmsg.attr("process-message") && strTrim(vmsg.attr("process-message")) != "") {
                processmsg = vmsg.attr("process-message");
            } else {
                processmsg = "Submitting Query...";
            }
            showMsg(processmsg,vmsg);
            $.ajax({
                type: 'POST',
                data: $("#" + formid).serialize(),
                url: file_in_action(pfile),
                success: function (result) {
                    var frm = $("#" + formid);
                    if (frm.attr("ajax-return-method")) {
                        var f = frm.attr("ajax-return-method");
                        inputcheck = (window[f])(result);
                    } else {
                        showMsg(result,vmsg);
                        frm.get(0).reset();
                    }
                }
            });
            return false
        } else {
            if (formid != "") {
                submitForm(formid, pfile);
            } else {
                return false;
            }
        }
    });
    $(".next-input-section").click(function () {
        var inputcheck = validate_this_form($(this).parents(".form-input-section"));
        if (inputcheck == false) {
            return false;
        }
        if (inputcheck == true && $(this).attr("validation-method")) {
            var f = $(this).attr("validation-method");
            inputcheck = (window[f])();
            if (inputcheck == false) {
                return false;
            }
        }
        $(this).parents(".form-input-section").next().fadeIn();
        $(this).parents(".form-input-section").hide();
    });
    $(".prev-input-section").click(function () {
        $(this).parents(".form-input-section").prev().fadeIn();
        $(this).parents(".form-input-section").hide();
    });
}

$(".modal").on("hidden.bs.modal", function () {
    $(this).find(".validate-msg").fadeOut();
    $(this).find(".hidden-form-load").hide();
    $(this).find("form").get(0).reset();
    $(this).find(".form-input-section").fadeOut();
    $(this).find(".form-input-section").first().fadeIn();
});
$('[data-tourname]').click(function(){
    $('#frmgeneralinquiry [name="txtpnqtourname"]').val($(this).attr("data-tourname"));
});
function getAptTime(doctorid, dated){
    pfile="getapptime";
    $.ajax({
        type: 'POST',
        data: "id="+doctorid+"&dated="+dated,
        url: file_in_action(pfile),
        success: function (result) {
            $('[name="txtapttime"]').html(result);
        }
    });
}
$('[name="txtaptdoctor"],[name="txtaptdate"]').on("change",function(){
    getAptTime(($('[name="txtaptdoctor"]').val().split(":"))[0],$('[name="txtaptdate"]').val());
});