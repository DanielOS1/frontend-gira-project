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
    id: string;
    name: string;
    description: string;
    members: User[];
  };
  