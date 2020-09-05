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

export class nextMaintenance {
  constructor(carId, maintenanceId, nextKm = 0, nextDate = '') {
    this.carId = carId;
    this.maintenanceId = maintenanceId;
    this.nextKm = nextKm;
    this.nextDate = nextDate;
    this.id = uuid.v4();
  }
}

export class maintenanceOperation {
  constructor(
    date = '',
    vendor = '',
    maker = '',
    vPrice = 0,
    mPrice = 0,
    km = 0,
    nextDate = '',
    nextKm = 0,
    notes = '',
    maintenanceTypeId = '',
  ) {
    this.date = date;
    this.vendor = vendor;
    this.maker = maker;
    this.vPrice = vPrice;
    this.mPrice = mPrice;
    this.km = km;
    this.nextDate = nextDate;
    this.nextKm = nextKm;
    this.notes = notes;
    this.maintenanceTypeId = maintenanceTypeId;
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

export class maintenanceType {
  constructor(title = '', kmRate = 0, timeRate = 0) {
    this.title = title;
    this.kmRate = kmRate;
    this.timeRate = timeRate;
    this.id = uuid.v4();
  }
}
