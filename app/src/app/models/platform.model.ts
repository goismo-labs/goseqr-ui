interface  datum {
  id: string;
  name: string;
}

export interface Platform {
  data: datum[];
  message: string;
  success: boolean;
}
