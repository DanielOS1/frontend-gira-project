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
  export type Comentario = {
    id: number;
    contenido: string;
   
  };

  export interface Task {
    id: string;
    nombre: string;
    descripcion: string;
    proyecto: Project;
    creador: string;
    responsable: string | null;
    fechaInicio: string | null;
    fechaTermino: string | null;
    estado: string;
    fechaCreacion: string;
    fechaActualizacion: string;
  }

  export type Project = {
    id: string;
    nombre: string;
    descripcion: string;
    tasks: Task[];
    creador_id: string;
  };