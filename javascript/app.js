	const searchBtn = $('.js-search');
	const inputField = $('.js-search-input');
	const dataContainer = $('.js-data');

	const getData = (q) => {
		const API_KEY = 'AIzaSyBkDIsYWaJdQt20Jt6PDhz_rOQWMpHG7SY';
		const BASE_URL = 'https://www.googleapis.com/youtube/';
		const ENDPOINT = 'v3/search';
		const limit = 5;
		const duration = "long"
		const part = "snippet"
		const type = "video"
		console.log(`${BASE_URL}${ENDPOINT}?part=${part}&key=${API_KEY}&limit=${limit}&videoDuration=${duration}&type=${type}&q=${q}`)
		const xhr = $.get(`${BASE_URL}${ENDPOINT}?part=${part}&key=${API_KEY}&limit=${limit}&videoDuration=${duration}&type=${type}&q=${q}`);
			return xhr;
		}

	const onSearchBtnClicked = async () => {
		event.preventDefault();
		console.log('onSearchBtnClicked', inputField.val());
		const searchQuery = inputField.val();
		var youTubeSearchResults = {}
		const resultArray = []
		try {
			youTubeSearchResults = await getData(searchQuery)
			for (item in youTubeSearchResults.items){
				resultArray.push(renderImage(youTubeSearchResults.items[item].id.videoId));
			}
			console.log(resultArray);
		    document.getElementById("video_results").innerHTML = resultArray;
		}
		catch(e){
			console.log("error", e)
		}
	 	//return resultArray;
	}

	const renderImage = (id) => {
		return(`
		<div><iframe width="1280" height="720" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe></div>
		 `)
	}

	const onInputFieldTyped = (e) => {
		if (e.keyCode === 13) {
			console.log('onInputFieldTyped', e.keyCode, inputField.val())
		}
	}

	searchBtn.click(onSearchBtnClicked);
	inputField.keypress(onInputFieldTyped);
	