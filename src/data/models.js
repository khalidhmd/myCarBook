var uuid = require('react-native-uuid');

export class User {
  constructor(name = '', email = '', mobile = '', passwd = '') {
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.passwd = passwd;
    this.id = uuid.v4();
  }
}

export class Car {
  constructor(
    name = '',
    make = '',
    model = '',
    imgURL = null,
    year = 2000,
    color = '',
    km = 0,
  ) {
    this.name = name;
    this.make = make;
    this.model = model;
    this.imgURL = imgURL;
    this.year = year;
    this.color = color;
    this.km = km;
    this.id = uuid.v4();
  }
}

export class KmRecord {
  constructor(date = '', km = 0, carId) {
    this.date = date;
    this.km = km;
    this.carId = carId;
    this.id = uuid.v4();
  }
}

export class FuelRecord {
  constructor(date = '', km = 0, carId, quantity = 0, cost = 0) {
    this.date = date;
    this.km = km;
    this.carId = carId;
    this.quantity = quantity;
    this.cost = cost;
    this.id = uuid.v4();
  }
}

export class maintenanceType {
  constructor(name = '', kmRate = 0, timeRate = 0) {
    this.name = name;
    this.kmRate = kmRate;
    this.timeRate = timeRate;
    this.id = uuid.v4();
  }
}

export class Maintenance {
  constructor(
    date = '',
    maker = '',
    vPrice = 0,
    mPrice = 0,
    km = 0,
    timeRate = '',
    kmRate = 0,
    notes = '',
    carId = '',
    typeName = '',
  ) {
    this.date = date;
    this.maker = maker;
    this.vPrice = vPrice;
    this.mPrice = mPrice;
    this.km = km;
    this.timeRate = timeRate;
    this.kmRate = kmRate;
    this.notes = notes;
    this.typeName = typeName;
    this.carId = carId;
    this.id = uuid.v4();
  }
}
