/* there is an array of image source links on hand, we put the first image on the middle of the page, then rotate */

let imageSrc = [
    "../img/patrizia_1.jpg",
    "../img/patrizia_4.jpg",
    "../img/patrizia_5.jpg",
    "../img/patrizia_6.jpg",
    "../img/patrizia_2.jpg",
    "../img/patrizia_7.jpg",
    "../img/patrizia_2.jpg"
]

$(document).ready(function() {
    console.log('i am ready')
    let totalImgCount = getTotalNumberOfImages()
    console.log('total num ' + totalImgCount)
    let middleIndex = getMiddleIndex(totalImgCount)
    console.log("middleIndex, " + middleIndex)
    let middleImg = getMiddleImage(middleIndex)
    console.log(middleImg)
    let nextImg = findNextImgRotatably(middleImg, middleIndex, totalImgCount)
    console.log(nextImg)
    putImagesIntoLocation(imageSrc)
})


// Button click event definition
$('#button1').on("click", imagesLeft)
$('#button2').on("click", imagesRight)


// rotate left event handler
function imagesLeft() {
    let imageObj = getImageSrcs();
    let imageSrcs = imageObj.imageSrcs
    
    arrayRotate(imageSrcs)
    putRotatedSrcs(imageObj)
}

function imagesRight() {

    let imageObj = getImageSrcs();
    let imageSrcs = imageObj.imageSrcs
    
    arrayRotate(imageSrcs, true)
    putRotatedSrcs(imageObj)
    
}

// https://stackoverflow.com/questions/1985260/rotate-the-elements-in-an-array-in-javascript
function arrayRotate(arr, toRight) {
    if (toRight) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
}

function getImageSrcs() {
    let swipeElement = $('#swipe')
    let images = $(swipeElement).find('img')
    let imageSrcs = []
    
    Object.keys(images).forEach(key => {
        let currentSrc = images[key]['src']
        if(currentSrc) {
            imageSrcs.push(images[key]['src'])
        }
    })
    return {images: images, imageSrcs: imageSrcs}
}

function putRotatedSrcs(imageObj) {
    let index=0
    Object.keys(imageObj.images).forEach(key => {
        imageObj.images[key]['src'] = imageObj.imageSrcs[index]
        index++
    })
}

function getTotalNumberOfImages() {
    let swipeElement = $('#swipe')
    return $(swipeElement).find('img').length
}

function getMiddleIndex(totalImgCount) {
    return Math.floor(totalImgCount / 2)
}

function getMiddleImage(middleIndex) {
    let swipeElement = $('#swipe')
    return $(swipeElement).find('img')[middleIndex]
}
function findNextImgRotatably(img, index, totalImgCount) {
    let swipeElement = $('#swipe')
    let images = $(swipeElement).find('img')

    if(index!=totalImgCount-1) {
        return images[index + 1]
    }
    else {
        return images[0]
    }
}

function putImagesIntoLocation(imageSrc) {
    let totalImgCount = getTotalNumberOfImages()
    let middleIndex = getMiddleIndex(totalImgCount)
    let middleImg = getMiddleImage(middleIndex)
    $(middleImg).attr('src', imageSrc[0])
    var currentImg = middleImg
    let index = middleIndex
    for(let i = 1; i < totalImgCount; i++) {
        let nextImg = findNextImgRotatably(currentImg, index, totalImgCount)
        if($(nextImg).attr('src') == '#') {
            $(nextImg).attr('src', imageSrc[i])
        }
        else {
            console.log('here')
            return
        }
        currentImg=nextImg
        console.log(currentImg)
    }
}