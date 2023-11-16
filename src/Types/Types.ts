export type RootStackParamList = {
    TeamDescription: {
        team: Team;
    };
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
  