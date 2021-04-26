export interface Params {
  plant: Plant;
}

export interface Envirolment {
  key: string;
  title: string;
}

export interface Plant {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
  dataTimeNotification: Date;
}

export interface StoragePlants {
  [id: string]: {
    data: Plant;
  };
}


export interface ConfirmationProps {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: "smile" | 'hug';
  nextScreen: string;
}

