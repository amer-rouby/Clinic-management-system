export interface Course {
    id?: string;
    category: number;
    coursePrice: number;
    description: string;
    experienceInTheField: string;
    firstName: string;
    imgUrl: string;
    lastName: string;
  }

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    phoneNumber: string;
    description: string;
    date: Date;
}