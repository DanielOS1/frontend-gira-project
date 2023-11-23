export type RootStackParamList = {
    TeamDescription: {
        team: Team;
    };
    ProjectHome: {
      params: {
        projectId: string;
        projectName: string;
      };
    }
};


export type User = {
    id: string;
    username: string;
    email: string;
  };
  
  export type Team = {
    id: number;
    nombre: string;
    descripcion: string;
    users: User[];
  };
  

  export type Task = {
    id: string;
    title: string;
  };