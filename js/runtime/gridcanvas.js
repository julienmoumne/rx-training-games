define(['underscore'], _ => {

    'use strict';

    var domElement;
    var squareSize;
    var textLayer;
    var layers;
    var colors;
    var domOffsetWidth;

    function attachDom(_domElement) {
        domElement = _domElement;
        domOffsetWidth = domElement.offsetWidth;
    }

    function init(_squareSize) {

        squareSize = _squareSize;
        layers = [];
        colors = [];

        resizeDom(getCanvasSize());
        removeCanvas();
        addTextLayer();
    }

    function resizeDom(size) {
        domElement.style.height = domElement.style.width = size + 'px';
    }

    function removeCanvas() {

        var canvasList = domElement.getElementsByTagName('canvas');
        var canvasCount = canvasList.length;
        for (var i = 0; i < canvasCount; i++)
            domElement.removeChild(canvasList[0]);
    }

    function addTextLayer() {
        textLayer = addCanvas(2);
    }

    function getCanvasSize() {
        return getGridSize(getOffsetWidth(), window.innerHeight, squareSize) * squareSize;
    }

    function getOffsetWidth() {
        return domOffsetWidth;
    }

    function addCanvas(index) {

        var canvasSize = getCanvasSize();
        var canvas = document.createElement("canvas");

        domElement.appendChild(canvas);
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        canvas.style.zIndex = index;
        canvas.style.position = 'absolute';

        return canvas.getContext("2d");
    }

    function addLayer(layer, color) {

        layers[layer] = addCanvas(layers.length + 3);
        colors[layer] = color;
    }

    function fill(layerId, coord) {

        coord = getAbsoluteCoordinates(coord);

        var layer = layers[layerId];
        layer.fillStyle = colors[layerId];
        layer.fillRect(coord.x, coord.y, squareSize, squareSize);
    }

    function clear(layer, coord) {

        coord = getAbsoluteCoordinates(coord);
        layer = layers[layer];
        layer.clearRect(coord.x, coord.y, squareSize, squareSize);
    }

    function getAbsoluteCoordinates(coord) {
        return {
            x: convertToAbsolute(coord.x),
            y: convertToAbsolute(coord.y)
        };
    }

    function convertToAbsolute(integer) {
        return integer * squareSize;
    }

    function getDomElement() {
        return domElement;
    }

    function getGridSize(offsetWidth, windowInnerHeight, squareSize) {
        var heightMargin = 50;
        var width = Math.min(offsetWidth, windowInnerHeight - heightMargin);
        return Math.floor(width / squareSize);
    }

    function getRelativeCoordinates(coord) {
        return {
            x: convertToRelative(coord.x),
            y: convertToRelative(coord.y)
        };
    }

    function convertToRelative(integer) {
        return Math.floor(integer / squareSize);
    }

    function setText(text) {
        var canvasSize = getCanvasSize();
        textLayer.clearRect(0, 0, canvasSize, canvasSize);
        textLayer.font = "14px serif";
        textLayer.fillStyle = '#337ab7';
        textLayer.fillText(text, 5, 20);
    }

    function displayBlankCanvas() {
        resizeDom(domOffsetWidth);
    }

    return {
        init: init,
        attachDom: attachDom,
        getDomElement: getDomElement,
        fill: fill,
        clear: clear,
        addLayer: addLayer,
        getGridSize: getGridSize,
        getOffsetWidth: getOffsetWidth,
        getRelativeCoordinates: getRelativeCoordinates,
        setText: setText,
        removeCanvas: removeCanvas,
        displayBlankCanvas: displayBlankCanvas
    };
});