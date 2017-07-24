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
           // Selects first child element, which is the song-item-number element
           this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');

         });
     }
 };

 var albumCover = document.getElementsByClassName('album-cover-art')[0];
 var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
 var songRows = document.getElementsByClassName('album-view-song-item');
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';


 window.onload = function() {
     setCurrentAlbum(albumPicasso);

    albumCover.addEventListener("click", toggleAlbum);
    songListContainer.addEventListener('mouseover', function(event) {
         // #1
         if (event.target.parentElement.className === 'album-view-song-item') {
           event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
        }
     });

     /*for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
           // Selects first child element, which is the song-item-number element
           this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');

         });
     }*/

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
