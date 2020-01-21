#include <HX711.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

#include <FS.h>
#define LED_PIN 16

IPAddress ip(192, 168, 0, 220);//192.168.0.220
IPAddress gateway(192, 168, 0, 1);
IPAddress subnet(255, 255, 255, 0);

//-------------------------------------------------------------------------
//  WiFi Data
//-------------------------------------------------------------------------
#define WLAN_SSID      "" ////"SSID"04 ""
#define WLAN_PASS       ""//"PASSWORD" 
//-------------------------------------------------------------------------

ESP8266WebServer server(80);

int sensorValue = 1;
HX711 scale;
String weight = "";      


void LedOn(){
  server.send(200, "text/html", "<h1>LED is ON</h1>"); //h1にjsから挿入できるかテストしてみる
  digitalWrite(LED_PIN,HIGH);
}

void LedOff(){
  server.send(200, "text/html", "<h1>LED is Off</h1>");
  digitalWrite(LED_PIN,LOW);
}

  
void setup() {
  pinMode(LED_PIN,OUTPUT);
  ESP.wdtDisable();
  Serial.begin(115200);

  WiFi.config(ip, gateway, subnet);
  WiFi.begin(WLAN_SSID, WLAN_PASS);
 
  Serial.println("");
  while(WiFi.status() != WL_CONNECTED){
    delay(1000);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  ESP.wdtFeed();
    
  Serial.println("start");
  scale.begin(14, 13); //DT:14, SCK:13
  
  Serial.print("read:");
  Serial.println(scale.read());

  scale.set_scale();
  scale.tare();

  ESP.wdtFeed();
  
  Serial.print("calibrating...");
  delay(5000);
  Serial.println(scale.get_units(10));

  scale.set_scale(530.5-5);//何ものせずに起動　calibrating... が表示されたらすかさず1円玉を1枚載せる (1g) 値を読む　scale.set_scale(...); に値を埋めこむ -1542.00
  scale.tare();

  Serial.print("read (calibrated):");
  Serial.println(scale.get_units(10));

  //Ajaxでは見つけられなかった。
  server.on("/weight", [](){ server.send(200, "text/html", weight); });//WebサーバからWebブラウザ（クライアント）に送るHTMLデータの関数です。ここではWebブラウザに送るHTMLデータを作成し、Webブラウザに送信します。
  server.on("/tare", [](){ scale.tare(); server.send(200, "text/html", "tare()"); });//お皿などの重さを引く。
  server.on("/on", LedOn);
  server.on("/off", LedOff);
  
  server.begin();
}


void loop() {
  ESP.wdtFeed();
  server.handleClient();
  weight = String(scale.get_units(10), 1);
  
  Serial.println(weight);
  delay(50);
}
