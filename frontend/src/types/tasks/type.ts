export interface CreateTaskBody {
  description: string;
  time: number;
  active: boolean;
}

export interface UpdateActiveTaskBody {
  active: boolean;
}

export interface UpdateTaskBody {
  description: string;
  time: number;
}
