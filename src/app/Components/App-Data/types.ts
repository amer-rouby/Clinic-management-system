export interface Course {
    id: number,
    firstName: string,
    lastName: string,
    coursePrice: number,
    description: string,
    category: any,
    imgUrl: string,
    experienceInTheField: string,
}

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    phoneNumber: string;
    description: string;
    date: Date;
}