// Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };

 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 // Assignment Example Album
 var albumGoats = {
     title: 'Leaves and Branches',
     artist: 'Goats in Trees',
     label: 'EM',
     year: '2010',
     albumArtUrl: 'assets/images/album_covers/22goats.png',
     songs: [
         { title: 'Oak', duration: '1:01' },
         { title: 'Ash', duration: '5:01' },
         { title: 'Beech', duration: '3:21'},
         { title: 'Lime', duration: '3:14' },
         { title: 'Chestnut', duration: '2:15'},
         { title: 'Alder', duration: '3:21'},
         { title: 'Elm', duration: '3:14' },
         { title: 'Scots Pine', duration: '2:15'}
     ]
 };

 var createSongRow = function(songNumber, songName, songLength) {
      var template =
         '<tr class="album-view-song-item">'
       + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
       + '  <td class="song-item-title">' + songName + '</td>'
       + '  <td class="song-item-duration">' + songLength + '</td>'
       + '</tr>'
       ;

      return template;
  };

  var setCurrentAlbum = function(album) {
     // #1
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

     // #2
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);

     // #3
     albumSongList.innerHTML = '';

     // #4
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }

      var songRows = document.getElementsByClassName('album-view-song-item');
      for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');
            // #2
            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songItemNumber;
            }

         });
         songRows[i].addEventListener('click', function(event) {
             clickHandler(event.target);
         });
     }
 };
//counter variable to see if this is the first time the function has been called
  var generation = 1;
  var findParentByClassName = function(element, cName){
    
    if(element.parentNode !== null){

      if(element.parentNode.className === cName){
        //leaving function, reset counter variable to 1
        generation = 1;
        return element.parentNode;

      }else{
       console.log("not this time!");
       generation++;
       element = element.parentNode;
       findParentByClassName(element, cName);
      }

    }
    else{
      if(generation === 1){
         console.log("no parent found");
       }
       else{
         //leaving function, reset counter variable to 1
         generation = 1;
         console.log("no parent found with that class name");
       }
    }


  };

  var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
};

var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);

    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
      }else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
          songItem.innerHTML = playButtonTemplate;
          currentlyPlayingSong = null;
      }else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
};

 var albumCover = document.getElementsByClassName('album-cover-art')[0];
 var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
 var songRows = document.getElementsByClassName('album-view-song-item');
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 // Store state of playing songs
 var currentlyPlayingSong = null;


 window.onload = function() {
     setCurrentAlbum(albumPicasso);

    albumCover.addEventListener("click", toggleAlbum);
  /*Finally, update the code in the mouseover event with a conditional statement that only changes the
    innerHTML of the table cell when the element does not belong to the currently playing song. */
    songListContainer.addEventListener('mouseover', function(event) {
         // #1
         if (event.target.parentElement.className === 'album-view-song-item') {
            var songItem = getSongItem(event.target);

            if(songItem.getAttribute('data-song-number') !== currentlyPlayingSong){
                  songItem.innerHTML = playButtonTemplate;
           }
        }
     });

     findParentByClassName(songRows[1].parentNode, "scissors");
     findParentByClassName(document, "scissors");



 };

 var getCurrentAlbum = function(){

    return document.getElementsByClassName('album-view-title')[0].firstChild.nodeValue;
  }

 var toggleAlbum = function(){

       var album = getCurrentAlbum();
       if(album==="Leaves and Branches"){
         setCurrentAlbum(albumMarconi);
       }
       else if(album==="The Telephone"){
         setCurrentAlbum(albumPicasso);
       }
       else if(album==="The Colors"){
         setCurrentAlbum(albumGoats);
       }
 }
