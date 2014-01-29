Date.prototype.GetReadableDate = function(separator) {
    return (( this.getDate() < 10 ) ? '0' + this.getDate() : this.getDate()) + separator + (( (this.getMonth() + 1) < 10 ) ? '0' + (this.getMonth() + 1) : (this.getMonth() + 1)) + separator + this.getFullYear();
};

CropImage = function(image, posX, posY, canvasWidth, canwasHeight,  width, height, cullback) {
    var canvas = $('<canvas></canvas>')[0];
	canvas.width = canvasWidth;
    canvas.height = canwasHeight;
    canvas.getContext('2d').drawImage(image, posX, posY, width, height);
    if(cullback) {
        cullback(canvas);
    }
    var data = canvas.toDataURL('image/png');
    return data;
}