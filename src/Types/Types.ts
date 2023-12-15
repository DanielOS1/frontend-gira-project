export type RootStackParamList = {
    TeamDescription: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Perfil: undefined;
    addTeam: undefined;
    AddUserScreen: undefined;
    projectCreation: undefined;
    CreateTaskScreen: undefined;
    TaskDetailsScreen: undefined;
    TeamScreen: undefined;
    ProjectScreen: undefined;
    ProjectHome: undefined;
    DetailsProjectScreen: undefined;
    Bienvenido: undefined;
    TaskScreen: undefined;
};

export type User = {
    id: string;
    username: string;
    email: string;
  };
  
  export type Team = {
    id: string;
    nombre: string;
    descripcion: string;
    users: User[];
  };
  

  export interface Task {
    id: string;
    nombre: string;
    descripcion: string;
    proyecto: Project;
    creador: User;
    responsable: User | null;
    fechaInicio: string | null; // Date en backend se convierte en string para el frontend
    fechaTermino: string | null; // Date en backend se convierte en string para el frontend
    estado: string;
    fechaCreacion: string; // Date en backend se convierte en string para el frontend
    fechaActualizacion: string; // Date en backend se convierte en string para el frontend
  }

  export type Project = {
    id: string;
    nombre: string;
    descripcion: string;
    tasks: Task[];
    creador_id: string;
  };