class Place {
    constructor(title, imageUri, address, location) {
        this.title = title;
        this.imagUri = imageUri;
        this.address = address;
        this.location = location;
        this.id = new Date().toString() + Math.random().toString();
    }
}