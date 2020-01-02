var secret = require("./secret")
var flattenDeep = require("lodash.flattendeep")
// hashtag set 1: 0-100k (pick 9)
// hashtag set 2: 100-300k (pick 9)
// hashtag set 3: 300k-1 million (pick 3)
// hashtag set 4: 1 million + (pick 2)

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

function selectFinalHashtags(accountHashtagsJSON) {
    var arrayOfHashtagsGroups = []
    var numberOfHashtagsToSelect = [9, 9, 3, 2]
    var selectedArrayOfHashtagsGroup = []
    for (var key in accountHashtagsJSON) {
        if (accountHashtagsJSON.hasOwnProperty(key)) {
            arrayOfHashtagsGroups.push(accountHashtagsJSON[key])
        }
    }
    arrayOfHashtagsGroups.forEach(function(hashtagSet, index) {
        var shuffleSet = shuffle(hashtagSet)
        var slicedHashtagArray = shuffleSet.slice(0, numberOfHashtagsToSelect[index])
        selectedArrayOfHashtagsGroup.push(slicedHashtagArray)
    })
    var flattenedArray = flattenDeep(selectedArrayOfHashtagsGroup)
    var hashtagsString = flattenedArray.join(" ")
    console.log(hashtagsString)
}

selectFinalHashtags(secret.accounts.stophereforanimals)