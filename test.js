var instagram_array = [];
var twitter_array = [];
console.log(stream);
console.log(stream2);


( function () {
	// console.log(stream);
	var index_instagram = 0;
	var index_twitter = 0;

	var evt_i = document.createEvent("HTMLEvents");
	var evt_t = document.createEvent("HTMLEvents");

	var instagram = false;
	var twitter = false;

	var content_limit =  100;
	var expected_content = 16;	// tied to css, change the css for proper display


	var update_index1 = 16;
	var update_index2 = 16;

	// populateArray(instagram_array, expected_content);
	// populateArray(twitter_array, expected_content);

	var seconds = new Date().getTime() / 1000;
	seconds =  Math.round(seconds) - 2592000;
	// seconds = 0;
	stream.poller({
	// Poller for Instagram stream
		limit:content_limit,
		frequency: 15,
		reverse: true

	}).each(function(status) {
		// console.log(status);
		// console.log(status.user.screen_name);
		// console.log(status.user.name);
		// console.log(status.user.profile_image_url);
	// For each content pulled, create a DOM and store it in array for display later
		var new_status = new Object();

		if ( index_instagram >= content_limit ) {
			index_instagram = 0;
		}
	
		if ( status.network === 'twitter') {

			if ( seconds <= new Date(status.created_at).getTime()/1000 ) { 
				// console.log('less than a week');
				
				if (status.entities.media) {
					new_status.images = new Object();
					new_status.images.low_resolution = new Object();
					new_status.user = new Object();
					new_status.images.low_resolution.url = status.entities.media[0].media_url;//twitter images
					new_status.user.profile_picture = status.user.profile_image_url;
					new_status.user.username = status.user.screen_name;
					new_status.user.realname = status.user.name;
					new_status.text = status.text;
					
					instagram_array[index_instagram] = new_status;//reason the twitter images are in instagram section
					// twitter_array[index_twitter] = new_status;
					status = new_status;
					// console.log(status);
					status.caption = status.user;
					// console.log(status);
					index_instagram++;
					// index_twitter++;
				}
			}				
			
		} else {

			// console.log(status.network);
			
			if ( seconds <= status.created_time) { 
				// console.log('less than a week');
				instagram_array[index_instagram] = status;
				index_instagram++;
				// twitter_array[index_twitter] = status;
				// index_twitter++;
			}

			
		}
		
		if (evt_i) {
			// console.log(evt_i);
			evt_i.initEvent("instagramLoaded", true, true);
			document.dispatchEvent(evt_i);

		}

	}).start();

	stream2.poller({
		limit:content_limit,
		frequency: 15,
		reverse: true

	}).each(function(status) {

		if (index_twitter === content_limit) {
			index_twitter = 0;
		}

		if ( seconds <= new Date(status.created_at).getTime()/1000 ) { 
			// console.log('less than a week');
			twitter_array[index_twitter] = status;
			index_twitter++;
		}
		

		if (evt_t) {
			evt_t.initEvent("twitterLoaded", true, true);
			document.dispatchEvent(evt_t);
		}

	}).start();

	function createInstagramNode(node, className, idName) {
		// console.log(node);
		// console.log(node.caption.text);
		// console.log(className);
		// console.log(idName);
		var div = document.createElement('div');
		var user = document.createElement('div');
		// var text = document.createElement('div');
		// var caption = document.createElement('div');

		// text.className = 'text-caption';
		// user.className = 'user-caption';
		// console.log(instagram_array.length);
		// if(node.network == "instagram")	{
		if(node.images.low_resolution){
		div.innerHTML = '<img src="'+ node.images.low_resolution.url +'" onerror="imgError(this)"/>';
		user.innerHTML = '<div class="user-holder"><div class="instagram-actualname">' + '</div><div class="instagram-username">@' +  node.user.username + '</p><div class="icon-instagram_logo"/></div>';
		// console.log(node);
		// if (node.caption.text) {
		// 	// user.innerHTML = '<div class="user-holder"><img src="' + node.user.profile_picture + '"/><div class="instagram-actualname">' +  node.user.full_name +'</div><div class="inatagram-username">@' +  node.user.username +'</div><p class="user-text">' + node.caption.text + '</p><img class="logowithtext" src="../../../../lib/img/logo_instagram_white.png"/></div>';
		// 	// user.innerHTML = '<div class="user-holder"><div class="instagram-actualname">' +  node.user.full_name +'</div><div class="instagram-username">@' +  node.user.username +'</div><p class="user-text">' + node.caption.text + '</p><div class="icon-instagram_logo"/></div>';
		// 	user.innerHTML = '<div class="user-holder"><div class="instagram-actualname">' + '</div><div class="instagram-username">@' +  node.user.username + '</p><div class="icon-instagram_logo"/></div>';
		// } else {
		// 	// user.innerHTML = '<div class="user-holder"><img src="' + node.user.profile_picture + '" onerror="imgError(this)"/>'+'<div class="user-caption">' +  node.user.username +'</div><img class="logo" src="../../../../lib/img/twitter.png"/></div>';// To show twitter images in the intagram images field
		// }



		div.className = className;
		div.appendChild(user);
	}else{

	}
		return div;
	}

	function createTwitterNode(node, className, idName) {
		var div = document.createElement('div');
		var html = '';	// HTML text holder.
		var hashtag_link;
		var hashtag_text;
		var hashtag_array = [];
		var twitterPic, avatar_url;
		
			// console.log(node);
			// console.log(node.entities.media[0].media_url);
			// var div = document.createElement('div');
			// var html = '';	// HTML text holder.
			twitterPic = node.entities.media[0].media_url;
			// console.log("******************");
			// console.log(twitterPic);
			// console.log(twitter_array.length);
			// var hashtag_link;
			// var hashtag_text;
			// var hashtag_array = [];
			avatar_url = node.user.profile_image_url;	// get user avatar.
			// console.log(avatar_url);
			avatar_url = avatar_url.replace("_normal", avatar_size); // replace the image size if necessary.
			hashtag_array = node.entities.hashtags;	// get hashtags in the tweet.
			
			for (l = 0; l < hashtag_array.length; l++) {
			// Wrap each hashtag in .hashtag class.
				hashtag_text = "#"+node.entities.hashtags[l].text;
				hashtag_link = "<span class='hashtag'>#" + node.entities.hashtags[l].text+"</span>";

				node.text = node.text.replace(hashtag_text, hashtag_link);
			}

			// div.setAttribute('id', idName);
			div.className = className;
			html += '<div class="twitter_Pic"><img src ="'+ twitterPic +'"/></div>';
			// html += '<a href="https://twitter.com/'+encodeURIComponent( node.user.screen_name )+'" class="avatar"><img src="'+avatar_url+'" /></a>';
			// html += '<div class="actual_name">'+node.user.name+'</div>';	// real name
			html += '<div class="screen_name">@'+node.user.screen_name+'</div>';	// screen name
			// html += '<p class="text">'+node.text;+'</p>';	// status text
			// html += '<img class="logo" src="../../../../lib/img/twitter.png"/>';	// status text
			html += '<div class="icon-twitter_logo"></div>';	// status text
			
			
			div.innerHTML = html;	// add html to div
		
			// var div = document.createElement('div');
			// var html = '';	// HTML text holder.
			// var hashtag_link;
			// var hashtag_text;
			// var hashtag_array = [];
			// var avatar_url = node.user.profile_image_url;	// get user avatar.
			// // console.log(avatar_url);
			// avatar_url = avatar_url.replace("_normal", avatar_size); // replace the image size if necessary.
			// hashtag_array = node.entities.hashtags;	// get hashtags in the tweet.

			// for (l = 0; l < hashtag_array.length; l++) {
			// // Wrap each hashtag in .hashtag class.
			// 	hashtag_text = "#"+node.entities.hashtags[l].text;
			// 	hashtag_link = "<span class='hashtag'>#" + node.entities.hashtags[l].text+"</span>";

			// 	node.text = node.text.replace(hashtag_text, hashtag_link);
			// }

			// // div.setAttribute('id', idName);
			// div.className = className;
			// html += '<a href="https://twitter.com/'+encodeURIComponent( node.user.screen_name )+'" class="avatar"><img src="'+avatar_url+'" /></a>';
			// html += '<div class="actual_name">'+node.user.name+'</div>';	// real name
			// html += '<div class="screen_name">@'+node.user.screen_name+'</div>';	// screen name
			// html += '<p class="text">'+node.text;+'</p>';	// status text
			// // html += '<img class="logo" src="../../../../lib/img/twitter.png"/>';	// status text
			// html += '<div class="icon-twitter_logo"></div>';	// status text
			
			
			// div.innerHTML = html;	// add html to div
	
		return div;

	}

	function createNode (className){//not called 
		var div = document.createElement('div');

		div.innerHTML = '<img src="img/GenericSB.jpg" onerror="imgError(this)"/>';
		div.className = className;

		return div;
	}

	function populateArray(array, index) {//not called
		for (var i = 0; i < index; i++) {
			array[i] = null;
		}
	}
	// function slide(stream)
	// 	// console.log(stream);
	// 	var i = 0;
	// 	var j = 0;

	// 	var i_instagram = 0;
	// 	var i_twitter = 0;

	// 	var instagram;
	// 	var twitter;

	// 	for (i = 0; i < expected_content; i++) {
	// 		if (i_instagram >= instagram_array.length) {
	// 			i_instagram = 0;
	// 		}

	// 		if (i_twitter >= twitter_array.length) {
	// 			i_twitter = 0;
	// 		}
	// 		// console.log(instagram_array[i_instagram]);
	// 		instagram = createInstagramNode(instagram_array[i_instagram], 'photo', 'image'+i);
	// 		$(stream).append(instagram);
	// 		if ($(window).width() < 1920) {		
	// 			if ( i === (expected_content%2) + 4) {
	// 				// Replace this section with dedicated hashtag node if required
	// 				twitter = createTwitterNode(twitter_array[i_twitter], 'tweet', 'tweet'+i);
	// 				$(stream).append(twitter);
	// 			}

	// 			twitter = createTwitterNode(twitter_array[i_twitter], 'tweet', 'tweet'+i);
	// 			$(stream).append(twitter);

	// 			i_instagram++;
	// 			i_twitter++;
	// 		} else if(($(window).width() >= 1920)) {
	// 			if ( i === (expected_content%2) + 7 ) {
	// 				// Replace this section with dedicated hashtag node if required
	// 				twitter = createTwitterNode(twitter_array[i_twitter], 'tweet', 'tweet'+i);
	// 				$(stream).append(twitter);
	// 			}

	// 			twitter = createTwitterNode(twitter_array[i_twitter], 'tweet', 'tweet'+i);
	// 			$(stream).append(twitter);

	// 			i_instagram++;
	// 			i_twitter++;
	// 		}

	// 	}

	// 	$(stream).animate({opacity: 1}, 1000);
	// }

	function slide(stream) {
		var i = 0;
		var j = 0;

		var i_instagram = 0;
		var i_twitter = 0;

		var instagram;
		var twitter;
		// console.log(instagram_array.length);
		for (i = 0; i < expected_content; i++) {
			if (i_instagram >= instagram_array.length) {
				i_instagram = 0;
			}

			if (i_twitter >= twitter_array.length) {
				i_twitter = 0;
			}
			console.log(instagram_array[i_instagram]);
			if(instagram_array[i_instagram].images.low_resolution) {
				
				instagram = createInstagramNode(instagram_array[i_instagram], 'photo', 'image'+i);
				$(stream).append(instagram);
			}

			if ( i === (expected_content%2) + 7) {
			// Replace this section with dedicated hashtag node if required
				if(twitter_array[i_twitter].entities.media){
					twitter = createTwitterNode(twitter_array[i_twitter], 'tweet', 'tweet'+i);
				
				$(stream).append(twitter);
				} 
			}

			if(twitter_array[i_twitter].entities.media){
					twitter = createTwitterNode(twitter_array[i_twitter], 'tweet', 'tweet'+i);
				
				$(stream).append(twitter);
				} 

			i_instagram++;
			i_twitter++;
		}

		$(stream).animate({opacity: 1}, 1000);
	}


	function updateSlide(position, type) {
		console.log("updating index");
		console.log(type);
		console.log(position);
		if (type) {
			// console.log("herealot");
		// if (type == 1) {
			// instagram = createInstagramNode(instagram_array[i_instagram], 'photo', 'image'+i);
			
			if (update_index1 >= instagram_array.length) {
				update_index1 = 0;
			}

			$('#stream .photo').eq(position).removeClass('fade-in');
			$('#stream2 .photo').eq(position).removeClass('fade-in');

			// console.log(instagram_array[update_index1]);
			// if(instagram_array[update_index1].images.low_resolution) {
				$('#stream .photo').eq(position).html(createInstagramNode(instagram_array[update_index1], 'photo'));

				$('#stream2 .photo').eq(position).html(createInstagramNode(instagram_array[update_index1], 'photo'));
				
				update_index1++;
			// }
			$('#stream .photo').eq(position).addClass('fade-in');
			$('#stream2 .photo').eq(position).addClass('fade-in');

		} else {
		
			if (update_index2 >= twitter_array.length) {
				update_index2 = 0;
			}

			$('#stream .tweet').eq(position).removeClass('fade-in');
			$('#stream2 .tweet').eq(position).removeClass('fade-in');

		
			// if(twitter_array[update_index2].entities.media){
				
				$('#stream .tweet').eq(position).html(createTwitterNode(twitter_array[update_index2], 'tweet'));
				$('#stream2 .tweet').eq(position).html(createTwitterNode(twitter_array[update_index2], 'tweet'));
				update_index2++;
			// }
	
			$('#stream.tweet').eq(position).addClass('fade-in');
			$('#stream2.tweet').eq(position).addClass('fade-in');
		}

		console.log('updated');
		// console.log("1: " + update_index1);
		// console.log("2: " + update_index2);
		// console.log(position);
	}

	document.addEventListener('twitterLoaded',
		function () {
			twitter = true;
			evt_t = null;

			if (twitter && instagram) {
				setTimeout(function() {
					slide('#stream');
					slide('#stream2');
				},500);

				evt_t = null;
			}
		}
	, false);

	document.addEventListener('instagramLoaded',
		function () {
			instagram = true;
			evt_i = null;

			if (twitter && instagram) {

				setTimeout(function() {
					slide('#stream');
					slide('#stream2');
				}, 500);

				evt_i = null;
			}
		}
	, false);

	// window.setInterval(function(){
	// 	// var position = Math.floor((Math.random() * expected_content));
	// 	var node = Math.round((Math.random() * 2));
	// 	var chance = Math.round((Math.random() * 2));
	// 	var numAddMin = Math.round((Math.random() * 2));
	// 	var newPosition;

	// 	if(chance == 1) {
	// 		var newPosition = (expected_content / 2) + numAddMin;
	// 	} else {
	// 		var newPosition = (expected_content / 2) - numAddMin;
	// 	}

	// 	updateSlide(newPosition, node);
	// }, 5000);



	window.setInterval(function(){
		var position = Math.floor((Math.random() * expected_content));
		var node = Math.round((Math.random() * 2));

		updateSlide(position, node);
	}, 5000);


})();

function imgError(image){
	// If 404 error on image, the image default to generic image.

    image.onerror = "";
    image.src = "img/GenericSB.jpg";
    return true;
}
