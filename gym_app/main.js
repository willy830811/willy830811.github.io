$(document).ready(() => {

//設定視窗尺寸
$('#full').width($(window).width()-15);

$(window).on('resize', function(){
	$('#full').width($(window).width()-15);
})



//取出cookie
let cookie = document.cookie;
console.log(cookie);
let cookie_course;
let cookie_record = {};

let today = new Date();


if (cookie != '') {
	if (cookie.indexOf('cookie_course') != -1 && cookie.indexOf('cookie_record') != -1) {
		cookie_course = JSON.parse(cookie.split(";")[0].substring(14));
		cookie_record = JSON.parse(cookie.split(";")[1].substring(15));
	} else if (cookie.indexOf('cookie_course') != -1) {
		cookie_course = JSON.parse(cookie.substring(14));
	} else if (cookie.indexOf('cookie_record') != -1) {
		cookie_record = JSON.parse(cookie.substring(15));
	} 
	
} else {
	cookie_course = [
		{
			name: '槓鈴臥推',
			kind: 'chest',
			reps: 0,
			sets: 0,
			weight: 0
		},

		{
			name: '飛鳥夾胸',
			kind: 'chest',
			reps: 0,
			sets: 0,
			weight: 0
		},

		{
			name: '肩上推舉',
			kind: 'chest',
			reps: 0,
			sets: 0,
			weight: 0
		},

		{
			name: '硬舉',
			kind: 'back',
			reps: 0,
			sets: 0,
			weight: 0
		},

		{
			name: '槓鈴划船',
			kind: 'back',
			reps: 0,
			sets: 0,
			weight: 0
		},

		{
			name: '引體向上',
			kind: 'back',
			reps: 0,
			sets: 0,
			weight: 0
		},

		{
			name: '深蹲',
			kind: 'leg',
			reps: 0,
			sets: 0,
			weight: 0
		},

		{
			name: '腿部推蹬',
			kind: 'leg',
			reps: 0,
			sets: 0,
			weight: 0
		},

		{
			name: '羅馬尼亞硬舉',
			kind: 'leg',
			reps: 0,
			sets: 0,
			weight: 0
		}
		]
}



let main = new Vue({
	el: '#main',

	data: {
		body_part: '',

		isActive_0: true,

		isActive_1: false,

		isActive_2: false,

		isActive_3: false,

		isActive_4: false,

		positions: cookie_course,

		selected_positions: [],

		checked_positions: [],

		save_menu: false,



		calendar_year: '',

		calendar_month: '',

		this_month_calendar: '',

		this_month_record: [],

		record: cookie_record,

		current_read_record: ''
	},

	methods: {
		back: function() {
			console.log('back');
			if(this.isActive_0) {
				
			} else if (this.isActive_1){
				this.isActive_1 = false;
				this.isActive_0 = true;
			} else if (this.isActive_2){
				this.isActive_2 = false;
				this.isActive_1 = true;
			} else if (this.isActive_3){
				this.isActive_3 = false;
				this.isActive_0 = true;
			} else if (this.isActive_4){
				this.isActive_4 = false;
				this.isActive_0 = true;
			}
		},

		enter_menu: function(item){
			console.log('enter_menu');
			this.body_part = item;
			this.isActive_0 = false;
			this.isActive_1 = true;
			this.selected_positions = this.positions.filter(function(item_2) {
				return item_2.kind == item;

			})
		},


		add: function(item, item_2){
			this.selected_positions.find(function(item_3){
				if (item_3.name == item) {
					item_3[item_2] +=1;
				}
			})
		},

		reduce: function(item, item_2){
			this.selected_positions.find(function(item_3){
				if (item_3.name == item && item_3[item_2]>0) {
					item_3[item_2] -=1;
				}
			})
		},

		enter_course: function() {
			console.log('enter_course');
			if (this.save_menu == true) {
				document.cookie = "cookie_course=" + JSON.stringify(this.positions) + "; expires=Thu, 18 Dec 2043 12:00:00 GMT";
			}
			this.isActive_1 = false;
			this.isActive_2 = true;
		},

		enter_conclusion: function() {
			console.log('enter_conclusion');
			let today_str = today.getFullYear() + '/' + (today.getMonth()+1) + '/' + today.getDate();
			//let today_training = '{"' + today.getFullYear() + '/' + (today.getMonth()+1) + '/' + today.getDate() + '":' + JSON.stringify(this.checked_positions) + '}';

			//cookie_record = cookie_record + ',' + today_training;
			//if (cookie_record[0] == ',') {
			//	cookie_record = cookie_record.substring(1);
			//}
			this.record[today_str] = this.checked_positions;

			document.cookie = "cookie_record=" + JSON.stringify(this.record) + "; expires=Thu, 18 Dec 2043 12:00:00 GMT";
			this.isActive_2 = false;
			this.isActive_3 = true;
		},

		enter_calendar: function() {
			//取得預設年月
			this.calendar_year = today.getFullYear();
			this.calendar_month = today.getMonth();

			this.isActive_0 = false;
			this.isActive_4 = true;

			this.call_calendar(this.calendar_year, this.calendar_month);

			this.current_read_record = this.calendar_year + '/' + (this.calendar_month+1) + '/' + today.getDate();

			$('#calendar').ready(() => {
				$('#calendar td').each(function() {
					if ($(this).text() == today.getDate()) {
						$(this).addClass('black_bd');
					}
				})
			})
		},

		call_calendar: function(year, month) {
			console.log('b' + typeof this.calendar_month);
			//cookie_record.filter

			console.log(year +'/'+ month);
			let mon = [1,2,3,4,5,6,7,8,9,10,11,12];
			let how_many_days = new Date(year, mon[month], 0).getDate();
			console.log('how_many_days= '+how_many_days);
			let first_day = new Date(year, month, 1).getDay();
			console.log('first_day= '+first_day);
			let how_many_rows = Math.ceil((how_many_days - (7 - first_day))/7) + 1;
			console.log('how_many_rows= '+how_many_rows);


			this.this_month_calendar = [[]];

			for (let i = 0; i < first_day; i++) {
				this.this_month_calendar[0].push('');
			}

			for (let i = 0; i < 7-first_day; i++) {
				this.this_month_calendar[0].push(i+1);
			}

			for (let i = 0; i < how_many_rows-2; i++) {
				this.this_month_calendar.push([]);
				for (let j = 0; j < 7; j++) {
					this.this_month_calendar[i+1].push(i*7+7-first_day+j+1);
				}
			}

			if ((how_many_days + first_day)%7 != 0) {
				this.this_month_calendar.push([]);
				for (let i = 0; i < (how_many_days + first_day)%7; i++) {
					this.this_month_calendar[how_many_rows-1].push((how_many_rows-1)*7-first_day+i+1);
				}

				for (let i = 0; i < 7-(how_many_days + first_day)%7; i++) {
					this.this_month_calendar[how_many_rows-1].push('');
				}

			}
		},

		judge_content: function(item) {
			let temp_date = this.calendar_year + '/' + (this.calendar_month+1) + '/' + item;
			//console.log('c' + typeof this.calendar_month);
			//console.log(temp_date);
			if (this.record[temp_date] != undefined) {
				console.log('temp_date:'+temp_date+'/'+this.record[temp_date]);
				return {red_bg: true};
			}
		},

		call_someday_record: function(item) {
			this.current_read_record = this.calendar_year + '/' + (this.calendar_month+1) + '/' + item;
			console.log(this.current_read_record);
			$('#calendar td').removeClass('black_bd');
			$(event.target).addClass('black_bd');
			//console.log(this.record[current_read_record]);
		}


	},

	watch: {
		calendar_year: function() {
			//console.log(this.calendar_year +'/'+ this.calendar_month);
			this.call_calendar(this.calendar_year, this.calendar_month);
		},

		calendar_month: function() {
			console.log('a' + typeof this.calendar_month);
			//console.log(this.calendar_year +'/'+ this.calendar_month);
			this.call_calendar(this.calendar_year, this.calendar_month);
		}
	}
})











})