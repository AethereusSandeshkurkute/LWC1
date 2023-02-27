//
//Generated by AdminBooster
//

public class fromJSON{
	public cls_coord coord;
	public cls_weather[] weather;
	public String base;	//stations
	@AuraEnabled public cls_main main;
	public Integer visibility;	//991
	public cls_wind wind;
	public cls_rain rain;
	public cls_clouds clouds;
	public Integer dt;	//1676213873
	public cls_sys sys;
	public Integer timezone;	//32400
	public Integer id;	//1851632
	public String name;	//Shuzenji
	public Integer cod;	//200
	class cls_coord {
		public Integer lon;	//139
		public Integer lat;	//35
	}
	class cls_weather {
		public Integer id;	//500
		@AuraEnabled public String main;	//Rain
		public String description;	//light rain
		public String icon;	//https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366021399
	}
	class cls_main {
		@AuraEnabled public Double temp;	//10.73
		@AuraEnabled public Double feels_like;	//10.26
		public Double temp_min;	//10.73
		public Double temp_max;	//10.73
		public Integer pressure;	//1015
		public Integer humidity;	//92
	}
	class cls_wind {
		public Double speed;	//1.87
		public Integer deg;	//279
		public Double gust;	//2.81
	}
	class cls_rain {
	//	public Double 1h;	//0.32
	}
	class cls_clouds {
		public Integer all;	//100
	}
	class cls_sys {
		public Integer type;	//2
		public Integer id;	//2019346
		public String country;	//JP
		public Integer sunrise;	//1676151244
		public Integer sunset;	//1676190155
	}
	public static fromJSON parse(String json){
		return (fromJSON) System.JSON.deserialize(json, fromJSON.class);
	}

	
}