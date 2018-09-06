$(function () {
		let obj = {
			name: '',
			sms: '',
		}
		let user = ''
        /* Сохранение имени и внесение в локалсторедж при нажатии войти*/
		$("#login").click(function () {
	        window.location.href = "chat.html"
	        user = $('#name').val()
			var serialObj = JSON.stringify(user)
			localStorage.setItem('users', serialObj)
	    })
	    /*-------------------------------------------------*/

	    /* При клике на "отправить" */
	    $("#send").click(function () {
	        let massage = $('#massage').val()
            obj.name = JSON.parse(localStorage.getItem('users'))  //записываем имя
            obj.sms = massage										// и сообщение
            var serialObj = JSON.stringify(obj)						
            localStorage.setItem(localStorage.length, serialObj)	//отправляем в локалсторейдж
	        $('#tdList').append("<li class='item itemR'>" + massage + "<br><span class ='smsName'>" + obj.name + "</span></li>") //запишем смс последним 
	        /* Удаляем написанное в инпуте*/
	        $("#massage").val("")
	    })
	    /*------------------------------------------------------------------*/

	    /*При нажатии на выход возвращаемся к авторизации*/
	    $("#exit").click(function () {
            window.location.href = "index.html"
	    })
	    /*--------------------------------------------------*/


	    /*Вывод сообщений */
	    function getValueAfterReload() {
			if (localStorage.length > 1) {
				for (i = 0; i < localStorage.length; i++) {                    // Ищем в базе имя
	            	var key = localStorage.key(i)
	            	if(key == 'users'){
	            		user = JSON.parse(localStorage.getItem(key))
	            	}
	            }
	            for (i = 0; i < localStorage.length; i++) {                     // ищем все сообщения
	            	var key = localStorage.key(i)
	                if(!isNaN(key)) {
	                	var returnObj = JSON.parse(localStorage.getItem(key))
	                	if (returnObj.name == user) {
	                		$('#tdList').append("<li class='item itemR'>" + returnObj.sms + "<br><span class ='smsName'>" + returnObj.name + "</span></li>") // Смс с таким же именем выровняли по правому краю
	                	}
	                	else {
	                		$('#tdList').append("<li class='item'>" + returnObj.sms + "<br><span class ='smsName'>" + returnObj.name + "</span></li>")  // а все остальные по левому
	                	}
	                }
	            }
	        }
	    }
		getValueAfterReload()
})