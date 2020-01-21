var count = 0; 

var realweight = function(sload){
    var sclaeload= parseFloat(sload);
    return sclaeload;
}


window.onload = function() {        
        
    
    setInterval(function(){
                /*この書き方だとアクセスできない、または値が取得できない*/
                $.get("192.168.0.220/weight",function(sload){$("#count-1").text(sload);});//weightページから重さを取得しcount-1に加える
                $.get("192.168.0.220/weight",function(sload){$("#myProgress-1").val(sload);});//progressbarから値を取得
                var currentWeight = document.getElementById("myProgress-1").value;
        
                var targetWeight = document.getElementById("myProgress-1").max;//一回しか動いていないのだからインターバルで回さないと。
                targetWeight = Number(targetWeight);
                console.log(count);
        
                if(currentWeight==targetWeight && count == 0){
                        $('input[name="rice"]').prop('checked', true); //チェックボックスに自動でチェックをつける
                        count++;
                    }
        
                if(count==1){
                     //function sendOn(){
                            send("/on");   
                            //document./*getElementById("LEDstatus")*/getElementsByTagName('h1')[0].innerHTML="ON!";
                            console.log("seikai");
                            
                            function send(url){
                                var xhr = new XMLHttpRequest();xhr.open("GET", url, true);xhr.send();
                            }
                            count++;
                    //}
                }
            $('input[name="soysource"]').change(function(){
 
            // prop()でチェックの状態を取得
            var prop_bottle = $('#box-7').prop('checked');//$('#soysource-bottle:checked').val();
                
                    // もしpropがチェック状態だったら
            if (prop_bottle && count==2){
                
                send("/off");
                console.log("check-off");
                function send(url){
                            var xhr = new XMLHttpRequest();xhr.open("GET", url, true);xhr.send();
                            }
                count++;
                
              }  
            });
        },500);
    /*setInterval(function(){
         if(count==1){
            function sendOn(){
                send("/on/");   
            }
        
        $('input[name="check"]').change(function(){
 
            // prop()でチェックの状態を取得
            var prop_bottle = $('#soysource-bottle').prop('checked');
            
            // もしpropがチェック状態だったら
            if (prop_bottle){
                function sendOff(){
                send("/off/");
                count++;
              }    
            }
          });
        }
    }, 500);*/
};


/*var timer = setInterval(function(){
             $.get("/weight",function(sload){$("#count-1").text(sload);});//id要素から取得
             $.get("/weight",function(sload){$("#myProgress-1").val(sload);});
        },500);*/
        
        /*var timer2 =*/ //setInterval(function(){
            //$.get("/weight",function(sload){$("#myProgress-1").val(sload);});//HTMLのprogressではval(15) .progressbar({ value: 15 })
        //},500);
    
     //var currentWeight = document.getElementById("myProgress-1").value;



                                
                                

                                

//var currentWeight; 
//var targetWeight = 300.0; //量り取りたい重さを300グラムとする
/*var currentWeight =timer;
     currentWeight = Number(currentWeight);
     console.log(currentWeight);*/
    
    
    /*var targetWeight = document.getElementById("myProgress-1").max;//一回しか動いていないのだからインターバルで回さないと。
    targetWeight = Number(targetWeight);
    console.log(currentWeight);*/
    
    //$.get("/weight").done(function(data){console.log( data )});
     /*targetWeight = Number(targetWeight);
     console.log(currentWeight);
     console.log(targetWeight);*/
                                  
                        